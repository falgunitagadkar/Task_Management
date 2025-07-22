import { Component,ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatFormField, MatError, MatLabel, MatHint, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIcon,MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule,MatDatepicker,MatDatepickerToggle } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule,MatSelect,MatOption } from '@angular/material/select';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';
import { TaskService } from '../../services/tasks.service';
import { IEditTask, ITask } from '../../models/tasks';
import { concatMap, tap } from 'rxjs';

@Component({
  selector: 'app-add-task',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [ ReactiveFormsModule,RouterLink,MatFormFieldModule,MatFormField, MatError, MatLabel, MatInput,MatIconModule,MatSelectModule,MatSelect,MatOption,
             MatRadioGroup, MatRadioButton, MatChipsModule, MatIconModule, MatIcon, MatDatepickerModule,MatDatepicker,MatDatepickerToggle,MatHint],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddTaskComponent implements OnInit{

    isEdit = false; 
    addTaskForm! : FormGroup;
    currentUserId  = Number(localStorage.getItem('currentUserId'));
    task! : ITask;
    currentTaskId  = '';
    maxTaskId  = 0;

    constructor(private route:ActivatedRoute, private taskService : TaskService, private router : Router) {}

    ngOnInit()
    {
      this.route.url.subscribe(urlSegments => {
        const urlPath = urlSegments.map(segment => segment.path).join('/');
        const id = this.route.snapshot.paramMap.get('id'); 
        
        if (urlPath.startsWith('edit-task') && id) {
          this.isEdit = true;
          this.getTask(id);
        }
      });

      this.initializeForm();
    }

    get f() : Record<string, FormControl>
    {
      return this.addTaskForm.controls as Record<string, FormControl>;
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

    getTask(id:string)
    {
      this.taskService.getTaskById(Number(id)).subscribe(response =>
        {
          // this.currentTaskId = response.id;
          this.addTaskForm.setValue({
            title:response.title,
            status:response.status,
            priority:response.priority,
            dueDate:new Date(response.dueDate),
            category:response.category,
            labels:response.labels,
            isCompleted:response.isCompleted
          })
        }
      );
    }

    submit()
    {
      if(this.addTaskForm.valid)
      {
        if(!this.isEdit)
        {
            const task : ITask = {
              id : 0,
              userId : this.currentUserId,
              title : this.f['title'].value,
              status : this.f['status'].value,
              category : this.f['category'].value,
              priority : this.f['priority'].value,
              labels :this.f['labels'].value,
              dueDate : new Date(this.f['dueDate'].value),
              isCompleted : this.f['isCompleted'].value
            }
          
            this.taskService.getTaskListByUserId().pipe(
              tap(response => {
                this.maxTaskId = response.data.records.reduce((max, val) => Math.max(max, Number(val.id)), this.maxTaskId);
                task.id = (this.maxTaskId + 1);
              }),
              concatMap(() => this.taskService.addTask(task))
              ).subscribe({
              next: () => {
                this.router.navigate(['/list']);
              }        
            });

        }
        else
        {
            const task : IEditTask = {
              userId : this.currentUserId,
              title : this.f['title'].value,
              status : this.f['status'].value,
              category : this.f['category'].value,
              priority : this.f['priority'].value,
              labels :this.f['labels'].value,
              dueDate : new Date(this.f['dueDate'].value).toLocaleDateString('en-CA'),
              isCompleted : this.f['isCompleted'].value
            }

            this.taskService.editTask(this.currentTaskId,task).subscribe({
              next : () => this.router.navigate(['/list'])
            })
        }
        
      }
    }
    
    private initializeForm()
    {
      this.addTaskForm = new FormGroup({
        title : new FormControl('',[Validators.required,Validators.maxLength(500)]),
        status : new FormControl({value : 'Pending', disabled : !this.isEdit},[Validators.required]),
        priority : new FormControl('',[Validators.required]),
        dueDate : new FormControl<Date>(new Date(),[Validators.required]),
        labels : new FormControl<string[]>([]),
        category : new FormControl('Personal',[Validators.required]),
        isCompleted : new FormControl(false)
      });
   }
}
