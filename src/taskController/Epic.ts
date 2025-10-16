import { BaseTask } from "./BaseTask";

export class Epic extends BaseTask {
  tasks: BaseTask[];
  constructor(id: string, title: string, status: string, priority: string, tasks: BaseTask[] = []) {
    super(id, title, status, priority);
    this.tasks = tasks;
  }
  getTaskInfo() {
    return `Epic: ${this.title}, Tasks count: ${this.tasks.length}`;
  }
}