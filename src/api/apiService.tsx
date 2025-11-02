import type { Task } from "../types.tsx";

export class ApiService {
  private apiUrl: string;

  constructor(apiUrl: string = "http://localhost:3000/tasks") {
    this.apiUrl = apiUrl;
  }

  async fetchAllTasks(): Promise<Task[]> {
    try {
      const response = await fetch(this.apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(new Error(`Fetch all task is error: ${error}`));
      return [];
    }
  }
}
export default ApiService;

/*import { type CreateTaskData } from "../CreateTaskForm/CreateTaskForm.tsx";

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
};*/
