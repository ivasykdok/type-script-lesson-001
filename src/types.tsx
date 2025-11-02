import { z } from "zod";

export interface TaskData {
  title: string;
  description?: string;
  status?: "todo" | "in-progress" | "done";
  priority?: "low" | "medium" | "high";
  deadline?: string;
}

export interface Task extends TaskData {
  id: string;
}

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  taskStatus: z.enum(statuses).default("todo"),
  createdAt: z.string().optional(),
  deadline: z.string().nullable().optional(),
});
