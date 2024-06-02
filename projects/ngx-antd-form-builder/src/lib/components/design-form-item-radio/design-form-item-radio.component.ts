import { CommonModule } from "@angular/common";
import { Component, forwardRef, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";

@Component({
  standalone: true,
  selector: 'app-design-form-item-radio',
  templateUrl: './design-form-item-radio.component.html',
  styleUrls: ['./design-form-item-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DesignFormItemRadioComponent),
      multi: true
    }
  ],
  imports: [
    CommonModule,FormsModule,
    NzToolTipModule,NzRadioModule,NzIconModule,
  ]
})
export class DesignFormItemRadioComponent implements ControlValueAccessor, OnChanges {  
  @Input() record//: AmberdataFormDesign.RadioType;
  onChange: (_: any) => void = (_: any) => { };
  onTouched: () => void = () => { };

  value;
  isDisabled = false;
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onModelChange(e) {
    this.value = e;
    this.onTouched()
    this.onChange(e)
    //console.log(e)
  }
}