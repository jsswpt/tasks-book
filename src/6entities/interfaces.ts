import { Dayjs } from "dayjs";
import { getRandomId } from "../7shared/utils/getRandomId";

export enum AlertTypes {
  "error" = "error",
  "success" = "success",
}

export interface TaskProps {
  id: string;
  categoryid: string;
  userid: string;
  title: string;
  priority: number;
  deadLine: string;
  creationDate: string;
  isDone: boolean;
}

export interface TasksSliceProps {
  isLoading: boolean;
  alerts: SerializedActionAlert[];
  isSuccess: boolean;
  tasks: TaskProps[];
  activeTasks: TaskProps[];
  doneTasks: TaskProps[];
}

export interface CategoryProps {
  id: string;
  userid: string;
  icon: string;
  title: string;
}

export interface CategoriesProps {
  isLoading: boolean;
  alerts: SerializedActionAlert[];
  isSuccess: boolean;
  categories: CategoryProps[];
}

export interface SerializedActionAlert {
  action: string;
  type: AlertTypes;
  message: string;
  reason: string;
  id: string;
  reducer: string;
}

export interface AlertProps {
  action: string;
  type: AlertTypes;
  message: string;
  reason: string;
  reducer: string;
}

export class Alert implements SerializedActionAlert {
  type: AlertTypes;
  message: string;
  reason: string;
  id: string;
  action: string;
  reducer: string;
  constructor({ type, message, reason, action, reducer }: AlertProps) {
    this.action = action;
    this.type = type;
    this.message = message;
    this.reason = reason;
    this.id = getRandomId();
    this.reducer = reducer;
  }
}
