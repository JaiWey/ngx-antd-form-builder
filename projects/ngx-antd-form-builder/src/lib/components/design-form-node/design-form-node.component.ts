import { Component, Input, Output, EventEmitter, Inject, Optional } from "@angular/core";
import { DesignFormItemComponent } from "../design-form-item/design-form-item.component";
import { CommonModule } from "@angular/common";
import { NzIconModule } from "ng-zorro-antd/icon";

@Component({
  standalone: true,
  selector: 'app-design-form-node',
  templateUrl: './design-form-node.component.html',
  styleUrls: ['./design-form-node.component.scss'],
  imports: [DesignFormItemComponent,CommonModule,NzIconModule]
})
export class DesignFormNodeComponent {
  @Input() selectItem 
  @Input() record //="record"
  @Input() config //="config"
  @Input() hideModel = false
  @Output() readonly handleSelectItem = new EventEmitter();
  @Output() readonly handleCopy = new EventEmitter();
  @Output() readonly handleDelete = new EventEmitter();
  constructor(
  ) {}

  handleSelectItemFn($event: Event) {
    $event.stopPropagation()
    this.handleSelectItem.emit(this.record)
  } 
  handleCopyFn($event: Event) {
    $event.stopPropagation()
    this.handleCopy.emit(this.record)
  }  
  handleDeleteFn($event: Event) {
    $event.stopPropagation()
    this.handleDelete.emit(this.record)
  }
}