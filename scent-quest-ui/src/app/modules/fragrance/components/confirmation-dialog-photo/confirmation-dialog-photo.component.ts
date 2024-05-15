import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-confirmation-dialog-photo',
  templateUrl: './confirmation-dialog-photo.component.html',
  styleUrl: './confirmation-dialog-photo.component.scss'
})
export class ConfirmationDialogPhotoComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

export interface ConfirmationDialogData {
  message: string;
  photo: string;
}
