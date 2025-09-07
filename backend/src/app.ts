import express from "express";
import cors from "cors";
import morgan from "morgan";
import projectsRouter from "./routes/projects.routes";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", ts: new Date().toISOString() });
  });

  app.use("/api/projects", projectsRouter);

  return app;
}