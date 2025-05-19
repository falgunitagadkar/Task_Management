export interface ITask
{
    id : string;
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