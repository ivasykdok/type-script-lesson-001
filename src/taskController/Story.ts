import { BaseTask } from "./BaseTask";

export class Story extends BaseTask {
  points: number;
  constructor(id: string, title: string, status: string, priority: string, points: number) {
    super(id, title, status, priority);
    this.points = points;
  }
  getTaskInfo() {
    return `Story: ${this.title}, Points: ${this.points}`;
  }
}