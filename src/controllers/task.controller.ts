import { NextFunction, Request, Response } from "express";
import {
  addTask,
  deleteAllTasksData,
  deleteTaskData,
  fetchAllTasks,
  fetchTaskById,
  updateTaskData,
} from "../services/task.service.js";
import { Task } from "../types/task.types.js";

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tasks = await fetchAllTasks();

    res.status(200).json(tasks);
  } catch (e) {
    next(e);
  }
};

export const findTaskById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const task = await fetchTaskById(Number(id));

    if (!task) {
      return res.status(404).json({ error: `Task with id: ${id} not found` });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createTask = async (
  req: Request<{}, {}, Partial<Task>>,
  res: Response,
) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTask = await addTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTask = async (
  req: Request<{ id: string }, {}, Partial<Task>>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const updatedTask = await updateTaskData(Number(id), req.body);

    if (!updatedTask) {
      return res.status(404).json({ error: `Task with id: ${id} not found` });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const result = await deleteTaskData(Number(id));

    if (!result) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({
      message: "Task successfully deleted",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAllTasks = async (req: Request, res: Response) => {
  try {
    const deletedCount = await deleteAllTasksData();
    return res.status(200).json({
      message: `Deleted ${deletedCount} task(s) successfully`,
      deletedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
