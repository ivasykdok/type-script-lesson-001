export const statuses = ["todo", "in progress", "done"] as const;

export type Status = (typeof statuses)[number];

export type Task = {
  id: string;
  title: string;
  description: string | null;
  taskStatus: Status;
  createdAt: string;
  deadline: string | null;
};
