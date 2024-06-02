import { Component, EventEmitter, Inject, Input, OnChanges, Optional, Output, SimpleChanges } from "@angular/core";
import Sortable, { Options } from 'sortablejs';
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { CommonModule } from "@angular/common";
import { DesignFormNodeComponent } from "../design-form-node/design-form-node.component";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { SortablejsModule } from "../../utils/sortablejs/sortablejs.module";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";

@Component({
  standalone: true,
  selector: 'app-layout-item',
  templateUrl: './layout-item.component.html',
  styleUrls: ['./layout-item.component.scss'],
  imports: [
    CommonModule, NzCollapseModule, NzInputModule, NzInputNumberModule,NzCardModule,
    NzTabsModule,SortablejsModule,NzGridModule,NzIconModule,
     DesignFormNodeComponent]
})
export class LayoutItemComponent implements OnChanges {
  @Input() record: any;
  @Input() config: any;
  @Input() selectItem: any;

  @Output() readonly handleColAdd: EventEmitter<any> = new EventEmitter();
  @Output() readonly handleSelectItem = new EventEmitter();
  @Output() readonly handleCopy = new EventEmitter();
  @Output() readonly handleDelete = new EventEmitter();

  _cahce: {[key: string]: Options} = {
  }

  constructor(
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log()
  }

  genOptions(colItem, index): Options {
    if (!this._cahce[index]) {
      this._cahce[index] = 
      {
        group: 'draggable-box',
        handle: '.drag-move',
        onAdd: (evt) => {
          this.onDrop({
            evt, columns: colItem.list
          })
        } 
      }
    }
    const options = this._cahce[index]
      return {
        ...options
      }
  }

  onDrop(evt) {
    //debugger
    this.handleColAdd.emit(
      evt, 
    )
  }

  onDragDrop($event) {
    //this.itemDrop.emit($event)
  }

  handleCopyFn($event: Event) {
    $event.stopPropagation()
    this.handleCopy.emit()
  }  
  handleDeleteFn($event: Event) {
    $event.stopPropagation()
    this.handleDelete.emit()
  }

  handleFormNodeDelete($event) {
    this.handleDelete.emit($event)
  }

  handleSelectItemAndStop($event) {
    $event.stopPropagation()
    this.handleSelectItem.emit(this.record)
  }

  hiddenDelete() {
    if ([//"batch",
    //"card",
    "tabs",
    "grid",
    'collapse',
    "table"].includes(this.record.type)) {
      return this.record.columns.some(col => col.list.length > 0)
    } else if (
      ['batch', 'card', 'block'].includes(this.record.type)) {
      return this.record.list.length > 0
    }
  }
}