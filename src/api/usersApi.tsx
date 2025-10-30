import { type CreateUserData } from "../pages/CreateUser.tsx";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("http://localhost:3000/users");

  if (!response.ok) {
    throw new Error("Failed fetch users");
  }

  return response.json();
};

export const createUser = async (data: CreateUserData): Promise<User> => {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed create user");
  }

  return response.json();
};
