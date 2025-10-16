import { priorities, statuses, TaskSchema } from "../constants/constants";
import { z } from "zod";

export type Status = (typeof statuses)[number];
export type Priority = (typeof priorities)[number];

export type Task = {
  id: string;
  title: string;
  description?: string;
  createdAt: Date | string;
  deadline: Date | string;
  status: Status;
  priority: Priority;
};

export type TaskNew = z.infer<typeof TaskSchema>;

export type FilterOptions = {
  status?: Status;
  priority?: Priority;
  createdAfter?: string | Date;
  createdBefore?: string | Date;
};
