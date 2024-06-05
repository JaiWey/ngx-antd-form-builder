import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
      (saveSchema)="save()"
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
  @Input() json: string | {[key: string]: string} | undefined
  @Output() readonly saveSchema: EventEmitter<NgxAntdFormBuilder.Config> = new EventEmitter()
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

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields']) {
      this.basicArray = ComponentList.filter(item => this.fields.includes(item.type))
      this.layoutArray = LayoutList.filter(item => this.fields.includes(item.type));
    }
    if (changes['json'] && changes['json'].currentValue) {
      if (typeof changes['json'].currentValue === 'string') {
        try {
          this.init(JSON.parse(changes['json'].currentValue))
        } catch (e) {
          console.error(e);
        }
      } else {
        this.init(this.json)
      }
    }
  }

  public init(data) {
    this.data = cloneDeep(data)
  }

  public recursiveGetComponentList() {
    const list: Array<NgxAntdFormBuilder.AllType> = []
    const recursivePush = (item: NgxAntdFormBuilder.AllType) => {
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

  public getData() {
    return cloneDeep(this.data)
  }

  public getJsonSchema() {
    return JSON.stringify(this.data, null, "\t")
  }

  save() {
    this.saveSchema.emit(this.getData())
  }

  generateKey(list, index) {
    const key = list[index].type + "_" + new Date().getTime();
    list[index].key  = key
  }

  handleSetSelectItem(record) {
    this.selectItem = record;
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

