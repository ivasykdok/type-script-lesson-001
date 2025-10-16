import { BaseTask } from "./BaseTask";

export class Subtask extends BaseTask {
  parentId: string;

  constructor(
    id: string,
    title: string,
    status: string,
    priority: string,
    parentId: string
  ) {
    super(id, title, status, priority);
    this.parentId = parentId;
  }

  getTaskInfo() {
    return `Subtask of ${this.parentId}: ${this.title}`;
  }
}