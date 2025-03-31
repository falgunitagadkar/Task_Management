import { Component } from '@angular/core';
import { ITask } from '../../models/tasks';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../shared/delete-dialog.component';
import { TaskService } from '../../services/tasks.service';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ NgIf, NgFor, RouterLink],
  providers:[MatDialog],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  userId = localStorage.getItem("currentUserId");
  noTasks : boolean = false;
  taskList! : ITask[];
  dialogRef! : MatDialogRef<DeleteDialogComponent>;

  constructor(private taskService : TaskService, private dialog : MatDialog){ }

  ngOnInit()
  {
    this.getTasks();
  }

  getTasks()
  {
    this.userId ? this.taskService.getTaskListByUserId(parseInt(this.userId)).subscribe( response => {
      this.taskList = response;
    }) : this.noTasks = true
  }

  editClicked(id:number)
  {

  }

  deleteClicked(id : number)
  {
    this.dialogRef = this.dialog.open(DeleteDialogComponent,{
      height:'200px',
      width:'250px'
    })

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
}
