import tasks from "../tasks.json";
import { z } from "zod";
import { DEFAULT_PRIORITY, DEFAULT_STATUS } from "./constants/constants";
import { FilterOptions } from "./types/Types";

const TaskSchema = z.object({
  id: z.union([z.string(), z.number()]),
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

const findTaskById = (id: string | number = 1) => {
  if (!parsedTasks.success) {
    console.error("Неможливо отримати таск — дані невалідні.");
    return null;
  }

  const task = parsedTasks.data.find((t) => String(t.id) === String(id));

  if (!task) {
    console.warn(`Завдання з id="${id}" не знайдено.`);
    return null;
  }

  return task;
};

const createTask = (
  taskData: Partial<Omit<TaskNew, "id">> & { id?: string | number },
): TaskNew | null => {
  const newId = taskData.id ?? Date.now();

  const existingTask = findTaskById(newId);

  if (existingTask) {
    console.warn(`⚠️ Завдання з id="${newId}" вже існує.`);
    return null;
  }

  const taskToParse: TaskNew = {
    id: newId,
    title: taskData.title ?? "Нова задача",
    description: taskData.description,
    createdAt: taskData.createdAt ?? new Date().toISOString(),
    deadline: taskData.deadline ?? new Date().toISOString(),
    status: taskData.status ?? DEFAULT_STATUS,
    priority: taskData.priority ?? DEFAULT_PRIORITY,
  };

  return TaskSchema.parse(taskToParse);
};

const updateTask = (
  id: string | number,
  updates: Partial<Omit<TaskNew, "id">>,
): TaskNew | null => {
  if (!parsedTasks.success) {
    console.error("Дані невалідні, не можна оновлювати таск.");
    return null;
  }

  const index = parsedTasks.data.findIndex((t) => String(t.id) === String(id));
  if (index === -1) {
    console.warn(`Завдання з id="${id}" не знайдено.`);
    return null;
  }

  const existingTask = parsedTasks.data[index];
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

  parsedTasks.data[index] = parsed.data;

  console.log(parsed.data);
  return parsed.data;
};
/*updateTask(2, {
  description: "new task"
})*/

const deleteTask = (id: string | number): boolean => {
  if (!parsedTasks.success) {
    console.error("Дані невалідні, не можна видаляти таск.");
    return false;
  }

  const index = parsedTasks.data.findIndex((t) => String(t.id) === String(id));
  if (index === -1) {
    console.warn(`Завдання з id="${id}" не знайдено.`);
    return false;
  }

  parsedTasks.data.splice(index, 1);
  console.log(`Завдання з id="${id}" успішно видалено.`);
  return true;
};
/*deleteTask(1)*/

const filterTasks = (filters: FilterOptions): TaskNew[] => {
  if (!parsedTasks.success) {
    console.error("Дані невалідні, не можна фільтрувати.");
    return [];
  }

  return parsedTasks.data.filter((task) => {
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

const isTaskCompletedBeforeDeadline = (id: string | number): boolean | null => {
  if (!parsedTasks.success) {
    console.error("Дані невалідні.");
    return null;
  }

  const task = parsedTasks.data.find((t) => String(t.id) === String(id));
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
