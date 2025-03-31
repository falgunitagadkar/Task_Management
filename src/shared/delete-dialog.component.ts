import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogClose , MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  standalone : true,
  imports : [ MatDialogModule, MatButton , MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  template: `
    <h2 mat-dialog-title>Delete</h2>
    <div mat-dialog-content>Are you sure you want to delete this task?</div>
    <div mat-dialog-actions class="d-flex justify-content-end">
      <button mat-button mat-dialog-close="false" class="btn btn-small btn-secondary">No</button>
      <button mat-button mat-dialog-close="true" class="btn btn-small btn-danger">Yes</button>
    </div>
  `,
})
export class DeleteDialogComponent {
  constructor() {}

  closeDialog() {
    // This will be handled from the main component
  }
}