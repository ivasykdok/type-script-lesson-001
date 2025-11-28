import { z } from "zod";
export declare const statuses: readonly ["todo", "in-progress", "done"];
export type Status = (typeof statuses)[number];
export declare const priorities: readonly ["low", "medium", "high"];
export type Priority = (typeof priorities)[number];
export declare const taskSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<{
        todo: "todo";
        "in-progress": "in-progress";
        done: "done";
    }>;
    priority: z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
    }>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    deadline: z.ZodOptional<z.ZodString>;
    userId: z.ZodString;
}, z.core.$strip>;
export type TaskCreate = z.infer<typeof taskSchema>;
export type CreateTaskPayload = {
    title: string;
    description?: string | undefined;
    userId: string;
    priority: Priority;
    status: Status;
    deadline?: string | undefined;
    createdAt: string;
    updatedAt: string;
};
export declare const taskCreateSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    deadline: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    title: z.ZodString;
}, z.core.$strip>;
export type TaskCreateData = z.infer<typeof taskCreateSchema>;
//# sourceMappingURL=Task.d.ts.map