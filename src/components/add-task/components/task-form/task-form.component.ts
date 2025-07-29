import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { IEditTask } from '../../../../models/tasks';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepicker,MatDatepickerToggle,MatDatepickerInput } from '@angular/material/datepicker';
import { MatHint } from '@angular/material/form-field';
import { MatChipInputEvent,MatChipGrid,MatChipInput,MatChipRow} from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskService } from '../../../../services/tasks.service';
import { Router } from '@angular/router';
import { MESSAGE_CONSTANTS } from '../../../../app/core/constants/constants';
import { HotToastService } from '@ngneat/hot-toast';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [MatFormField, MatError,MatSelect, MatOption,ReactiveFormsModule,
    MatDatepicker,MatDatepickerToggle,MatHint,MatChipGrid,MatChipInput,MatIcon,MatChipRow,MatDatepickerInput,NgIf],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{
    @Input() taskId!: string;

    addTaskForm! : FormGroup;
    isEdit = false;
    currentTaskId = '';
    isPro = true;
    
    constructor(private taskService : TaskService, private router : Router,private destroyRef : DestroyRef, private toast : HotToastService) { 
    }

    ngOnInit()
    {
      if (this.taskId !== '') {
        this.isEdit = true;
        this.currentTaskId = this.taskId;
        this.getTask(this.currentTaskId);
      }
    }
    
    get f() : Record<string, FormControl>
    {
      return this.addTaskForm.controls as Record<string, FormControl>;
    }

    getTask(id:string)
    {
      this.taskService.getTaskById(id).subscribe((response) =>
        {
          this.addTaskForm.patchValue({
            title:response.data.title,
            status:response.data.status,
            priority:response.data.priority,
            dueDate:new Date(response.data.dueDate),
            category:response.data.category,
            labels:response.data.labels ? response.data.labels : []
          })
        }
      );
    }

    submit()
    {
      if(this.addTaskForm.valid)
      {
        const task : IEditTask = {
            title : this.f['title'].value,
            status : this.f['status'].value,
            category : this.f['category'].value,
            priority : this.f['priority'].value,
            labels :this.f['labels'].value,
            dueDate : new Date(this.f['dueDate'].value),
            markAsCompleted : false,
            categoryId : 1,
            isRecurring : false,
            hasReminder : false
          }


        if(!this.isEdit)
        {
            this.taskService.addTask(task).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
              this.addTaskForm.reset();
              this.router.navigate(['/list']);
              this.toast.success(MESSAGE_CONSTANTS.TASK_ADDED);
            })      

        }
        else
        {
            this.taskService.editTask(this.currentTaskId,task)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() =>{
              this.addTaskForm.reset();
              this.router.navigate(['/list'])
              this.toast.success(MESSAGE_CONSTANTS.TASK_UPDATED);
            })
        }
        
      }
    }
    
    removeLabel(keyword: string) {
      const labels = this.addTaskForm.controls['labels'].value;
        const index = labels.indexOf(keyword);
        if (index < 0) {
          return labels;
        }
  
      labels.splice(index, 1);
      this.addTaskForm.controls['labels'].setValue([...labels]);
      }
  
    addLabel(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
      if (value) {
        const labels = this.addTaskForm.controls['labels'].value || []
        this.addTaskForm.controls['labels'].setValue([...labels, value]);
      }
      event.chipInput!.clear();
    }

    private initializeForm()
    {
      this.addTaskForm = new FormGroup({
        title : new FormControl('',[Validators.required,Validators.maxLength(500)]),
        status : new FormControl({value : 'Pending', disabled : !this.isEdit},[Validators.required]),
        priority : new FormControl('Low',[Validators.required]),
        dueDate : new FormControl<Date>(new Date(),[Validators.required]),
        labels : new FormControl<string[]>([]),
        category : new FormControl('Personal',[Validators.required]),
      });
   }
}
