import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { NgxAntdFormBuilderComponent } from '../../projects/ngx-antd-form-builder/src/public-api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgxAntdFormBuilderComponent
  ],
  template: `
  <ngx-antd-form-builder #FormBuilder></ngx-antd-form-builder>
  `,
})

export class FormBuilderComponent implements AfterViewInit {
  @ViewChild('FormBuilder') FormBuilder!: NgxAntdFormBuilderComponent;

  ngAfterViewInit(): void {
    // const _data =  {
    // }
    // this.FormBuilder.init(_data);
  }
}