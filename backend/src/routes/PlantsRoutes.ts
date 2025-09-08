import { Router } from "express";
import { PlantModel } from "../models/Plant";

const router = Router();

router.get("/", async (_req, res) => {
  const plants = await PlantModel.find();
  res.json(plants);
});

router.get("/id/:id", async (req, res) => {
  const plant = await PlantModel.findById(req.params.id);
  if (!plant) return res.status(404).json({ message: "Plant not found" });
  res.json(plant);
});

export default router;