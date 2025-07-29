import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEditTask, ITask } from '../models/tasks';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { BaseResponseModel, DataQueryResponseModel } from '../app/core/models/generic_models';
import { API_ROUTES } from '../app/core/constants/apiroutes';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor(private http: HttpClient) {}

  getTaskList(): Observable<BaseResponseModel<DataQueryResponseModel<ITask>>> {
    return this.http.get<BaseResponseModel<DataQueryResponseModel<ITask>>>(`${environment.apiUrl}${API_ROUTES.TASK.GETALL}`);
  }

  getTaskById(id: string) {
    return this.http.get<BaseResponseModel<ITask>>(`${environment.apiUrl}${API_ROUTES.TASK.GETBYID}` + '/' + id);
  }

  deleteTaskById(id: string) {
    return this.http.delete(`${environment.apiUrl}${API_ROUTES.TASK.DELETE}` + '/' + id);
  }

  addTask(task: IEditTask) {
    return this.http.post(`${environment.apiUrl}${API_ROUTES.TASK.CREATE}`,task);
  }

  editTask(id:string,task : IEditTask) {
    return this.http.put(`${environment.apiUrl}${API_ROUTES.TASK.GETBYID}` + '/' + id, task);
  }
}
