import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import db from "./config/database.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import AppError from "./error.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

async function main() {
  await db.sync({ alter: true });
  console.log("Database synced");
}

main();

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.statusCode).send(err.message);
});

export default app;
