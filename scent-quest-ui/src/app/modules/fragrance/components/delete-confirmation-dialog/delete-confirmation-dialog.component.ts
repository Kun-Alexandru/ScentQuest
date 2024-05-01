import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  template: `
    <div class="app-delete-confirmation-dialog">
      <h2 mat-dialog-title>Delete Confirmation</h2>
      <mat-dialog-content>
        Are you sure you want to delete this fragrance?
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button mat-dialog-close>No</button>
        <button mat-button [mat-dialog-close]="true" mat-flat-button mat-primary cdkFocusInitial>Yes, Delete</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .app-delete-confirmation-dialog {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      width: 300px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .mat-dialog-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .mat-dialog-content {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .mat-dialog-actions {
      display: flex;
      justify-content: flex-end;
    }

    .mat-dialog-actions button {
      margin-left: 10px;
    }

    .mat-dialog-actions button.mat-flat-button.mat-primary {
      background-color: #d32f2f;
      color: #fff;
    }

    .mat-dialog-actions button:hover {
      background-color: #f0f0f0;
    }
  `]
})
export class DeleteConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
