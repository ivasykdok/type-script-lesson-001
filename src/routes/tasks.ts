import { Router } from "express";
import {
  createTask, deleteTask,
  findTaskById,
  getAllTasks,
  updateTask
} from "../controllers/tasks.js";
const router = Router();

router.get("/", getAllTasks);

router.get("/:id", findTaskById);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
