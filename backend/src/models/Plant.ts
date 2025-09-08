import { Schema, model, Document } from "mongoose";

interface FloweringPeriod {
  start: number; 
  end: number;   
}

export interface Plant extends Document {
  name: string;
  latinName: string;
  imageUrl: string;
  species: string;
  soil: string;
  waterRequirement: 'low' | 'medium' | 'high';
  sunlight: string;
  floweringPeriod: FloweringPeriod;
  heightCm: number;
  color: string[];
  compatibleWith: string[];
}

const FloweringPeriodSchema = new Schema<FloweringPeriod>({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
}, { _id: false });

const PlantSchema = new Schema<Plant>({
  name: { type: String, required: true },
  latinName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  species: { type: String, required: true },
  soil: { type: String, required: true },
  waterRequirement: { type: String, enum: ['low', 'medium', 'high'], required: true },
  sunlight: { type: String, required: true },
  floweringPeriod: { type: FloweringPeriodSchema, required: true },
  heightCm: { type: Number, required: true },
  color: [{ type: String, required: true }],
  compatibleWith: [{ type: String, required: true }],
});

export const PlantModel = model<Plant>('Plant', PlantSchema);