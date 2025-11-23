export const statuses = ["todo", "in-progress", "done"] as const;
export type Status = (typeof statuses)[number];

export const priorities = ["low", "medium", "high"] as const;
export type Priority = (typeof priorities)[number];

export type Task = {
  id: string;
  title?: string;
  description?: string;
  createdAt: string;
  status: Status;
  priority: Priority;
};
