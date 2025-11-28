import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type UserCreate = z.infer<typeof userSchema>;

export const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type UserCreateData = z.infer<typeof userCreateSchema>;
