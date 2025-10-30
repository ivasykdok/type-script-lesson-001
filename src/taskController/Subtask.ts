import { BaseTask } from "./BaseTask";

export class Subtask extends BaseTask {
  parentId: string;

  constructor(
    parentId: string,
    ...args: ConstructorParameters<typeof BaseTask>
  ) {
    super(...args);
    this.parentId = parentId;
  }

  getTaskInfo() {
    return `Subtask of ${this.parentId}: ${this.title}, Status: ${this.status}`;
  }
}