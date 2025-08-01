import { Component, OnInit } from '@angular/core';
import { ITask } from '../../../models/tasks';
import { NgClass } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../shared/delete-dialog.component';
import { TaskService } from '../../../services/tasks.service';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { NgxPaginationModule, } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    MatChipsModule,
    MatDialogModule,
    NgxPaginationModule,
    FormsModule,
    MatIconModule,
    DatePipe,
    NgClass
  ],
  providers: [MatDialog],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit{
  userId = localStorage.getItem('currentUserId');
  noTasks = false;
  taskList: ITask[] = [];
  taskListFiltered : ITask[] = [];
  dialogRef!: MatDialogRef<DeleteDialogComponent>;
  page = 1;
  itemsEachPage = 5;
  firstItem! : number;
  lastItem! : number;
  sortOrder  = true;
  sortBy : keyof ITask = "title";
  searchText  = "";

  constructor(private taskService: TaskService, private dialog: MatDialog) {
  }

  ngOnInit()
  {
    setTimeout(() => {
      this.getTasks();
    }, 100); 
  }

  getTasks() {
      this.taskService
          .getTaskList()
          .subscribe((response) => {
            this.taskList = this.sortTasks(response.data.records,this.sortBy,this.sortOrder);
            this.taskListFiltered = this.taskList;
            this.calculateFirstAndLastItems();
          })
  }

  deleteClicked(id: string) {
    this.dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '200px',
      width: '250px',
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteTask(id);
      }
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTaskById(id).subscribe({
      next: () => {
        this.getTasks();
      },
      error: (err) => console.error('Error occured:' + err),
    });
  }

  calculateFirstAndLastItems()
  {
    this.firstItem =  (this.page-1)*this.itemsEachPage + 1;//remove all the items of first page and start from next
    this.lastItem = Math.min(this.page*this.itemsEachPage, this.taskListFiltered.length);//each page* current page will be the last, or totalItems(1-9 for page size 10)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageNumberChange(event : any)
  {
    this.page = event;
    this.calculateFirstAndLastItems();
  }

  sortTasks(tasks: ITask[], field: keyof ITask, order:boolean): ITask[] {
    this.sortBy = field;
    this.sortOrder = order;

    return tasks.sort((a, b) => {
      const valueA = a?.[field]?.toString().toLowerCase() ?? '';
      const valueB = b?.[field]?.toString().toLowerCase() ?? '';

      if (order) return valueA.localeCompare(valueB);
      else return valueB.localeCompare(valueA);
    });
  }

  filterItems()
  {
    const search = this.searchText.trim();
    this.taskListFiltered = this.taskList.filter(item => 
      item.title.trim().toLocaleLowerCase().includes(search?.toLocaleLowerCase() || '') ||
      item.status.trim().toLocaleLowerCase().includes(this.searchText?.toLocaleLowerCase() || '') || 
      item.priority.trim().toLocaleLowerCase().includes(this.searchText?.toLocaleLowerCase() || '') || 
      item.category.trim().toLocaleLowerCase().includes(this.searchText?.toLocaleLowerCase() || '')
    );
    this.calculateFirstAndLastItems();
    this.page = 1;//if filter applied on other pages, shows empty list and records exist only on first page
  }
}
