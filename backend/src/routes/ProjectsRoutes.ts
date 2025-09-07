import { Router } from "express";
import {
  listProjects,
  getProject,
  createProject
} from "../controllers/ProjectsController";

const router = Router();

router.get("/", listProjects);
router.get("/:id", getProject);
router.post("/", createProject);

export default router;