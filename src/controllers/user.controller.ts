import { NextFunction, Request, Response } from "express";

import { User } from "../types/user.types.js";
import {
  addUser,
  deleteUserData,
  fetchAllUsers,
  fetchUserById,
  updateUserData,
} from "../services/user.service.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const queryParams = req.query;
    const users = await fetchAllUsers(queryParams);

    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

export const findUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const user = await fetchUserById(Number(id));

    if (!user) {
      return res.status(404).json({ error: `User id: ${id} not found` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createUser = async (
  req: Request<{}, {}, Partial<User>>,
  res: Response,
) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: "All fields is required" });
    }

    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (
  req: Request<{ id: string }, {}, Partial<User>>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const updatedUser = await updateUserData(Number(id), req.body);

    if (!updatedUser) {
      return res.status(404).json({ error: `User id: ${id} not found` });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const result = await deleteUserData(Number(id));

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "User successfully deleted",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
