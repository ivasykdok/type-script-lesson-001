import { Response, Request } from "express";
import { addUser, fetchAllUsers } from "../services/users.js";

export const getAllUsers = (req: Request, res: Response) => {
  const users = fetchAllUsers();
  res.json(users);
};

export const createUser = (req: Request, res: Response) => {
  const newUser = addUser(req.body);
  res.status(201).json(newUser);
};
