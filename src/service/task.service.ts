import { Task } from "../models/task.model";
import { User } from "../models/user.model";

export const addTask = async (data: Partial<Task>) => {
  return await Task.create(data);
};

export const getAllTasks = async () => {
  return await Task.findAll({});
};

export const fetchTaskById = async (id: number) => {
  return await Task.findOne({
    where: { id },
  });
};

export const deleteTaskData = async (id: number) => {
  const deletedRows = await Task.destroy({ where: { id } });

  if (deletedRows === 0) {
    return null;
  }

  return true;
};

export const updateTaskData = async (id: number, taskData: Partial<Task>) => {
  const task = await Task.findByPk(id);

  if (!task) {
    throw new Error("User not found");
  }

  await task.update(taskData, { where: { id } });
  return task;
};
