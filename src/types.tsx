import { z } from "zod";

export const statuses = ["todo", "in progress", "done"] as const;
export const priorities = ["low", "medium", "high"] as const;
export type Priority = (typeof priorities)[number];
export type Status = (typeof statuses)[number];

export type Task = {
  id: string;
  title: string;
  description: string | null;
  taskStatus: Status;
  priority: Priority;
  createdAt: string;
  deadline: string | null;
};

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  status: z.enum(statuses),
  priority: z.enum(priorities),
  createdAt: z.string().optional(),
  deadline: z.string().nullable().optional(),
});

export type CreateTaskData = z.infer<typeof taskSchema>;

export type CreateTaskPayload = Omit<CreateTaskData, "createdAt"> & {
  createdAt: string;
};
