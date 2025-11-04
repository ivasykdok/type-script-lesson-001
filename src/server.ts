import express, { Response, Request, NextFunction } from "express";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello Roman");
});

app.use("/users", userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).send("Something broken");
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
