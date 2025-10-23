import type { Task, TaskData } from "../types/Task.ts";

export class TaskService {
  private apiUrl: string;

  constructor(apiUrl: string = "http://localhost:5001/tasks") {
    this.apiUrl = apiUrl;
  }

  async getAllTasks(): Promise<Task[]> {
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
      console.log(
        "%c getAllTask ",
        "color: white; background-color: #007acc; border-radius: 4px; font-weight: bold;",
        error,
      );

      return [];
    }
  }

  async createTask(taskData: TaskData): Promise<Task | null> {
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

      const newTask: Task = await response.json();
      console.log("Task created:", newTask);

      return newTask;
    } catch (error) {
      console.error("Error creating task:", error);
      return null;
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
      console.log(
        "%c findTaskById: ",
        "color: white; background-color: #007acc; border-radius: 4px; font-weight: bold;",
        error,
      );
      return null;
    }
  }

  async updateTask(id: string, taskData: TaskData): Promise<Task | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update task with id ${id} (status: ${response.status})`,
        );
      }

      const updatedTask: Task = await response.json();

      return updatedTask;
    } catch (error) {
      console.error(
        "%c Error updating task",
        "color: white; background-color: #d9534f; border-radius: 4px; font-weight: bold;",
        error,
      );
      return null;
    }
  }

  async patchTask(
    id: string,
    updates: Partial<TaskData>,
  ): Promise<Task | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to patch task with id ${id} (status: ${response.status})`,
        );
      }

      const updatedTask: Task = await response.json();

      console.log(
        "%c PATCH /tasks/:id success",
        "color: white; background-color: #17a2b8; border-radius: 4px; font-weight: bold;",
        updatedTask,
      );

      return updatedTask;
    } catch (error) {
      console.error(
        "%c Error patching task",
        "color: white; background-color: #d9534f; border-radius: 4px; font-weight: bold;",
        error,
      );
      return null;
    }
  }

  async deleteTask(id: string): Promise<boolean> {
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

      console.log(
        "%c DELETE /tasks/:id success",
        "color: white; background-color: #dc3545; border-radius: 4px; font-weight: bold;",
        id,
      );

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
