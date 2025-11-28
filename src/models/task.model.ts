import "reflect-metadata";
import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";
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

export type TaskCreationAttributes = Optional<
  TaskAttributes,
  "id" | "description" | "deadline"
>;

@Table({ tableName: "tasks" })
export class Task extends Model<TaskAttributes, TaskCreationAttributes> {
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  declare title: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  declare description?: string;

  @AllowNull(false)
  @Column({ type: DataType.ENUM("low", "medium", "high") })
  declare priority: string;

  @AllowNull(false)
  @Column({ type: DataType.ENUM("todo", "in-progress", "done") })
  declare status: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare deadline: string | null;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  declare userId: string;
}
