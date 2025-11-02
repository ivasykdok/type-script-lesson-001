import type { CreateTaskPayload, Task } from "../types.tsx";

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

  async findTaskById(id: string): Promise<Task | null> {
    try {

    } catch(error) {
      return null
    }
  }

  async createTask(taskData: CreateTaskPayload): Promise<Task | null> {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(new Error(`Created task is error: ${error}`));
      return null;
    }
  }
}
