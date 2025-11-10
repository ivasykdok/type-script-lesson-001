import { z } from "zod";

export const statuses = ["todo", "in_progress", "done"] as const;
export const priorities = ["low", "medium", "high"] as const;

export const StatusSchema = z.enum(statuses);
export const PrioritySchema = z.enum(priorities);

export const DEFAULT_STATUS = "todo";
export const DEFAULT_PRIORITY = "low";

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title не може бути порожнім"),
  description: z.string().optional(),
  createdAt: z.union([z.string(), z.date()]),
  deadline: z.union([z.string(), z.date()]),
  status: StatusSchema.default(DEFAULT_STATUS),
  priority: PrioritySchema.default(DEFAULT_PRIORITY),
});
