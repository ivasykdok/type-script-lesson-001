import { z } from "zod";

export const statuses = ["todo", "in-progress", "done"] as const;
export type Status = (typeof statuses)[number];

export const priorities = ["low", "medium", "high"] as const;
export type Priority = (typeof priorities)[number];

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(0).optional(),
  status: z.enum(statuses),
  priority: z.enum(priorities),
  createdAt: z.string(),
  updatedAt: z.string(),
  deadline: z
    .string()
    .optional()
    .refine(
      (dateStr) => {
        if (!dateStr) return true;
        const date = new Date(dateStr);
        const now = new Date();
        return date.getTime() >= now.getTime();
      },
      { message: "Deadline cannot be in the past" },
    ),
  userId: z.string(),
});
export type TaskCreate = z.infer<typeof taskSchema>;

export type CreateTaskPayload = {
  title: string;
  description?: string | undefined;
  userId: string;
  priority: Priority;
  status: Status;
  deadline?: string | undefined;
  createdAt: string;
  updatedAt: string;
};

export const taskCreateSchema = taskSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    status: true,
    priority: true,
    userId: true,
  })
  .partial({ deadline: true });
export type TaskCreateData = z.infer<typeof taskCreateSchema>;
