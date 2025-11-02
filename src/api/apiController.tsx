/*
import type { Task, TaskData } from "../types/Task.ts";
import { TaskService } from "../TaskService/TaskService.ts";

export class TaskController {
  private service: TaskService;

  constructor() {
    this.service = new TaskService();
  }

  async getAllTasks(): Promise<Task[]> {
    return this.service.getAllTasks();
  }

  async createTask(taskData: TaskData): Promise<Task | null> {
    if (taskData.deadline) {
      const deadlineDate = new Date(taskData.deadline);
      taskData.deadline = deadlineDate.toISOString(); // зберігаємо у форматі ISO
      console.log("📅 Formatted deadline:", deadlineDate.toLocaleString());
    }
    return this.service.createTask(taskData);
  }

  async findTaskById(id: string): Promise<Task | null> {
    return this.service.findTaskById(id);
  }

  async updateTask(id: string, taskData: TaskData): Promise<Task | null> {
    return this.service.updateTask(id, taskData);
  }

  async patchTask(id: string, updates: Partial<TaskData>): Promise<Task | null> {
    return this.service.patchTask(id, updates);
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.service.deleteTask(id);
  }
}
*/

import type { Task } from "../types.tsx";
import { ApiService } from "./apiService.tsx";

export class ApiController {
  private apiService = ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.apiService.fetchAllTasks();
  }
}
