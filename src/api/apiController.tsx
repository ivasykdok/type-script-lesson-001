import type { CreateTaskPayload, Task } from "../types.tsx";
import { ApiService } from "./apiService.tsx";

export class ApiController {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.apiService.fetchAllTasks();
  }

  async createTask(data: CreateTaskPayload): Promise<Task | null> {
    return await this.apiService.createTask(data);
  }
}
