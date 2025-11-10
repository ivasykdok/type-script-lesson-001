import { Sequelize } from "sequelize-typescript";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "db_dev",
  username: "db_user",
  password: "123",
  models: [Task, User],
});

sequelize.authenticate().then(() => {
  console.log("DB Started");
});
sequelize.sync({ alter: true }).then(() => {
  console.log("All models");
});

export default sequelize;
