import { z } from "zod";

export const statuses = ["todo", "in progress", "done"] as const;

export interface TaskData {
  title: string;
  description?: string;
  status?: "todo" | "in-progress" | "done";
  priority?: "low" | "medium" | "high";
  deadline?: string;
}


export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  status: z.enum(statuses).default("todo"),
  createdAt: z.string().optional(),
  deadline: z.string().nullable().optional(),
});

export type CreateTaskData = z.infer<typeof taskSchema>;

export type CreateTaskPayload = Omit<CreateTaskData, "createdAt"> & { createdAt: string };
