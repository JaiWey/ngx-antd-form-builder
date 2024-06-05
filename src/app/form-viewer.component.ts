import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { NgxAntdFormViewerComponent } from '../../projects/ngx-antd-form-builder/src/public-api';

@Component({
  selector: 'app-form-viewer',
  standalone: true,
  imports: [
    CommonModule,
    NgxAntdFormViewerComponent
  ],
  template: `
      <ngx-antd-form-viewer
        [json]="json"
        [initData]="data"
        #viewer
      ></ngx-antd-form-viewer>
      <button (click)="log()">log value</button>
  `,
})

export class FormViewerComponent {
  @ViewChild('viewer') viewer!: NgxAntdFormViewerComponent
  data = {
    name: "abcd"
  }
  json = {
    "list": [
      {
        "type": "input",
        "label": "name",
        "options": {
          "type": "text",
          "width": "100%",
          "defaultValue": "",
          "placeholder": "",
          "clearable": false,
          "maxLength": null,
          "disabled": false
        },
        "key": "name",
        "help": "",
        "rules": [
          {
            "required": true,
            "message": "Field Required"
          },
          {
            "pattern": "^[a-zA-Z]{3,}$",
            "message": "name should have at least 3 letters"
          }
        ]
      }
    ],
    "config": {
      "layout": "horizontal",
      "labelCol": {
        "xs": 4,
        "sm": 4,
        "md": 4,
        "lg": 4,
        "xl": 4,
        "xxl": 4
      },
      "labelWidth": 100,
      "labelLayout": "flex",
      "wrapperCol": {
        "xs": 18,
        "sm": 18,
        "md": 18,
        "lg": 18,
        "xl": 18,
        "xxl": 18
      }
    }
  }

  log() {
    const data = this.viewer.getData();
    console.log(data)
  }
}