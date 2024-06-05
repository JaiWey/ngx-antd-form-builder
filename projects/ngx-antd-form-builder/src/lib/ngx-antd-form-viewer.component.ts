import { Component, EventEmitter, Inject, Input, OnChanges, Optional, Output, SimpleChanges } from "@angular/core";
import { AbstractControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, ValidatorFn } from "@angular/forms";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzFormModule } from "ng-zorro-antd/form";
import { CommonModule } from "@angular/common";
import { BuildBlocksComponent } from "./components/build-blocks/build-blocks.component";

@Component({
  selector: 'ngx-antd-form-viewer',
  standalone: true,
  template: `
  <form *ngIf="json && json.list" nz-form [nzLayout]="json.config.layout"
    class="k-form-build-9136076486841527"
    [formGroup]="_form" [ngStyle]="{'width': json.config.previewWidth}">
    <app-build-blocks *ngFor="let record of json.list; index as i"
      [record]="record"
      [form]="_form"
      [formConfig]="json.config"
    ></app-build-blocks>
  </form>
  `,
  styles: ``,
  imports: [
    BuildBlocksComponent,
    NzLayoutModule, NzFormModule,CommonModule, ReactiveFormsModule,
  ]
})
export class NgxAntdFormViewerComponent implements OnChanges {
  @Input() json: any;
  @Input() initData: {[key: string]: any} = {};
  @Input() readonly readonly: boolean = false;
  @Input() readonly needInit: boolean = true;
  @Output() readonly Submit = new EventEmitter();

  _form: UntypedFormGroup;
  private _flatResult
  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this._form = new UntypedFormGroup({})
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["json"]) {
      this.refreshFormGroup()
      this.refreshReadOnly(this.readonly)
    }
    if (changes["readonly"] && changes["readonly"].currentValue != changes["readonly"].previousValue) {
      this.refreshReadOnly(changes["readonly"].currentValue)
    }
  }

  refreshReadOnly(readonly: boolean) {
    Object.values(this._form.controls).forEach(control => {
      if (readonly) {
        control.disable()
      } else {
        control.enable()
      }
    })
  }

  refreshFormGroup() {
    if (!this.json) {
      return
    }
    const genRulesValidatorFn: ((rules: any[]) => ValidatorFn) = (rules)  => {
      return (control: AbstractControl) => {
        const value = control.value
        if (rules.length == 0) {
          return null;
        }
        if (typeof value == 'string') {
          if (!value && rules[0].required) {
            return {
              message: rules[0].message
            }
          }
          for (let i = 1; i < rules.length; i++) {
            const regex = new RegExp(rules[i].pattern)
            if (!regex.test(value)) {
              return {
                message: rules[i].message
              }
            }
          }
        } else {
          //多选框
          if (rules[0].required && (!value || value.length == 0)) {
            return {
              message: rules[0].message
            }
          } else {
            return null
          } 
        }
        return null;
      };
    }
    const getFlatList = (list, parent?) => {
      const result: any[] = []
      const recursive = (list, parent) => {
        list.forEach(data => {
          data.__parent = parent
          if (['tabs', 'grid', 'collapse'].includes(data.type)) {
            data.columns.forEach(col => {
              recursive(col.list, data)
            })
          } else if (data.type == 'card' || data.type == 'block') {
            recursive(data.list, data)
          } else {
            result.push(data)
          }
        })
      }
      recursive(list, parent ? parent :{})
      return result
    }
    const result = getFlatList(this.json.list)
    this._flatResult = result;
    const obj = result.reduce((prev, cur) => {
      prev[cur.key] = 
        this.initData && this.initData[cur.key] !== undefined ? [this.initData[cur.key]] : /**/
        [this.needInit && cur.options?.defaultValue || ''];
      if (cur.rules) {
        prev[cur.key].push(genRulesValidatorFn(cur.rules))
      } 
      return prev
    }, {})
    this._form = this.fb.group(obj)
  }

  public getData() {
    return {
      ...this._form.value
    }
  }

  public checkValid() {
    Object.values(this._form.controls).forEach(control => {
      control.markAsDirty();
      control.updateValueAndValidity();
    })
    return Object.entries(this._form.controls).filter(([k, c]) => !c.valid)
      .map(([c]) => this._flatResult.find(f => f.key == c)).filter(c => !!c).map(c => c.label)
  }
}
