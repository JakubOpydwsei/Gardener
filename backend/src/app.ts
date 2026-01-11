import express from "express";
import cors from "cors";
import morgan from "morgan";
import plantsRouter from "./routes/PlantsRoutes";
import authRouter from "./routes/AuthRoutes";
import userRoutes from './routes/UserRoutes';

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

  app.get("/", (_req, res) => {
    res.send("Backend is running");
  });

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", ts: new Date().toISOString() });
  });

  app.use("/plants", plantsRouter);
  app.use("/auth", authRouter);
  app.use("/users",userRoutes);
  


  return app;
}