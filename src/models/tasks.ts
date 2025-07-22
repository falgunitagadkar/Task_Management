export interface ITask
{
    id : number;
    userId : number;
    title : string;
    status : string;
    priority : string;
    category : string;
    labels : string[] | null;
    isCompleted : boolean;
    description? : null;
    dueDate : Date;
}

export interface IEditTask
{
    userId : number;
    title : string;
    status : "Pending" | "Completed" | "Over Due";
    priority : "High" | "Medium" | "Low";
    category : string;
    labels : string[] | null;
    isCompleted : boolean;
    description? : null;
    dueDate : string;
}

export interface TaskResponse
{
    id : number;
    tasks : ITask[];
}