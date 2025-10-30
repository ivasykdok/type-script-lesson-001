import { BaseTask } from "./BaseTask";
import { Task } from "../constants/Types";

export class Epic extends BaseTask {
  tasks: BaseTask[];

  constructor(...args: [Partial<Task> & { id: string; title: string }, BaseTask[]?]) {
    super(args[0]);
    this.tasks = args[1] ?? [];
  }

  getTaskInfo() {
    return `Epic: ${this.title}, Tasks count: ${this.tasks.length}`;
  }
}
