import type { CreateTaskData } from "../CreateTaskForm/CreateTaskForm.tsx";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  createdAt: string | undefined;
};

export const fetchAllTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:3000/tasks");

  if (!response.ok) {
    throw new Error("Error fetch tasks ");
  }

  return response.json();
};

export const createTask = async (data: CreateTaskData) => {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error create tasks ");
  }

  return response.json();
};
