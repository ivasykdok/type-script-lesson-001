import { BaseTask } from "./BaseTask";
import { priorities } from "../constants/constants";

export class Bug extends BaseTask {
  severity: string;

  constructor(
    severity: (typeof priorities)[number],
    ...args: ConstructorParameters<typeof BaseTask>
  ) {
    super(...args);
    this.severity = severity;
  }

  getTaskInfo() {
    return `Bug: ${this.title}, Severity: ${this.severity}`;
  }
}
