import { TaskService } from "./TaskService";
import { FilterOptions, Task } from "../constants/Types";

export class TaskController {
  constructor(private taskService: TaskService) {
    this.taskService = taskService;
  }

  createTask(data: Omit<Task, "id">): Task | null {
    return this.taskService.createTask(data);
  }

  getTaskById(id: string): Task | null {
    return this.taskService.findTaskById(id);
  }

  deleteTask(id: string): boolean {
    return this.taskService.deleteTask(id);
  }

  filterTasks(filters: FilterOptions): Task[] {
    return this.taskService.filterTasks(filters);
  }

  isTaskCompletedBeforeDeadline(id: string): boolean | null {
    return this.taskService.isTaskCompletedBeforeDeadline(id);
  }

  getTaskInfo(id: string): string | null {
    const task = this.taskService.findTaskById(id);
    if (!task) return null;
    return `Task ${task.title}, Status: ${task.status}, Priority: ${task.priority}`;
  }
}