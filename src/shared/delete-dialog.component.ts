import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogClose,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  template: `
    <h2 mat-dialog-title>Delete Confirmation</h2>
    <div mat-dialog-content>Are you sure you want to delete this task?</div>
    <mat-dialog-actions class="d-flex justify-content-end">
      <button
        [mat-dialog-close]="false"
        class="btn btn-secondary text-white me-2"
      >
        No
      </button>
      <button [mat-dialog-close]="true" class="btn btn-danger text-white">
        Yes
      </button>
    </mat-dialog-actions>
  `,
})
export class DeleteDialogComponent {}
