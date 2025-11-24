import { z } from "zod";

export const statuses = ["todo", "in-progress", "done"] as const;
export type Status = (typeof statuses)[number];

export const priorities = ["low", "medium", "high"] as const;
export type Priority = (typeof priorities)[number];

export const querySchema = z.object({
  status: z.enum(statuses).optional(),
  priority: z.enum(priorities).optional(),
  createdAt: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), "Invalid date format"),
});

export type Task = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  status: Status;
  priority: Priority;
};

export const taskBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(statuses),
  priority: z.enum(priorities),
});

export type TaskBody = z.infer<typeof taskBodySchema>;

