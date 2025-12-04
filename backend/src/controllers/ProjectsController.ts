import { Request, Response } from "express";
import mongoose from "mongoose";
import { ProjectModel } from "../models/Project";
import { asyncHandler } from "../utils/asyncHandler";

interface AuthRequest extends Request {
    userId?: string; 
}

const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const listProjects = asyncHandler(async (req: AuthRequest, res: Response) => {
    const projects = await ProjectModel.find({ owner: req.userId }).sort({ createdAt: -1 }).lean();
    res.json(projects);
});

export const getProject = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: "Invalid id" });

    const project = await ProjectModel.findOne({ _id: id, owner: req.userId }).lean();
    
    if (!project) return res.status(404).json({ error: "Project not found or access denied" });
    res.json(project);
});

export const createProject = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name, description = "", items = [] } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    
    const created = await ProjectModel.create({ name, description, items, owner: req.userId });
    res.status(201).json(created);
});