import express, { Response, Request, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import taskRoutes from "./routes/task.routes.js";
import "./config/database.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Roman! API is running");
});

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).send("Something broken");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
