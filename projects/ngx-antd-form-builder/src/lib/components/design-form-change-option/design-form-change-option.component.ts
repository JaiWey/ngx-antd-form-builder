import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter, forwardRef, Inject, Optional } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";

@Component({
  standalone: true,
  selector: 'app-design-form-change-option',
  templateUrl: './design-form-change-option.component.html',
  styleUrls: ['./design-form-change-option.component.scss'],
  imports: [
    NzInputNumberModule, NzInputModule, FormsModule,CommonModule,NzIconModule,NzButtonModule,NzGridModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DesignFormChangeOptionComponent),
      multi: true
    }
  ]
  
})
export class DesignFormChangeOptionComponent implements ControlValueAccessor {
  constructor(
  ) {}
  _value: any
  onChange: (_: any) => void = (_: any) => { };
  onTouched: () => void = () => { };
  writeValue(obj: any): void {
    this._value = obj
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    //throw new Error("Method not implemented.");
  }


  //@Input() value: Array<any>;
  @Input() type: string = 'option';
  //@Output() readonly changeValue = new EventEmitter();

  handleAdd() {
    // 添加
    const addData = [
      ...this._value,
      {
        value: `${this._value.length + 1}`,
        label: (this.type == 'collapse' ? "Panel " : "Option ") + (this._value.length + 1),
        list: this.type === "tab" || this.type == 'collapse' ? [] : undefined
      }
    ];
    this._value = addData
    this.onChange(addData)
    //this.$emit("input", addData);
  }
  handleAddCol() {
    // 添加栅格Col
    const addData = [
      ...this._value,
      {
        span: 12,
        list: []
      }
    ];
    this._value = addData
    this.onChange(addData)
    //this.$emit("input", addData);
  }
  handleAddRules() {
    const addData = [
      ...this._value,
      {
        pattern: "",
        message: ""
      }
    ];
    this._value = addData
    this.onChange(addData)
    //this.$emit("input", addData);
  }
  handleDelete(deleteIndex) {
    // 删除
    this._value = this._value.filter((val, index) => index !== deleteIndex)
    this.onChange(this._value)
    // this.$emit(
    //   "input",
    //   this.value.filter((val, index) => index !== deleteIndex)
    // );
  }
}