import { NextFunction, Request, Response, Router } from "express";

import AppError from "../error.js";
import { z } from "zod";
import {
  createUser,
  deleteUser,
  findUserById,
  getAllUsers,
  updateUser,
} from "../controllers/user.controller.js";
const router = Router();

const queryParamsSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
});

function validateQueryParams(req: Request, res: Response, next: NextFunction) {
  try {
    queryParamsSchema.parse(req.query);
    next();
  } catch (error) {
    next(new AppError("Invalid query parametrs", 400));
  }
}

router.use((req, res, next) => {
  console.log(`Users route middleware: ${req.method} ${req.url}`);
  next();
});

router.get("/", getAllUsers);

router.get("/:id", findUserById);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
