import { Priority, Status } from "../constants/constants";

export type Task = {
  id: string | number;
  title: string;
  description?: string;
  createdAt: Date | string;
  deadline: Date | string;
  status: Status;
  priority: Priority;
};

export type FilterOptions = {
  status?: Status;
  priority?: Priority;
  createdAfter?: string | Date;
  createdBefore?: string | Date;
};