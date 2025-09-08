import { Request, Response } from "express";
import mongoose from "mongoose";
import { ProjectModel } from "../models/Project";
import { asyncHandler } from "../utils/asyncHandler";

const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const listProjects = asyncHandler(async (_req: Request, res: Response) => {
  const projects = await ProjectModel.find().sort({ createdAt: -1 }).lean();
  res.json(projects);
});

export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ error: "Invalid id" });

  const project = await ProjectModel.findById(id).lean();
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const { name, description = "", items = [] } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const created = await ProjectModel.create({ name, description, items });
  res.status(201).json(created);
});