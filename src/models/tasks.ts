export interface ITask
{
    id : number;
    userId : number;
    title : string;
    status : string;
    priority : string;
    type : string;
    labels : string[] | null;
    isActive : boolean;
    description? : null;
    dueDate : Date;
}

export interface IEditTask
{
    userId : number;
    title : string;
    status : "To Do" | "In Progess" | "Completed";
    priority : "High" | "Medium" | "Low";
    type : "Bug" | "Feature" | "Enhancement";
    labels : string[] | null;
    isActive : boolean;
    description? : null;
    dueDate : string;
}

export interface TaskResponse
{
    id : number;
    tasks : ITask[];
}