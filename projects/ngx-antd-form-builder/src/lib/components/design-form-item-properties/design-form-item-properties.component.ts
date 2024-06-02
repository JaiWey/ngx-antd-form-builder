import { Component, Inject, Input, OnChanges, Optional, SimpleChanges } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzRateModule } from "ng-zorro-antd/rate";
import { DesignFormChangeOptionComponent } from "../design-form-change-option/design-form-change-option.component";
import { CommonModule } from "@angular/common";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { DesignFormItemCheckboxComponent } from "../design-form-item-checkbox/design-form-item-checkbox.component";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";

@Component({
  standalone: true,
  selector: 'app-design-form-item-properties',
  templateUrl: './design-form-item-properties.component.html',
  styleUrls: ['./design-form-item-properties.component.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    NzRateModule, NzInputNumberModule, NzEmptyModule, NzRadioModule, NzInputModule,
    NzSelectModule,NzCheckboxModule,
    DesignFormChangeOptionComponent, DesignFormItemCheckboxComponent]
})
export class DesignFormItemPropertiesComponent implements OnChanges {
  @Input() selectItem;
  @Input() hideModel;
  @Input() config;
  showMetaDataModel: boolean = true

  Infinity = Infinity

  constructor(
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  get options(): any {
    return 'options' in this.selectItem? this.selectItem.options : {};
  }

  get showFreeModel() {
    return (!this.hideModel && 'model' in this.selectItem &&
      typeof this.selectItem.model !== 'undefined')
  }
  getType(input: unknown) {
    return typeof input
  }

  getOperationProperty() {
    return typeof this.options.hidden !== 'undefined' ||
      typeof this.options.disabled !== 'undefined' ||
      typeof this.options.readonly !== 'undefined' ||
      typeof this.options.clearable !== 'undefined' ||
      typeof this.options.multiple !== 'undefined' ||
      typeof this.options.range !== 'undefined' ||
      typeof this.options.showTime !== 'undefined' ||
      typeof this.options.allowHalf !== 'undefined' ||
      typeof this.options.showInput !== 'undefined' ||
      typeof this.options.animated !== 'undefined'
  }

  colOverrideChange($event) {
    this.options.overrideLayout = $event
    if ($event) {
      this.options.labelCol = {...this.config.labelCol};
      this.options.wrapperCol = {...this.config.wrapperCol};
      this.options.labelWidth = this.config.labelWidth;
    }
  }

  handleChangeCol(e) {
    this.options.labelCol.xs = this.options.labelCol.sm = this.options.labelCol.md = this.options.labelCol.lg = this.options.labelCol.xl = this.options.labelCol.xxl = e;

    this.options.wrapperCol.xs = this.options.wrapperCol.sm = this.options.wrapperCol.md = this.options.wrapperCol.lg = this.options.wrapperCol.xl = this.options.wrapperCol.xxl =
      24 - e;
  }

  handleChangeLabelCol(e) {
    this.options.labelCol.xs = this.options.labelCol.sm = this.options.labelCol.md = this.options.labelCol.lg = this.options.labelCol.xl = this.options.labelCol.xxl = e;
  }
  handleChangeWrapperCol(e) {
    this.options.wrapperCol.xs = this.options.wrapperCol.sm = this.options.wrapperCol.md = this.options.wrapperCol.lg = this.options.wrapperCol.xl = this.options.wrapperCol.xxl = e;
  }
}