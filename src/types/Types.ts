import { priorities, statuses } from "../constants/constants";

export type Status = typeof statuses[number];
export type Priority = typeof priorities[number];

export type Task = {
  id: string;
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