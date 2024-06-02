import { CommonModule } from "@angular/common";
import { Component, Inject, Input, Optional } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzSliderModule } from "ng-zorro-antd/slider";

@Component({
  standalone: true,
  selector: 'app-design-form-properties',
  templateUrl: './design-form-properties.component.html',
  styleUrls: ['./design-form-properties.component.scss'],
  imports: [
    FormsModule,
    NzInputNumberModule, NzRadioModule,CommonModule,NzSliderModule
  ],
})
export class DesignFormPropertiesComponent {
  @Input() previewOptions //="record.key"
  @Input() config //="config"

  constructor(
  ) {}

  handleChangeCol(e) {
    this.config.labelCol.xs = this.config.labelCol.sm = this.config.labelCol.md = this.config.labelCol.lg = this.config.labelCol.xl = this.config.labelCol.xxl = e;

    this.config.wrapperCol.xs = this.config.wrapperCol.sm = this.config.wrapperCol.md = this.config.wrapperCol.lg = this.config.wrapperCol.xl = this.config.wrapperCol.xxl =
      24 - e;
  }

  handleChangeLabelCol(e) {
    this.config.labelCol.xs = this.config.labelCol.sm = this.config.labelCol.md = this.config.labelCol.lg = this.config.labelCol.xl = this.config.labelCol.xxl = e;
  }
  handleChangeWrapperCol(e) {
    this.config.wrapperCol.xs = this.config.wrapperCol.sm = this.config.wrapperCol.md = this.config.wrapperCol.lg = this.config.wrapperCol.xl = this.config.wrapperCol.xxl = e;
  }
}