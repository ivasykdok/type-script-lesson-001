import express, { Response, Request, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import "./config/database";
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";

const serverApp = express();

serverApp.use(morgan("dev"));
serverApp.use(cors());
serverApp.use(express.json());

serverApp.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`logging..., ${req.method} ${req.url}`);
  next();
});

serverApp.get("/", (req: Request, res: Response) => {
  res.send("Hello Roman! API is running");
});

serverApp.use("/users", userRoutes);
serverApp.use("/tasks", taskRoutes);

export default serverApp;