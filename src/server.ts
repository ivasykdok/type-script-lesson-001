import express, { Response, Request, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import taskRoutes from "./routes/task.routes.js";

const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`logging, ${req.method} ${req.url}`)
  next()
})

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Roman! API is running");
});

app.use("/tasks", taskRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).send("Something broken");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
