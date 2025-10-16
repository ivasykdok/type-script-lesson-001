import { BaseTask } from "./BaseTask";

export class Bug extends BaseTask {
  severity: string;
  constructor(id: string, title: string, status: string, priority: string, severity: string) {
    super(id, title, status, priority);
    this.severity = severity;
  }
  getTaskInfo() {
    return `Bug: ${this.title}, Severity: ${this.severity}`;
  }
}