import { Router } from "express";
import { UserModel } from "../models/User";
import { PlantModel } from "../models/Plant";
import { protect, AuthRequest } from "../middleware/authMiddleware";
import { Types } from "mongoose";

const router = Router();


router.post(
  "/:userId/favorites/:plantId",
  protect,
  async (req: AuthRequest, res) => {
    const { userId, plantId } = req.params;

    if (req.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const plant = await PlantModel.findById(plantId);
    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }

    if (user.favoritePlants.some(id => id.toString() === plantId)) {
      return res.status(400).json({ error: "Plant already in favorites" });
    }

    user.favoritePlants.push(plant._id as Types.ObjectId);
    await user.save();

    res.json({ message: "Plant added to favorites" });
  }
);

router.get(
  "/:userId/favorites",
  protect,
  async (req: AuthRequest, res) => {
    const { userId } = req.params;

    if (req.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await UserModel
      .findById(userId)
      .populate("favoritePlants");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      count: user.favoritePlants.length,
      plants: user.favoritePlants
    });
  }
);
router.delete("/:userId/favorites/:plantId", async (req, res) => {
  const { userId, plantId } = req.params;

  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const plant = await PlantModel.findById(plantId);
  if (!plant) return res.status(404).json({ error: "Plant not found" });

  const index = user.favoritePlants.findIndex(id => id.toString() === plantId);
  if (index === -1) {
    return res.status(400).json({ error: "Plant not in favorites" });
  }

  user.favoritePlants.splice(index, 1);
  await user.save();

  res.json({ message: "Plant removed from favorites" });
});

export default router;