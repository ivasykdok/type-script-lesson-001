import { NextFunction, Request, Response } from "express";
import {
  addTask,
  deleteTaskData,
  fetchTaskById,
  getAllTasks,
  updateTaskData,
} from "../service/task.service";
import { Task } from "../models/task.model";

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("getTasks error:", error);
    next(error);
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newTask = await addTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Create new task is error:", error);
    res.status(500).json({ message: "Internal server error" });
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
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task successfully deleted",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (
  req: Request<{ id: string }, "", Partial<Task>>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const updatedTask = await updateTaskData(Number(id), req.body);

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
