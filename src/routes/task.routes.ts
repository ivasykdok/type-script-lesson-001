import { Router } from "express";
import {
    createTask,
    deleteTask,
    findTaskById,
    getAllTasks,
    updateTask,
} from "../controllers/task.controller.js";
import { taskBodySchema, querySchema } from "../types/task.types.js";
import {validateBody, validateQuery} from "../middleware/validate.middleware";

const router = Router();

router.get("/", validateQuery(querySchema), getAllTasks);

router.get("/:id", findTaskById);

router.post("/", validateBody(taskBodySchema), createTask);

router.put("/:id", validateBody(taskBodySchema), updateTask);

router.delete("/:id", deleteTask);

export default router;