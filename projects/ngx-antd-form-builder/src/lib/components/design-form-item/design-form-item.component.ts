import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NzFormModule, NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NgxAntdFormBuilder } from '../../ngx-antd-form-builder.interface';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { DesignFormItemCheckboxComponent } from '../design-form-item-checkbox/design-form-item-checkbox.component';
import { DesignFormItemRadioComponent } from '../design-form-item-radio/design-form-item-radio.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { HasRulePipe } from '../pipes/has-rule.pipe';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  standalone: true,
  selector: 'app-design-form-item',
  templateUrl: './design-form-item.component.html',
  styleUrls: ['./design-form-item.component.scss'],
  imports: [ 
    ReactiveFormsModule,CommonModule,
    NzInputModule, NzInputNumberModule, NzFormModule, NzDividerModule,NzRateModule,
    NzSelectModule,NzIconModule,NzSliderModule,NzSwitchModule,NzAlertModule,NzDatePickerModule,
    DesignFormItemCheckboxComponent,DesignFormItemRadioComponent,HasRulePipe
  ]
})
export class DesignFormItemComponent implements OnChanges, OnInit {
  infinity= Infinity
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  //@Input() key //="record.key"
  //:selectItem.sync="selectItem"
  @Input() record!: NgxAntdFormBuilder.AllType //="record"
  @Input() formConfig //="record"
  @Input() form//: UntypedFormGroup  //??

  get layoutConfig() {
    return (this.record as any).options?.overrideLayout ? (this.record as any).options : this.formConfig;
  }
  constructor(
  ) {}

  get isCol() {
    return this.formConfig.layout === 'horizontal' && this.formConfig.labelLayout === 'flex'
  }
  get isFlex() {
    return this.formConfig.layout === 'horizontal' && this.formConfig.labelLayout !== 'flex'
  }

  get required() {
    return this.record['rules'] && this.record['rules'][0] && this.record['rules'][0]['required'] === true 
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.form && this.record && this.record.key) {
      this.form = new UntypedFormGroup({
        [this.record.key]: new UntypedFormControl()
      })
    }
  }



  clearValue() {
    this.form.get(this.record.key).setValue('')
  }

  getValue() {
    return this.form.get(this.record.key).value
  }

  valueLengthGtZero() {
    const value = this.getValue()
    return value && value.length
  }
}