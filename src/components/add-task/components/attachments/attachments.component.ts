import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-attachments',
  standalone: true,
  imports: [NgFor],
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.css'
})
export class AttachmentsComponent {

  @Input () attachments!: string;
  
  comments = [
    { user: 'Alice', message: 'Started working on it.', time: '2h ago' },
    { user: 'Bob', message: 'Blocked by API error.', time: '1h ago' },
  ];
}
