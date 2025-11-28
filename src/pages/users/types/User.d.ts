import { z } from "zod";
export declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type UserCreate = z.infer<typeof userSchema>;
export declare const userCreateSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
}, z.core.$strip>;
export type UserCreateData = z.infer<typeof userCreateSchema>;
//# sourceMappingURL=User.d.ts.map