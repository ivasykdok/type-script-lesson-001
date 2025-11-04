import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/users.js";
const router = Router();

router.get("/", getAllUsers);

router.post("/users", createUser);

export default router;
