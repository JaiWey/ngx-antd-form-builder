import { Component, Inject, ViewChild } from "@angular/core";
import {DialogRef, DIALOG_DATA, Dialog} from '@angular/cdk/dialog';
import { NzButtonModule } from "ng-zorro-antd/button";
import { PreviewDataDialog } from "../preview-data-dialog/preview-data.dialog";
import { NgxAntdFormViewerComponent } from "../../ngx-antd-form-viewer.component";

@Component({
  standalone: true,
  selector: 'app-preview-dialog',
  templateUrl: './preview.dialog.html',
  styleUrl: './preview.dialog.scss',
  imports: [NgxAntdFormViewerComponent, NzButtonModule]
})
export class PreviewDialog {
  @ViewChild('designForm') designForm!: NgxAntdFormViewerComponent
  constructor(
      public dialog: Dialog,
      public dialogRef: DialogRef<PreviewDialog>,
      @Inject(DIALOG_DATA) public data
  ) {
  }

  public close() {
    this.dialogRef.close()
  }

  public view() {
    const json = this.designForm.getData()
    this.dialog.open(PreviewDataDialog, {
      minWidth: '300px',
      data: {
        json: JSON.stringify(json, null, "\t")
      }
    })
  }

  public check() {
    this.designForm.checkValid();
  }
}

