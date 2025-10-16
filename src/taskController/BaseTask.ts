export class BaseTask {
  constructor(
    public id: string,
    public title: string,
    public status: string,
    public priority: string
  ) {}

  getTaskInfo() {
    return `Task: ${this.title}, Status: ${this.status}, Priority: ${this.priority}`;
  }
}