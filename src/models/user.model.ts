import "reflect-metadata";
import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
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

  @HasMany(() => Task)
  tasks: Task[] | undefined;
}
