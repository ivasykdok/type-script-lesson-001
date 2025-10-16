import { FilterOptions, Task, TaskNew } from "../types/Types";
import { z } from "zod";
import { TaskSchema } from "../constants/constants";
import tasks from "../../tasks.json";

const TaskArraySchema = z.array(TaskSchema);

export class TaskService {
  constructor(private tasks: TaskNew[] = []) {
    const parsedTasks = TaskArraySchema.safeParse(tasks);
    if (parsedTasks.success) {
      this.tasks = parsedTasks.data;
    } else {
      console.error("Дані tasks.json невалідні:", parsedTasks.error.issues);
    }
  }

  private ensureTasksValid(): TaskNew[] | null {
    const parsed = TaskArraySchema.safeParse(this.tasks);
    if (!parsed.success) {
      console.error(
        "Дані всередині TaskService невалідні:",
        parsed.error.issues,
      );
      return null;
    }
    return parsed.data;
  }

  createTask = (taskData: Omit<TaskNew, "id">): TaskNew | null => {
    const validTasks = this.ensureTasksValid();
    if (!validTasks) return null;

    const newId = Date.now().toString();

    const taskToParse: TaskNew = {
      id: newId,
      ...taskData,
    };

    const parsed = TaskSchema.safeParse(taskToParse);

    if (!parsed.success) {
      console.error(
        "Не вдалося створити таск, дані невалідні:",
        parsed.error.issues,
      );
      return null;
    }

    this.tasks.push(parsed.data);

    console.log(`Таск "${parsed.data.title}" створено з id=${parsed.data.id}`);
    return parsed.data;
  };

  findTaskById = (id: string = "1") => {
    if (!this.ensureTasksValid()) return null;

    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      console.warn(`Завдання з id="${id}" не знайдено.`);
      return null;
    }

    return task;
  };

  updateTask = (
    id: string,
    updates: Partial<Omit<TaskNew, "id">>,
  ): TaskNew | null => {
    if (!this.ensureTasksValid()) return null;

    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      console.warn(`Завдання з id="${id}" не знайдено.`);
      return null;
    }

    const existingTask = this.tasks[index];
    if (!existingTask) {
      console.error("Не вдалося знайти таск у масиві.");
      return null;
    }

    const updatedTask = {
      ...existingTask,
      ...updates,
      status: updates.status ?? existingTask.status,
      priority: updates.priority ?? existingTask.priority,
    };

    const parsed = TaskSchema.safeParse(updatedTask);
    if (!parsed.success) {
      console.error(
        "Не вдалося оновити таск, дані невалідні:",
        parsed.error.issues,
      );
      return null;
    }

    this.tasks[index] = parsed.data;

    console.log("Оновлено:", parsed.data);
    return parsed.data;
  };

  deleteTask = (id: string): boolean => {
    if (!this.ensureTasksValid()) return false;

    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      console.warn(`Завдання з id="${id}" не знайдено.`);
      return false;
    }

    this.tasks.splice(index, 1);
    console.log(`Завдання з id="${id}" успішно видалено.`);
    return true;
  };

  filterTasks = (filters: FilterOptions): TaskNew[] => {
    if (!this.ensureTasksValid()) return [];

    return this.tasks.filter((task) => {
      const createdAt = new Date(task.createdAt);

      const statusMatch = !filters.status || task.status === filters.status;
      const priorityMatch =
        !filters.priority || task.priority === filters.priority;

      const createdAfterMatch =
        !filters.createdAfter || createdAt >= new Date(filters.createdAfter);
      const createdBeforeMatch =
        !filters.createdBefore || createdAt <= new Date(filters.createdBefore);

      return (
        statusMatch && priorityMatch && createdAfterMatch && createdBeforeMatch
      );
    });
  };

  isTaskCompletedBeforeDeadline = (id: string): boolean | null => {
    if (!this.ensureTasksValid()) return null;

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










