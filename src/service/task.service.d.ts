import { Task } from "../models/task.model";
export declare const addTask: (data: Partial<Task>) => Promise<Task>;
export declare const getAllTasks: () => Promise<Task[]>;
export declare const fetchTaskById: (id: number) => Promise<Task | null>;
export declare const deleteTaskData: (id: number) => Promise<true | null>;
export declare const updateTaskData: (id: number, taskData: Partial<Task>) => Promise<Task>;
//# sourceMappingURL=task.service.d.ts.map