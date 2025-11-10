import "reflect-metadata";
import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model.js";

@Table({ tableName: "tasks" })
export class Task extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  declare title: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare description: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number | undefined;
}
