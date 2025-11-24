import { Request, Response, NextFunction } from "express";
import {
    addTask,
    deleteTaskData,
    fetchAllTasks,
    fetchTaskById,
    updateTaskData,
} from "../services/task.service.js";
import { Task, TaskBody } from "../types/task.types.js";
import AppError from "../error.js";

export const getAllTasks = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status, priority, createdAt } = req.query as {
            status?: Task["status"];
            priority?: Task["priority"];
            createdAt?: string;
        };

        let tasks: Task[] = fetchAllTasks();

        if (status) tasks = tasks.filter((task) => task.status === status);
        if (priority) tasks = tasks.filter((task) => task.priority === priority);
        if (createdAt) {
            const filterDate = new Date(createdAt);
            filterDate.setHours(0, 0, 0, 0);

            tasks = tasks.filter((task) => {
                const taskDate = new Date(task.createdAt);
                taskDate.setHours(0, 0, 0, 0);
                return taskDate.getTime() === filterDate.getTime();
            });
        }

        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

export const findTaskById = (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const task = fetchTaskById(req.params.id);

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
};

export const createTask = (req: Request<{}, {}, TaskBody>, res: Response, next: NextFunction) => {
    try {
        if (!req.body.title) {
            throw new AppError("Title is required", 400);
        }

        const newTask = addTask(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
};

export const updateTask = (req: Request<{ id: string }, {}, Partial<TaskBody>>, res: Response, next: NextFunction) => {
    try {
        if (req.body.title !== undefined && req.body.title.trim() === "") {
            throw new AppError("Title must be a non-empty string", 400);
        }

        const updatedTask = updateTaskData(req.params.id, req.body);

        if (!updatedTask) {
            throw new AppError("Task not found", 404);
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        next(err);
    }
};

export const deleteTask = (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const deletedTask = deleteTaskData(req.params.id);

        if (!deletedTask) {
            throw new AppError("Task not found", 404);
        }

        res.status(200).json({
            message: "Task successfully deleted",
            deletedTask,
        });
    } catch (err) {
        next(err);
    }
};