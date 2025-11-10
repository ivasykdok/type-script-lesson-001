import { FilterOptions, Task } from "../constants/Types";
import { z } from "zod";
import { TaskSchema } from "../constants/constants";
import tasks from "../../tasks.json";

const TaskArraySchema = z.array(TaskSchema);

export class TaskService {
  private tasks: Task[];

  constructor(initialTasks: Task[] = tasks as Task[]) {
    const parsed = TaskArraySchema.safeParse(initialTasks);
    if (!parsed.success) {
      this.tasks = [];
      console.error("Дані tasks.json невалідні:", parsed.error.issues);
    } else {
      this.tasks = parsed.data;
      console.log(`Ініціалізовано ${this.tasks.length} тасків`);
    }
  }

  createTask(taskData: Omit<Task, "id">): Task | null {
    const newTask: Task = { id: Date.now().toString(), ...taskData };

    const parsed = TaskSchema.safeParse(newTask);
    if (!parsed.success) {
      console.error("Не вдалося створити таск:", parsed.error.issues);
      return null;
    }

    this.tasks.push(parsed.data);
    console.log(`Таск "${parsed.data.title}" створено`);
    return parsed.data;
  }

  findTaskById(id: string): Task | null {
    return this.tasks.find((t) => t.id === id) ?? null;
  }

  updateTask(id: string, updates: Partial<Omit<Task, "id">>): Task | null {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const updatedTask = { ...this.tasks[index], ...updates };
    const parsed = TaskSchema.safeParse(updatedTask);
    if (!parsed.success) {
      console.error("Не вдалося оновити таск:", parsed.error.issues);
      return null;
    }

    this.tasks[index] = parsed.data;
    console.log(`Таск "${parsed.data.title}" оновлено`);
    return parsed.data;
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    console.log(`Таск з id="${id}" видалено`);
    return true;
  }

  filterTasks(filters: FilterOptions): Task[] {
    return this.tasks.filter((task) => {
      const createdAt = new Date(task.createdAt);
      return (
        (!filters.status || task.status === filters.status) &&
        (!filters.priority || task.priority === filters.priority) &&
        (!filters.createdAfter ||
          createdAt >= new Date(filters.createdAfter)) &&
        (!filters.createdBefore || createdAt <= new Date(filters.createdBefore))
      );
    });
  }

  isTaskCompletedBeforeDeadline = (id: string): boolean | null => {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      console.warn(`Завдання з id="${id}" не знайдено.`);
      return null;
    }

    if (task.status !== "done") {
      console.log(`Завдання "${task.title}" ще не завершене.`);
      return false;
    }

    const createdAt = new Date(task.createdAt);
    const deadline = new Date(task.deadline);

    const completedBeforeDeadline = createdAt <= deadline;
    console.log(
      completedBeforeDeadline
        ? `Завдання "${task.title}" завершене вчасно.`
        : `Завдання "${task.title}" завершене із запізненням.`,
    );

    return completedBeforeDeadline;
  };
}
