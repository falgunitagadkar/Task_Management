import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [NgFor],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  @Input () taskId!: string;
  
  comments = [
    { user: 'Alice', message: 'Started working on it.', time: '2h ago' },
    { user: 'Bob', message: 'Blocked by API error.', time: '1h ago' },
  ];
}
