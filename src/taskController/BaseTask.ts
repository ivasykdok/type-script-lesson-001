import { Priority, Status, Task } from "../constants/Types"; // тип, згенерований через z.infer<typeof TaskSchema>
import { DEFAULT_STATUS, DEFAULT_PRIORITY } from "../constants/constants";

export class BaseTask implements Task {
  id: string;
  title: string;
  description?: string | undefined;
  createdAt: string | Date;
  deadline: string | Date;
  status: Status;
  priority: Priority;

  constructor(task: Partial<Task> & { id: string; title: string }) {
    this.id = task.id;
    this.title = task.title;
    this.status = task.status ?? DEFAULT_STATUS;
    this.priority = task.priority ?? DEFAULT_PRIORITY;
    this.description = task.description;
    this.createdAt = task.createdAt ?? new Date();
    this.deadline = task.deadline ?? new Date();
  }

  getTaskInfo() {
    return `Task: ${this.title}, Status: ${this.status}, Priority: ${this.priority}`;
  }
}
