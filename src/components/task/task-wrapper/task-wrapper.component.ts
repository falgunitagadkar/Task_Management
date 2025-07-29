import { Component } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { NgIf } from '@angular/common';
import { KanbanComponent } from '../kanban/kanban.component';

@Component({
  selector: 'app-task-wrapper',
  standalone: true,
  imports: [NgIf,ListComponent,KanbanComponent],
  templateUrl: './task-wrapper.component.html',
  styleUrl: './task-wrapper.component.css'
})
export class TaskWrapperComponent {
  isKanban = false;
}
