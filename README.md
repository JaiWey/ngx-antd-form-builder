# ngx-antd-form-builder
Simple Angular form builder that quickly generated forms.
- Angular 17 standalone component
- Use ng-zorro-antd as UI library
- Use sortable.js for Drag & Drop
- Support regex validation
- Support nested layout

[Demo Website](https://jaiwey.github.io/ngx-antd-form-builder) 



![](https://raw.githubusercontent.com/JaiWey/ngx-antd-form-builder/main/screenshots.gif)

## Install

```bash
npm install ngx-antd-form-builder ng-zorro-antd
```

# Basic Usage

This package relys on codemirror and antd, make sure to import global style file and follow [ng-zorro-antd configuration guide](https://ng.ant.design/docs/getting-started/en)
```scss
@import "ng-zorro-antd/ng-zorro-antd.min.css";
@import 'codemirror/lib/codemirror';
```

## Designer
```typescript
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

  //save Schema callback
  save(json) {
    console.log(json)
  }
}
```

## Form Viewer

```typescript
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
```

# Vendor Dependencies
- [ng-zorro-antd](https://ng.ant.design)
- [ngx-codemirror](https://github.com/scttcper/ngx-codemirror)
- [sortablejs](https://sortablejs.github.io/Sortable/)

# Develop
```bash
$ npm install
$ npm start
```
Then navigate to http://localhost:4200/ in your browser and you should be able to see the form builder in action.

