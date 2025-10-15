import tasks from "../tasks.json";
import { z } from "zod";
import { DEFAULT_PRIORITY, DEFAULT_STATUS } from "./constants/constants";
import { FilterOptions } from "./types/Types";

const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.union([z.string(), z.date()]),
  deadline: z.union([z.string(), z.date()]),
  status: z.enum(["todo", "in_progress", "done"]).default(DEFAULT_STATUS),
  priority: z.enum(["low", "medium", "high"]).default(DEFAULT_PRIORITY),
});

type TaskNew = z.infer<typeof TaskSchema>;

const TaskArraySchema = z.array(TaskSchema);

const parsedTasks = TaskArraySchema.safeParse(tasks);

const ensureTasksValid = (): TaskNew[] | null => {
  if (!parsedTasks.success) {
    console.error("Дані невалідні.");
    return null;
  }
  return parsedTasks.data;
};

const findTaskById = (id: string = '1') => {
  const tasks = ensureTasksValid();
  if (!tasks) return null;

  const task = tasks.find((t) => t.id === String(id));

  if (!task) {
    console.warn(`Завдання з id="${id}" не знайдено.`);
    return null;
  }

  return task;
};

const createTask = (taskData: Omit<TaskNew, "id">): TaskNew | null => {
  const tasks = ensureTasksValid();
  if (!tasks) return null;

  const newId = Date.now().toString();

  const taskToParse: TaskNew = {
    id: newId,
    ...taskData,
  };

  const parsed = TaskSchema.safeParse(taskToParse);

  if (!parsed.success) {
    console.error("Не вдалося створити таск, дані невалідні:", parsed.error.issues);
    return null;
  }

  tasks.push(parsed.data);

  console.log(`Таск "${parsed.data.title}" створено з id=${parsed.data.id}`);
  return parsed.data;
};
createTask({
  title: "Модифікувати функцію створити",
  description: "Ознайомитися з базовими можливостями бібліотеки Zod",
  createdAt: new Date().toISOString(),
  deadline: "2025-11-01",
  status: "todo",
  priority: "medium",
});

const updateTask = (
  id: string,
  updates: Partial<Omit<TaskNew, "id">>,
): TaskNew | null => {
  const tasks = ensureTasksValid();
  if (!tasks) return null;

  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    console.warn(`Завдання з id="${id}" не знайдено.`);
    return null;
  }

  const existingTask = tasks[index];
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

  tasks[index] = parsed.data;

  console.log("Оновлено:", parsed.data);
  return parsed.data;
};
/*updateTask('2', {
  description: "new task"
})*/

const deleteTask = (id: string): boolean => {
  const tasks = ensureTasksValid();
  if (!tasks) return false;

  const index = tasks.findIndex((t) => t.id === String(id));
  if (index === -1) {
    console.warn(`Завдання з id="${id}" не знайдено.`);
    return false;
  }

  tasks.splice(index, 1);
  console.log(`Завдання з id="${id}" успішно видалено.`);
  return true;
};
/*deleteTask("1")*/

const filterTasks = (filters: FilterOptions): TaskNew[] => {
  const tasks = ensureTasksValid();
  if (!tasks) return [];

  return tasks.filter((task) => {
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

/*const filtered = filterTasks({
  status: "todo",
  priority: "low",
  createdAfter: "2025-01-01",
});*/

const isTaskCompletedBeforeDeadline = (id: string): boolean | null => {
  const tasks = ensureTasksValid();
  if (!tasks) return false;

  const task = tasks.find((t) => String(t.id) === String(id));
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
/*isTaskCompletedBeforeDeadline(8);*/
