import { z } from "zod";
import { Priority, Status } from "../types/Types";

export const statuses = ["todo", "in_progress", "done"] as const;
export const priorities = ["low", "medium", "high"] as const;

export const StatusSchema = z.enum(statuses);
export const StatusPriority = z.enum(priorities);

export const DEFAULT_STATUS: Status = "todo";
export const DEFAULT_PRIORITY: Priority = "low";