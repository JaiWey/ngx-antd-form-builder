import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChange,
} from '@angular/core';
import Sortable, {Options, SortableEvent} from 'sortablejs';
import {SortablejsBindings} from './sortablejs-bindings';
import {SortablejsService} from './sortablejs.service';

export type SortableData = any | any[];

const getIndexesFromEvent = (event: SortableEvent) => {
  if (event.hasOwnProperty('newDraggableIndex') && event.hasOwnProperty('oldDraggableIndex')) {
    return {
      new: event.newDraggableIndex,
      old: event.oldDraggableIndex,
    };
  } else {
    return {
      new: event.newIndex,
      old: event.oldIndex,
    };
  }
};

function removeNode(node: HTMLElement) {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
}

function insertNodeAt(fatherNode: HTMLElement, node: HTMLElement, position: number) {
  const refNode =
    position === 0
      ? fatherNode.children[0]
      : fatherNode.children[position - 1].nextSibling;
  fatherNode.insertBefore(node, refNode);
}

@Directive({
  selector: '[sortablejs]',
})
export class SortablejsDirective implements OnInit, OnChanges, OnDestroy {

  @Input()
  sortablejs: SortableData; // array or a FormArray

  @Input()
  sortablejsContainer!: string;

  @Input()
  sortablejsOptions!: Options;

  @Input()
  sortablejsCloneFunction!: (item: any) => any;

  private sortableInstance: any;

  @Output() sortablejsInit = new EventEmitter();

  constructor(
    private service: SortablejsService,
    private element: ElementRef,
    private zone: NgZone,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit() {
    //zone pollution
    this.zone.runOutsideAngular(() => {
      if (Sortable) { // Sortable does not exist in angular universal (SSR)
        this.create();
      }
    })
  }

  ngOnChanges(changes: { [prop in keyof SortablejsDirective]: SimpleChange }) {
    const optionsChange: SimpleChange = changes.sortablejsOptions;

    if (optionsChange && !optionsChange.isFirstChange()) {
      const previousOptions: Options = optionsChange.previousValue;
      const currentOptions: Options = optionsChange.currentValue;

      Object.keys(currentOptions).forEach(optionName => {
        if (currentOptions[optionName as keyof Options] !== previousOptions[optionName as keyof Options]) {
          // use low-level option setter
          this.sortableInstance.option(optionName, this.options[optionName as keyof Options]);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.sortableInstance) {
      this.sortableInstance.destroy();
    }
  }

  private create() {
    const container = this.sortablejsContainer ? this.element.nativeElement.querySelector(this.sortablejsContainer) : this.element.nativeElement;

    setTimeout(() => {
      this.sortableInstance = Sortable.create(container, this.options);
      this.sortablejsInit.emit(this.sortableInstance);
    }, 0);
  }

  private getBindings(): SortablejsBindings {
    if (!this.sortablejs) {
      return new SortablejsBindings([]);
    } else if (this.sortablejs instanceof SortablejsBindings) {
      return this.sortablejs;
    } else {
      return new SortablejsBindings([this.sortablejs]);
    }
  }

  private get options() {
    return {...this.optionsWithoutEvents, ...this.overridenOptions};
  }

  private get optionsWithoutEvents() {
    return {...(this.sortablejsOptions || {})};
  }

  private proxyEvent(eventName: string, ...params: any[]) {
    this.zone.run(() => { // re-entering zone, see https://github.com/SortableJS/angular-sortablejs/issues/110#issuecomment-408874600
      if (this.optionsWithoutEvents && this.optionsWithoutEvents[eventName as keyof Options]) {
        (this.optionsWithoutEvents[eventName as keyof Options] as any)(...params);
      }
    });
  }

  private get isCloning() {
    return this.sortableInstance.options.group.checkPull(this.sortableInstance, this.sortableInstance) === 'clone';
  }

  private clone<T>(item: T): T {
    // by default pass the item through, no cloning performed
    return (this.sortablejsCloneFunction || (subitem => subitem))(item);
  }

  private get overridenOptions(): Options {
    // always intercept standard events but act only in case items are set (bindingEnabled)
    // allows to forget about tracking this.items changes
    return {
      onAdd: (event: SortableEvent) => {
        this.service.transfer = (items: any[]) => {
          this.getBindings().injectIntoEvery(event.newIndex as number, items);
          this.proxyEvent('onAdd', event);
        };
        removeNode(event.item);

        this.proxyEvent('onAddOriginal', event);
      },
      onRemove: (event: SortableEvent) => {
        const bindings = this.getBindings();

        if (bindings.provided) {
          if (this.isCloning && this.service.transfer) {
            this.service.transfer(bindings.getFromEvery(event.oldIndex as number).map(item => this.clone(item)));

            // great thanks to https://github.com/tauu
            // event.item is the original item from the source list which is moved to the target list
            // event.clone is a clone of the original item and will be added to source list
            // If bindings are provided, adding the item dom element to the target list causes artifacts
            // as it interferes with the rendering performed by the angular template.
            // Therefore we remove it immediately and also move the original item back to the source list.
            // (event handler may be attached to the original item and not its clone, therefore keeping
            // the original dom node, circumvents side effects )
            this.renderer.removeChild(event.item.parentNode, event.item);
            this.renderer.insertBefore(event.clone.parentNode, event.item, event.clone);
            this.renderer.removeChild(event.clone.parentNode, event.clone);
          } else {
            this.service.transfer && this.service.transfer(bindings.extractFromEvery(event.oldIndex as number));
          }

          this.service.transfer = undefined;
        }

        this.proxyEvent('onRemove', event);
      },
      onUpdate: (event: SortableEvent) => {
        removeNode(event.item);
        insertNodeAt(event['from'], event.item, event.oldIndex as number);
        const bindings = this.getBindings();
        const indexes = getIndexesFromEvent(event);

        bindings.injectIntoEvery(indexes.new as number, bindings.extractFromEvery(indexes.old as number));
        this.proxyEvent('onUpdate', event);
      },
    };
  }

}