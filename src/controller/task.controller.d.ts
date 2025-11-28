import { NextFunction, Request, Response } from "express";
import { Task } from "../models/task.model";
export declare const getTasks: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const findTaskById: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteTask: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateTask: (req: Request<{
    id: string;
}, "", Partial<Task>>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=task.controller.d.ts.map