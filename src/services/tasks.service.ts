import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ITask } from "../models/tasks";
import { Observable } from "rxjs";

@Injectable({
    providedIn : "root"
})
export class TaskService {

    private apiUrl = 'http://localhost:3000/tasks';
    constructor(private http:HttpClient){}

    getTaskListByUserId(userId : number) : Observable<ITask[]>
    {
        return this.http.get<ITask[]>(this.apiUrl + '?userId=' + userId);
    }

    getTaskListBySearch(userId : number,search : string) 
    {
        return this.http.get<ITask[]>(this.apiUrl + '?userId=' + userId);
    }

}