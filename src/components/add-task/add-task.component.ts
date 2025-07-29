import { Component,ChangeDetectionStrategy, OnInit, DestroyRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import { ActivatedRoute, Router} from '@angular/router';
import { TaskService } from '../../services/tasks.service';
import { IEditTask, ITask } from '../../models/tasks';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HotToastService } from '@ngneat/hot-toast';
import { MESSAGE_CONSTANTS } from '../../app/core/constants/constants';


@Component({
  selector: 'app-add-task',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [ ReactiveFormsModule,MatFormFieldModule,MatIconModule,MatSelectModule,
             MatChipsModule, MatIconModule, MatDatepickerModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddTaskComponent implements OnInit{

    isEdit = false; 
    addTaskForm! : FormGroup;
    task! : ITask;
    currentTaskId  = '';
    maxTaskId  = 0;
    isPro = true;
    activeTab = 'comments';

    constructor(private route:ActivatedRoute, private taskService : TaskService, private router : Router,private destroyRef : DestroyRef,private toast: HotToastService) {}

    ngOnInit()
    {
      this.route.url.subscribe(urlSegments => {
        const urlPath = urlSegments.map(segment => segment.path).join('/');
        const id = this.route.snapshot.paramMap.get('id'); 

        if (urlPath.startsWith('tasks/edit-task') && id) {
          this.isEdit = true;
          this.currentTaskId =id;
          // console.log('Current Task ID:', this.currentTaskId);
          // this.getTask(id);
        }
      });
      // this.initializeForm();
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
              this.router.navigate(['/tasks']);
              this.toast.success(MESSAGE_CONSTANTS.TASK_ADDED);
            })      

        }
        else
        {
            this.taskService.editTask(this.currentTaskId,task)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() =>{
              this.addTaskForm.reset();
              this.router.navigate(['/tasks'])
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
