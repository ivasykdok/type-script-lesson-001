import { NextFunction, Request, Response, Router } from "express";

import { createTask, deleteTask, findTaskById, getTasks, updateTask } from "../controller/task.controller";
const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Tasks route middleware: ${req.method} ${req.url}`);
  next();
});

router.get("/", getTasks);

router.get("/:id", findTaskById);

router.post("/", createTask);

router.delete("/:id", deleteTask);

router.put("/:id", updateTask);

export default router;
