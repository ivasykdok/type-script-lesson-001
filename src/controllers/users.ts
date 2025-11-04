import { Response, Request } from "express";
import { addUser, fetchAllUsers } from "../services/users.js";

export const getAllUsers = (req: Request, res: Response) => {
  const users = fetchAllUsers();
  res.json(users);
};

export const createUser = (req: Request, res: Response) => {
  console.log(
    "%c req.body ",
    "color: white; background-color: #007acc; border-radius: 4px; font-weight: bold;",
    req
  );
  const newUser = addUser(req.body);
  res.status(201).json(newUser);
};
