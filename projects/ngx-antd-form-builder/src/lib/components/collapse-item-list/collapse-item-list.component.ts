import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Options, SortableEvent } from 'sortablejs';
import { NgxAntdFormBuilder } from '../../ngx-antd-form-builder.interface';
import { SortablejsModule } from '../../utils/sortablejs/sortablejs.module';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-collapse-item-list',
  templateUrl: './collapse-item-list.component.html',
  styleUrls: ['./collapse-item-list.component.scss'],
  imports: [SortablejsModule, CommonModule]
})
export class CollapseItemListComponent implements OnChanges {
  @Input() fields: NgxAntdFormBuilder.AllType[] = []
  @Output() readonly handleStart: EventEmitter<any> = new EventEmitter();
  @Output() readonly generateKey: EventEmitter<any> = new EventEmitter();
  _fields: NgxAntdFormBuilder.AllType[] = []
  constructor(
  ) {
  }

  options: Options = {
    group: {
      name:  'draggable-box',
      pull: 'clone', put: false,
    },
    sort: false,
    onStart: (event: SortableEvent) => {
      this.handleStart.emit(this._fields[event.oldIndex as number].type)
      this.generateKey.emit({
        list: this._fields, 
        index: event.oldIndex
      })
    }
  };
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields']) {
      this._fields = changes['fields'].currentValue
    }
  }

}
