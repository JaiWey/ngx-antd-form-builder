import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgxAntdFormBuilderComponent } from '../../projects/ngx-antd-form-builder/src/public-api';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { NgxAntdFormBuilder } from "../../projects/ngx-antd-form-builder/src/lib/ngx-antd-form-builder.interface";

@Component({
  selector: 'app-form-build',
  standalone: true,
  imports: [
    CommonModule,HttpClientModule,
    NgxAntdFormBuilderComponent
  ],
  template: `
  <ngx-antd-form-builder [json]="json$|async" (saveSchema)="save($event)"></ngx-antd-form-builder>
  `,
})

export class FormBuilderComponent implements OnInit {
  json$: Observable<NgxAntdFormBuilder.Config>
  constructor(
    private http:HttpClient) {
      this.json$ = this.http
        .get<NgxAntdFormBuilder.Config>("./assets/schema.json")
  } 

  @ViewChild('FormBuilder') FormBuilder!: NgxAntdFormBuilderComponent;
  ngOnInit(): void {

  }

  save(json) {
    console.log(json)
  }
}