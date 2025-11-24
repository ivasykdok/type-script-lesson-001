import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateBody = (schema: z.ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const parseResult = schema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: parseResult.error.issues });
        }
        req.body = parseResult.data;
        next();
    };
};

export const validateQuery = (schema: z.ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const parseResult = schema.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ error: parseResult.error.issues });
        }
        req.query = parseResult.data;
        next();
    };
};