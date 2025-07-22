import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEditTask, ITask } from '../models/tasks';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { BaseResponseModel, DataQueryResponseModel } from '../app/core/models/generic_models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  getTaskListByUserId(): Observable<BaseResponseModel<DataQueryResponseModel<ITask>>> {
    return this.http.get<BaseResponseModel<DataQueryResponseModel<ITask>>>(`${environment.apiUrl}/tasks/get-all-tasks`);
  }

  getTaskById(id: number) {
    return this.http.get<ITask>(`${this.apiUrl}/tasks` + '/' + id);
  }

  deleteTaskById(id: string) {
    return this.http.delete(`${this.apiUrl}/tasks` + '/' + id);
  }

  addTask(task: ITask) {
    return this.http.post(`${this.apiUrl}/tasks`,task);
  }

  editTask(id:string,task : IEditTask)
  {
    return this.http.put(`${this.apiUrl}/tasks` + '/' + id, task);
  }
}
