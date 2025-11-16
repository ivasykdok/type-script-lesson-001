import { type CreateTaskData, statuses, type Task } from "../types/Types.tsx";
import { API_URL } from "./config.ts";

export type Status = (typeof statuses)[number];

export const fetchAllTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error fetch tasks ");
  }

  return response.json();
};

export const createTask = async (data: CreateTaskData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  console.log(
    "%c response ",
    "color: white; background-color: #007acc; border-radius: 4px; font-weight: bold;",
    response
  );

  if (!response.ok) {
    throw new Error("Error create tasks ");
  }

  return response.json();
};
