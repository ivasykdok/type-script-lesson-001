import { Sequelize } from "sequelize-typescript";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { Dialect } from "sequelize";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

interface DBConfig {
  [key: string]: {
    username?: string;
    password?: string;
    database?: string;
    host?: string;
    dialect: Dialect;
    storage?: string;
    logging?: boolean;
  };
}

const config: DBConfig = {
  development: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    dialect: "postgres",
  },
  test: {
    dialect: "sqlite",
    storage: ":memory",
    logging: false,
  },
};

const env = process.env.NODE_ENV || "development";

const db = new Sequelize({
  ...config[env],
  models: [Task, User],
});

db.authenticate().then(() => {
  console.log("DB Started");
});
db.sync({ alter: true }).then(() => {
  console.log("All models");
});

export default db;
