export interface ITask
{
    id : string;
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
    title : string;
    status : "Pending" | "Completed" | "Over Due";
    priority : "High" | "Medium" | "Low";
    categoryId : number;
    category : string;
    labels? : string[] ;
    dueDate : Date;
    recurringTaskId? : number;
    isRecurring : boolean;
    markAsCompleted : boolean;
    hasReminder : boolean;
    description? : string
}
