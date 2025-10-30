import { BaseTask } from "./BaseTask";

export class Story extends BaseTask {
  points: number;
  constructor(points: number, ...args: ConstructorParameters<typeof BaseTask>) {
    super(...args);
    this.points = points;
  }

  getTaskInfo() {
    return `Story: ${this.title}, Points: ${this.points}`;
  }
}
