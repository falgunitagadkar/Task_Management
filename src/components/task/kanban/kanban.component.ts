import { Component, OnInit } from '@angular/core';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';
import { KanbanColumn } from './models/kanban-column.model';
import { TaskService } from '../../../services/tasks.service';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanColumnComponent],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent implements OnInit{
    columns : KanbanColumn = {
      pending: [],
      completed: [],
      overdue: []
    } ;

    constructor(private taskService : TaskService) {}

    ngOnInit(){
      this.getTasks();
    }

    getTasks()
    {
      this.taskService.getTaskList().subscribe((response) => {
        const task = response.data.records;
        this.columns.pending = task.filter(t => t.status === 'Pending');
        this.columns.completed = task.filter(t => t.status === 'Completed');
        this.columns.overdue = task.filter(t => t.status === 'OverDue');
      })
    }

    onMarkComplete(taskId:string)
    {
      // eslint-disable-next-line no-console
      console.log('Marking task as complete:', taskId);
    }
}
