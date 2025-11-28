import { Request, Response } from "express";
import { User } from "../models/user.model";
export declare const getUsers: (req: Request, res: Response) => Promise<void>;
export declare const updateUser: (req: Request<{
    id: string;
}, "", Partial<User>>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const findUserById: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteUser: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=user.controller.d.ts.map