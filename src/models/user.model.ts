import "reflect-metadata";
import {
  AllowNull,
  Column,
  DataType, Default,
  HasMany,
  Model,
  Table
} from "sequelize-typescript";
import { Task } from "./task.model.js";

@Table({ tableName: "users" })
export class User extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  declare username: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING, validate: { isEmail: true } })
  declare email: string;

  @AllowNull(true)
  @Default(true)
  @Column(DataType.BOOLEAN)
  declare active: boolean;

  @Column(DataType.DATE)
  declare lastLoginAt: Date;

  @HasMany(() => Task)
  tasks: Task[] | undefined;
}
