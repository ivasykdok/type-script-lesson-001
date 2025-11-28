import { Sequelize } from "sequelize-typescript";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";
import * as dotenv from "dotenv";
dotenv.config({
    path: `.env.${process.env.NODE_ENV || "development"}`,
});
if (!process.env.DB_USER ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_NAME ||
    !process.env.DB_HOST) {
    throw new Error("Missing DB environment variables");
}
const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres",
    },
    test: {
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    },
};
const env = process.env.NODE_ENV || "development";
const db = new Sequelize({
    ...config[env],
    models: [User, Task],
});
(async () => {
    try {
        await db.authenticate();
        console.log("DB connected");
        await db.sync({ alter: true });
        console.log("All models synced");
    }
    catch (error) {
        console.error("DB connection error:", error);
    }
})();
export default db;
//# sourceMappingURL=database.js.map