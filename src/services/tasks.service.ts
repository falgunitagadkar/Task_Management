import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEditTask, ITask } from '../models/tasks';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  getTaskListByUserId(userId: number): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.apiUrl}` + '?userId=' + userId);
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
