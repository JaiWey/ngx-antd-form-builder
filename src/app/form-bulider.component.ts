import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { NgxAntdFormBuilderComponent } from '../../projects/ngx-antd-form-builder/src/public-api';

@Component({
  selector: 'app-form-build',
  standalone: true,
  imports: [
    CommonModule,
    NgxAntdFormBuilderComponent
  ],
  template: `
  <ngx-antd-form-builder (saveSchema)="save($event)"></ngx-antd-form-builder>
  `,
})

export class FormBuilderComponent {
  @ViewChild('FormBuilder') FormBuilder!: NgxAntdFormBuilderComponent;

  save(json) {
    console.log(json)
  }
}