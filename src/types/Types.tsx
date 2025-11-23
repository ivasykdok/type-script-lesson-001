import { z } from "zod";
import { type Status } from "../api/createTasksApi.tsx";

export const statuses = ["todo", "in progress", "done"] as const;

export type Task = {
  id: string;
  title: string;
  description: string | null;
  taskStatus: Status;
  createdAt: Date;
  deadline?: Date;
};

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(20, "Title must be less than 20 characters"),
  description: z.string().optional(),
  taskStatus: z.enum(statuses),
  createdAt: z.coerce.date(),
  deadline: z
    .coerce.date()
    .optional()
    .refine((date) => {
      if (!date) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, "Deadline cannot be in the past")
});

export type CreateTaskData = z.infer<typeof taskSchema>;