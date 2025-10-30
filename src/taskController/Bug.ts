import { BaseTask } from "./BaseTask";
import { Task } from "../constants/Types";

export class Bug extends BaseTask {
  severity: string;

  constructor(...args: [Partial<Task> & { id: string; title: string }, string]) {
    super(args[0]);
    this.severity = args[1];
  }

  getTaskInfo() {
    return `Bug: ${this.title}, Severity: ${this.severity}`;
  }
}