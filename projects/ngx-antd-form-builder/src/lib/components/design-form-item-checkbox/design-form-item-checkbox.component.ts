import { CommonModule } from "@angular/common";
import { Component, forwardRef, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";

@Component({
  standalone: true,
  selector: 'app-design-form-item-checkbox',
  templateUrl: './design-form-item-checkbox.component.html',
  styleUrls: ['./design-form-item-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DesignFormItemCheckboxComponent),
      multi: true
    }
  ],
  imports: [NzCheckboxModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class DesignFormItemCheckboxComponent implements ControlValueAccessor, OnChanges {  
  @Input() options!: Array<Record<'label' | 'value', string>>
  //defaultValue使用NgForm实现
  //@Input() defaultValue: string[] = []
  _first: string[] = []
  /**
  * Invoked when the model has been changed
  */
  onChange: (_: any) => void = (_: any) => { };
  onTouched: () => void = () => { };
  writeValue(obj: any): void {
    if (obj && Array.isArray(obj)) {
      this._first = obj
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.defaultValue.currentValue.length > 0) {
    //   this.writeValue(changes.defaultValue.currentValue)
    // }
  }

  log(e) {
    this.onTouched()
    this.onChange(e)
    //console.log(e)
  }
}