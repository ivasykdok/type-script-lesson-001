import { TaskSchema, statuses, priorities } from "./constants";
import { z } from "zod";

export type Status = (typeof statuses)[number];
export type Priority = (typeof priorities)[number];
export type Task = z.infer<typeof TaskSchema>;

export type FilterOptions = {
  status?: Status;
  priority?: Priority;
  createdAfter?: string | Date;
  createdBefore?: string | Date;
};
