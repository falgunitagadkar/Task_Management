import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../../../../models/tasks';
import { DatePipe } from '@angular/common';
import { NgFor, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [DatePipe, NgFor, NgIf, NgClass],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.css'
})
export class KanbanColumnComponent {
  @Input() title!: string;
  @Input() tasks: ITask[] = [];
  @Input() readonly = false;
  @Output() markComplete = new EventEmitter<string>();
}
