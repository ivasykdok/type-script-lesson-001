import { Task } from "../types/task.types.js";
import crypto from "crypto";

const taskService: Task[] = [
  {
    id: "1",
    title: "New Task",
    description: "empty",
  },
];

export const fetchAllTasks = () => {
  console.log("taskService");
  return taskService;
};

export const fetchTaskById = (id: string) => {
  const task = taskService.find((task) => task.id === id);

  if (task) return task;
  return null;
};

export const addTask = (task: Task) => {
  const id = crypto.randomUUID();
  const newTask = { id, ...task };
  taskService.push(newTask);
  return newTask;
};

export const updateTaskData = (id: string, taskData: Partial<Task>) => {
  const index = taskService.findIndex((task) => task.id === id);

  if (index === -1) {
    console.warn(`Task with id "${id}" not found`);
    return null;
  }

  taskService[index] = { ...taskService[index], ...taskData };

  return taskService[index];
};

export const deleteTaskData = (id: string) => {
  const index = taskService.findIndex((task) => task.id === id);

  if (index === -1) {
    console.warn(`Task with id "${id}" not found`);
    return null;
  }

  const [deletedTask] = taskService.splice(index, 1);

  return deletedTask;
};
