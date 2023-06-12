

export interface actionType {
  type: string;
  data: any;
}

interface toDo {
  id: string;
  title: string;
  isDone: boolean;
}
export type ToDo = toDo[];
