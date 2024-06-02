import { Component, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { Options } from 'sortablejs';
import { NgxAntdFormBuilderComponent } from '../../ngx-antd-form-builder.component';
import { LayoutItemComponent } from '../layout-item/layout-item.component';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SortablejsModule } from '../../utils/sortablejs/sortablejs.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { PreviewDialog } from '../preview-dialog/preview.dialog';
import { cloneDeep } from '../../utils/func';
import { PreviewDataDialog } from '../preview-data-dialog/preview-data.dialog';

@Component({
  standalone: true,
  selector: 'app-design-form-component-panel',
  templateUrl: './design-form-component-panel.component.html',
  styleUrls: ['./design-form-component-panel.component.scss'],
  imports: [
    DialogModule,
    LayoutItemComponent,CommonModule,NzLayoutModule,NzFormModule,NzButtonModule,NzIconModule,
    SortablejsModule
  ]
})
export class DesignFormComponentPanelComponent {
  @Input() data: any
  @Input() selectItem: any;
  @Output() readonly handleSetSelectItem: EventEmitter<any> = new EventEmitter()
  options: Options = {
    group: 'draggable-box',
    // ghostClass: 'moving',
    animation: 180,
    handle: '.drag-move',
    onAdd: this.deepClone.bind(this)
  };
  insertAllowedType: string[]= [
    "input",
    "textarea",
    "number",
    "select",
    "checkbox",
    "radio",
    "date",
    "time",
    "rate",
    "slider",
    "switch",
    "text",
    "html"
  ];
  constructor(
    private dialog: Dialog,
    private antdFormBuilderComponent: NgxAntdFormBuilderComponent,
  ) {
  }

  openPreview() {
    this.dialog.open(PreviewDialog, {
      minWidth: '300px',
      data: {
        json: this.antdFormBuilderComponent.getData()
      }
    })
  }

  openJsonSchema() {
    this.dialog.open(PreviewDataDialog, {
      minWidth: '600px',
      data: {
        json: this.antdFormBuilderComponent.getJsonSchema()
      }
    })
  }

  deepClone(evt) {
    const newIndex = evt.newIndex;
    // json深拷贝一次
    //const listString = JSON.stringify(this.data.list);
    this.data.list = cloneDeep(this.data.list)// JSON.parse(listString);
    // 删除icon及compoent属性
    delete this.data.list[newIndex].component;
    this.handleSetSelectItem.emit(this.data.list[newIndex]);
  }

  handleColAdd($event) {
    const {
      evt, columns, isCopy = false
    } = $event

    // 重置或者生成key值
    const newIndex = evt.newIndex;
    const key = columns[newIndex].type + "_" + new Date().getTime();
    if (columns[newIndex].key === "" || isCopy) {
      // this.$set(columns, newIndex, {
      //   ...columns[newIndex],
      //   key,
      //   model: key
      // });
      columns[newIndex] = {
        ...columns[newIndex],
        key,
        model: key
      }
      /** 
      if (this.noModel.includes(columns[newIndex].type)) {
        // 删除不需要的model属性
        delete columns[newIndex].model;
      }
      */
      if (typeof columns[newIndex].options !== "undefined") {
        // 深拷贝options
        //const optionsStr = JSON.stringify(columns[newIndex].options);
        columns[newIndex].options = cloneDeep(columns[newIndex].options) //JSON.parse(optionsStr);
      }
      if (typeof columns[newIndex].rules !== "undefined") {
        // 深拷贝rules
        //const rulesStr = JSON.stringify(columns[newIndex].rules);
        columns[newIndex].rules = cloneDeep(columns[newIndex].rules) //JSON.parse(rulesStr);
      }
      if (typeof columns[newIndex].list !== "undefined") {
        // 深拷贝list
        columns[newIndex].list = [];
      }
      if (typeof columns[newIndex].columns !== "undefined") {
        // 深拷贝columns
        //const columnsStr = JSON.stringify(columns[newIndex].columns);
        columns[newIndex].columns = cloneDeep(columns[newIndex].columns)// JSON.parse(columnsStr);
        // 复制时，清空数据
        columns[newIndex].columns.forEach(item => {
          item.list = [];
        });
      }
      if (columns[newIndex].type === "table") {
        // 深拷贝trs
        //const trsStr = JSON.stringify(columns[newIndex].trs);
        columns[newIndex].trs = cloneDeep(columns[newIndex].trs)// JSON.parse(trsStr);
        // 复制时，清空数据
        columns[newIndex].trs.forEach(item => {
          item.tds.forEach(val => {
            val.list = [];
          });
        });
      }
    }
    // 深拷贝数据
    //const listString = JSON.stringify(columns[newIndex]);
    columns[newIndex] = cloneDeep(columns[newIndex]) //JSON.parse(listString);
    this.handleSetSelectItem.emit(columns[newIndex]);
  }

  handleCopy(isCopy = true, data) {
  }
  handleDelete($event) {
    const traverse = array => {
      array = array.filter((element, index) => {
        if (["grid", "tabs", "selectInputList", 'collapse'].includes(element.type)) {
          // 栅格布局
          element.columns.forEach(item => {
            item.list = traverse(item.list);
          });
        }
        if (element.type === "card" || element.type === "batch" || element.type === "block") {
          // 卡片布局
          element.list = traverse(element.list);
        }
        if (element.type === "table") {
          // 表格布局
          element.trs.forEach(item => {
            item.tds.forEach(val => {
              val.list = traverse(val.list);
            });
          });
        }
        if (element.key !== this.selectItem.key) {
          return true;
        } else {
          if (array.length === 1) {
            this.handleSetSelectItem.emit({ key: "" });
            //this.handleSelectItem({ key: "" });
          } else if (array.length - 1 > index) {
            this.handleSetSelectItem.emit(array[index + 1]);
            //this.handleSelectItem();
          } else {
            this.handleSetSelectItem.emit(array[index - 1]);
            //this.handleSelectItem();
          }
          return false;
        }
      });
      return array;
    };
    this.data.list = traverse(this.data.list)
  }
}
