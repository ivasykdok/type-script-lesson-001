import { BaseTask } from "./BaseTask";

export class Epic extends BaseTask {
  tasks: BaseTask[];

  constructor({
    tasks = [],
    ...taskData
  }: { tasks?: BaseTask[] } & ConstructorParameters<typeof BaseTask>[0]) {
    super(taskData);
    this.tasks = tasks;
  }

  getTaskInfo() {
    return `Epic: ${this.title}, Tasks count: ${this.tasks.length}`;
  }

  addTask(task: BaseTask) {
    this.tasks.push(task);
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
