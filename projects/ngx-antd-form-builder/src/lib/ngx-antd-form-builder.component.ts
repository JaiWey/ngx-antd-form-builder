import { HttpClientModule } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import {DialogModule} from '@angular/cdk/dialog'
import { CollapseItemListComponent } from './components/collapse-item-list/collapse-item-list.component';
import { DesignFormChangeOptionComponent } from './components/design-form-change-option/design-form-change-option.component';
import { DesignFormComponentPanelComponent } from './components/design-form-component-panel/design-form-component-panel.component';
import { DesignFormItemPropertiesComponent } from './components/design-form-item-properties/design-form-item-properties.component';
import { DesignFormNodeComponent } from './components/design-form-node/design-form-node.component';
import { DesignFormPropertiesComponent } from './components/design-form-properties/design-form-properties.component';
import { LayoutItemComponent } from './components/layout-item/layout-item.component';
import { ComponentList, DefaultFields, LayoutList } from './utils/form-item.config';
import { NgxAntdFormBuilder } from './ngx-antd-form-builder.interface';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { cloneDeep } from './utils/func';

@Component({
  selector: 'ngx-antd-form-builder',
  standalone: true,
  imports: [
    CommonModule,
    DesignFormNodeComponent,
    CollapseItemListComponent,DesignFormComponentPanelComponent,LayoutItemComponent,
    DesignFormPropertiesComponent,DesignFormItemPropertiesComponent,DesignFormChangeOptionComponent,
    FormsModule,
    HttpClientModule,
    DialogModule,
    NzCollapseModule,NzTabsModule,NzIconModule,
    NzToolTipModule,
  ],
  template: `
  <div class="content">
  <aside class="left">
    <nz-collapse>
      <nz-collapse-panel
        [nzHeader]="'Basic Components'"
        [nzActive]="true"
      >
        <app-collapse-item-list
          [fields]="basicArray"
          (generateKey)="generateKey($event.list, $event.index)"
        ></app-collapse-item-list>
      </nz-collapse-panel>
      <nz-collapse-panel [nzHeader]="'Layout Components'" [nzActive]="true">
        <app-collapse-item-list
          [fields]="layoutArray"
          (generateKey)="generateKey($event.list, $event.index)"
        ></app-collapse-item-list>
      </nz-collapse-panel>
    </nz-collapse>
  </aside>
  <section class="center">
    <app-design-form-component-panel
      [data]="data"
      [selectItem]="selectItem"
      (handleSetSelectItem)="handleSetSelectItem($event)"
    ></app-design-form-component-panel>
  </section>
  <aside class="right">
    <nz-tabset [(nzSelectedIndex)]="activeKey">
      <nz-tab nzTitle="Layout Properties">
        <app-design-form-properties
          [config]="data.config"
        ></app-design-form-properties>
      </nz-tab>
      <nz-tab nzTitle="Component Properties">
        <app-design-form-item-properties
          [selectItem]="selectItem"
          [config]="data.config"
        ></app-design-form-item-properties>
      </nz-tab>
    </nz-tabset>
  </aside>
</div>
  `,
  styles: `
    .content {
      height: 100%;
      display: flex;
    }
    .left, .right {
      width: 300px;
    }
    .center {
      flex: 1;
      margin: 0 8px 0;
    }
    .right {

    }
  `
})
export class NgxAntdFormBuilderComponent {
  @Input() fields: Array<string> = DefaultFields
  @Input() attrLists: Array<any> = []

  //@ViewChild('appDesignFormItemProperties') public appDesignFormItemProperties: DesignFormItemPropertiesComponent;
  //@Input() initData: any
  basicArray: Array<NgxAntdFormBuilder.AllComponentType> = ComponentList.filter(item => this.fields.includes(item.type));
  layoutArray:  Array<NgxAntdFormBuilder.AllLayout> = LayoutList.filter(item => this.fields.includes(item.type));

  data: NgxAntdFormBuilder.Config = {
    list: [],
    config: {
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
      },
    }
  }
  selectItem: any = {
    key: ""
  }
  activeKey: number = 0;
  noModel: Array<string> = [
    "button",
    "divider",
    "card",
    "grid",
    "tabs",
    "table",
    "alert",
    "text",
    "html"
  ]

  constructor(
  ) {
  }

  ngOnInit(): void {
    console.log()
    //this.data = cloneDeep(this.initData)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields']) {
      this.basicArray = ComponentList.filter(item => this.fields.includes(item.type))
      this.layoutArray = LayoutList.filter(item => this.fields.includes(item.type));
    }
  }

  public init(data) {
    this.data = cloneDeep(data)
  }

  public recursiveGetComponentList() {
    const list: Array<NgxAntdFormBuilder.AllType> = []
    const recursivePush = (item: NgxAntdFormBuilder.AllType) => {
      //if (['input','textarea','number','select','checkbox','radio','date','rate','slider'])
      if ( 'card' == item.type) {
        item.list.forEach(recursivePush)
      } else if (item.type == 'tabs' || item.type == 'grid' || item.type == 'collapse') {
        item.columns.forEach(col => {
          col.list.forEach(recursivePush)
        })
      } else {
        list.push(item)
      }
    }
    this.data.list.forEach(recursivePush)
    return list
  }

  getData() {
    return cloneDeep(this.data)
  }

  getJsonSchema() {
    return JSON.stringify(this.data, null, "\t")
  }

  generateKey(list, index) {
    // 生成key值
    const key = list[index].type + "_" + new Date().getTime();
    // this.$set(list, index, {
    //   ...list[index],
    //   key,
    //   model: key
    // });
    list[index].key = list[index].model = key
    // list[index] = {
    //   ...list[index],
    //   key,
    //   model: key
    // }
    if (this.noModel.includes(list[index].type)) {
      // 删除不需要的model属性
      delete list[index].model;
    }
  }

  handleSetSelectItem(record) {
          // 设置selectItem的值
    this.selectItem = record;

    // 判断是否选中控件，如果选中则弹出属性面板，否则关闭属性面板
    if (record.key) {
      this.changeTab(2);
    } else {
      this.changeTab(1);
    }
  }

  changeTab(e) {
    this.activeKey = e;
  }
}

