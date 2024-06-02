import { Component, EventEmitter, Input, Output, Optional, Inject } from "@angular/core";
import { ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { CommonModule } from "@angular/common";
import { NzGridModule } from "ng-zorro-antd/grid";
import { DesignFormItemComponent } from "../design-form-item/design-form-item.component";

@Component({
  standalone: true,
  selector: 'app-build-blocks',
  templateUrl: './build-blocks.component.html',
  styleUrls: ['./build-blocks.component.scss'],
  imports: [
    ReactiveFormsModule, NzTabsModule,NzCardModule,NzCollapseModule,CommonModule,NzGridModule,
    DesignFormItemComponent,
  ]
})
export class BuildBlocksComponent  {
  @Input() formConfig: any;
  @Input() record: any;
  @Input() form!: UntypedFormGroup;
  constructor(
  ) {}
}