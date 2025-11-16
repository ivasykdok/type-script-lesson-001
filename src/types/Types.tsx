import { z } from "zod";
import { type Status } from "../api/createTasksApi.tsx";

export const statuses = ["todo", "in progress", "done"] as const;

export type Task = {
  id: string;
  title: string;
  description: string | null;
  taskStatus: Status;
  createdAt: string;
  deadline: string | null;
};

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(20, "Title must be less than 100 characters"),
  description: z.string().optional(),
  taskStatus: z.enum(statuses),
  createdAt: z.string().optional(),
  deadline: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true;

      const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
      const match = regex.exec(value);
      if (!match) return false;

      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      const day = parseInt(match[3], 10);

      const date = new Date(year, month - 1, day);

      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        return false;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date >= today;
    }, "Deadline must be a valid date and cannot be in the past"),
});

export type CreateTaskData = z.infer<typeof taskSchema>;
