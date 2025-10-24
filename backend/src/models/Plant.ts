import { Schema, model, Document } from "mongoose";

interface FloweringPeriod {
  start: number;
  end: number;
}

export interface Plant extends Document {
  name: string;
  latinName?: string;
  imageUrl?: string;
  species: string;
  soil: string;
  waterRequirement: 'low' | 'medium' | 'high';
  sunlight: 'full sun' | 'partial shade' | 'shade';
  floweringPeriod: FloweringPeriod;
  heightCm?: number;
  color?: string[];
  compatibleWith?: string[];
  soilPh?: number;
}

const FloweringPeriodSchema = new Schema<FloweringPeriod>(
  {
    start: { type: Number, required: true },
    end: { type: Number, required: true },
  },
  { _id: false }
);

const PlantSchema = new Schema<Plant>({
  name: { type: String, required: true },
  latinName: { type: String },
  imageUrl: { type: String },
  species: { type: String, required: true },
  soil: { type: String, required: true },
  waterRequirement: { type: String, enum: ['low', 'medium', 'high'], required: true },
  sunlight: { type: String, enum: ['full sun', 'partial shade', 'shade'], required: true },
  floweringPeriod: { type: FloweringPeriodSchema, required: true },
  heightCm: { type: Number },
  color: [{ type: String }],
  compatibleWith: [{ type: String }],
  soilPh: { type: Number, min: 0, max: 14 },
});

export const PlantModel = model<Plant>('Plant', PlantSchema);