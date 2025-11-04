import express, { Router, Request, Response } from "express";
import { createUser, getAllUsers } from "../controllers/users.js";
import { addUser } from "../services/users.js";
const router = Router();

router.get("/", getAllUsers);

router.post("/", createUser);

export default router;
