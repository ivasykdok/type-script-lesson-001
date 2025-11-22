import type { CreateTaskPayload, Task } from "../types.tsx";

class ApiService {
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
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Task with id ${id} not found (status: ${response.status})`,
        );
      }

      const task: Task = await response.json();

      return task;
    } catch (error) {
      console.error(new Error(`Find task is error: ${error}`));
      return null;
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

  async removeTaskById(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete task with id ${id} (status: ${response.status})`,
        );
      }

      return true;
    } catch (error) {
      console.error(
        "%c Error deleting task",
        "color: white; background-color: #d9534f; border-radius: 4px; font-weight: bold;",
        error,
      );
      return false;
    }
  }
}

export default new ApiService;
