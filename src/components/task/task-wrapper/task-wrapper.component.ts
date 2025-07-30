import { Component } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { NgIf } from '@angular/common';
import { KanbanComponent } from '../kanban/kanban.component';
import { TASK_PRIORITY, TASK_STATUS} from '../../../app/core/constants/constants';


@Component({
  selector: 'app-task-wrapper',
  standalone: true,
  imports: [NgIf,ListComponent,KanbanComponent],
  templateUrl: './task-wrapper.component.html',
  styleUrl: './task-wrapper.component.css'
})
export class TaskWrapperComponent {
  isKanban = false;
  TASK_PRIORITY = TASK_PRIORITY;
  TASK_STATUS = TASK_STATUS;
}
