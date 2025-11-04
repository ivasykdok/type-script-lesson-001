import { Task } from "../types/tasks.js";
import crypto from "crypto";

const tasks: Task[] = [
  {
    id: "1",
    title: "New Task",
    description: "empty",
  },
];

export const fetchAllTasks = () => {
  console.log("tasks");
  return tasks;
};

export const fetchTaskById = (id: string) => {
  const task = tasks.find((task) => task.id === id);

  if (task) return task;
  return null;
};

export const addTask = (task: Task) => {
  const id = crypto.randomUUID();
  const newTask = { id, ...task };
  tasks.push(newTask);
  return newTask;
};

export const updateTaskData = (id: string, taskData: Partial<Task>) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    console.warn(`Task with id "${id}" not found`);
    return null;
  }

  tasks[index] = { ...tasks[index], ...taskData };

  return tasks[index];
};

export const deleteTaskData = (id: string) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    console.warn(`Task with id "${id}" not found`);
    return null;
  }

  const [deletedTask] = tasks.splice(index, 1);

  return deletedTask;
};
