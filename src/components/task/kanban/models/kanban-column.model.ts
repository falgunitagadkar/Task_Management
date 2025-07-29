import { ITask } from "../../../../models/tasks";

export interface KanbanColumn {
    pending: ITask[];
    overdue: ITask[];
    completed: ITask[];
  };


