import { NextFunction, Request, Response } from "express";
import {
  addTask,
  deleteTaskData,
  fetchAllTasks,
  fetchTaskById,
  updateTaskData,
} from "../services/task.service.js";
import { Task } from "../types/task.types.js";
import AppError from "../error";

export const getAllTasks = (req: Request, res: Response) => {
  const tasks = fetchAllTasks();
  res.status(200).json(tasks);
};

export const findTaskById = (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const task = fetchTaskById(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createTask = (
  req: Request<{}, {}, Task>,
  res: Response,
  next: NextFunction,
) => {
  const title = req.body.title;

  try {
    if (!title) {
      throw new AppError("Title is require", 400);
    } else {
      const newTask = addTask(req.body);
      res.status(201).json(newTask);
    }
  } catch (error) {
    next(error);
  }
};

export const updateTask = (
  req: Request<{ id: string }, {}, Task>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ error: "Title is required and must be a string" });
    }

    const updatedTask = updateTaskData(id, req.body);

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask = (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTask = deleteTaskData(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({
      message: "Task successfully deleted",
      deletedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
