import "reflect-metadata";
import { Model } from "sequelize-typescript";
import { Task } from "./task.model";
import { Optional } from "sequelize";
export interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    active: boolean;
    lastLoginAt: Date | null;
}
export type UserCreationAttributes = Optional<UserAttributes, "id" | "active" | "lastLoginAt">;
export declare class User extends Model<UserAttributes, UserCreationAttributes> {
    firstName: string;
    lastName: string;
    email: string;
    active: boolean;
    lastLoginAt: Date | null;
    tasks: Task[];
}
//# sourceMappingURL=user.model.d.ts.map