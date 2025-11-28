import "reflect-metadata";
import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
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

export type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "active" | "lastLoginAt"
>;

@Table({ tableName: "users" })
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({ type: DataType.STRING })
  declare firstName: string;

  @Column({ type: DataType.STRING })
  declare lastName: string;

  @Column({ type: DataType.STRING, validate: { isEmail: true } })
  declare email: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare active: boolean;

  @Column(DataType.DATE)
  declare lastLoginAt: Date | null;

  @HasMany(() => Task)
  tasks!: Task[];
}
