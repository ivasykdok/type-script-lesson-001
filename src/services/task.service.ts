import { Task } from "../models/task.model.js";

export const fetchAllTasks = async () => {
  const tasks = await Task.findAll();
  return tasks;
};

export const fetchTaskById = async (id: number) => {
  const task = await Task.findOne({ where: { id }, raw: true });

  if (!task) return null;

  return task;
};

export const addTask = async (data: Partial<Task>) => {
  const newTask = await Task.create(data);
  return newTask;
};

export const updateTaskData = async (id: number, taskData: Partial<Task>) => {
  const [affectedRows] = await Task.update(taskData, { where: { id } });

  if (affectedRows === 0) return null;

  const updatedTask = await Task.findOne({ where: { id } });
  return updatedTask;
};

export const deleteTaskData = async (id: number) => {
  const deletedRows = await Task.destroy({ where: { id } });

  if (deletedRows === 0) {
    return null;
  }

  return true;
};

export const deleteAllTasksData = async () => {
  const results = await Task.destroy({ where: {} });
  return results;
};
