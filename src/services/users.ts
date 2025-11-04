import { User } from "../types/users.js";
import crypto from "crypto";

const users: User[] = [
  {
    id: "1",
    username: "user 1",
  },
  {
    id: "2",
    username: "user 2",
  },
];

export const fetchAllUsers = () => {
  return users;
};

export const addUser = (user: User) => {
  const id = crypto.randomUUID();
  users.push({ id, ...user });
  return user;
};
