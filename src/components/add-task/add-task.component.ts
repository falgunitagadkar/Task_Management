import { Component } from '@angular/core';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { MatChipGrid } from '@angular/material/chips';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [MatFormField, MatError, MatLabel, ReactiveFormsModule, MatInput, MatRadioGroup, MatRadioButton],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

    addTaskForm! : FormGroup;

    constructor() {
      this.addTaskForm = new FormGroup({
        title : new FormControl('',[Validators.required,Validators.maxLength(500)]),
        password : new FormControl('',[Validators.required])
      });  
    }
}
