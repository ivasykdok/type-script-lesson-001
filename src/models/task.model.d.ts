import "reflect-metadata";
import { Model } from "sequelize-typescript";
import { Optional } from "sequelize";
export interface TaskAttributes {
    id: string;
    title: string;
    description?: string | null;
    priority: "low" | "medium" | "high";
    status: "todo" | "in-progress" | "done";
    deadline: string | null;
    userId: string;
}
export type TaskCreationAttributes = Optional<TaskAttributes, "id" | "description" | "deadline">;
export declare class Task extends Model<TaskAttributes, TaskCreationAttributes> {
    title: string;
    description?: string;
    priority: string;
    status: string;
    deadline: string | null;
    userId: string;
}
//# sourceMappingURL=task.model.d.ts.map