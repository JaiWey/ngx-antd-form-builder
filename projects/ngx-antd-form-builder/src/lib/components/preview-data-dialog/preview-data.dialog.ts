import { Component, Inject } from "@angular/core";
import {DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import { FormsModule } from "@angular/forms";
import 'codemirror/mode/javascript/javascript';
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import {Clipboard} from '@angular/cdk/clipboard';
import { NzButtonModule } from "ng-zorro-antd/button";

@Component({
  standalone: true,
  selector: 'app-preview-data-dialog',
  templateUrl: './preview-data.dialog.html',
  styleUrl: './preview-data.dialog.scss',
  imports: [FormsModule, CodemirrorModule, NzButtonModule]
})
export class PreviewDataDialog {
  constructor(
      public dialogRef: DialogRef<PreviewDataDialog>,
      @Inject(DIALOG_DATA) public data,
      private clipboard: Clipboard
  ) {
  }

  public close() {
    this.dialogRef.close();
  }

  public copy() {
    this.clipboard.copy(this.data.json);
  }
}

