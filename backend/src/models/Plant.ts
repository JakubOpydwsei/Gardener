import { Schema, model, Document } from "mongoose";

interface Period {
  start: number;
  end: number;
}

type SoilType = 'sandy' | 'clay' | 'loamy' | 'peaty' | 'chalky' | 'silty';
type Species = 'tree' | 'shrub' | 'herb' | 'flower' | 'vegetable' | 'fruit';
type SoilPh = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface Plant extends Document {
  name: string;
  latinName?: string;
  imageUrl?: string;
  species: Species;
  soil: SoilType[];
  waterRequirement: 'low' | 'medium' | 'high';
  wateringDesc?: string;
  sunlight: 'full sun' | 'partial shade' | 'shade';
  floweringPeriod: Period;
  plantingPeriod?: Period;
  heightCm?: number;
  color?: string[];
  compatibleWith?: string[];
  soilPh?: SoilPh;

  growthRate?: 'slow' | 'medium' | 'fast';
  toxicity?: boolean;
  careTips?: string;
  temp?: { min: number; max: number };
  lifespan?: 'annual' | 'biennial' | 'perennial';
}

const PeriodSchema = new Schema<Period>(
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

  species: {
    type: String,
    enum: ['tree', 'shrub', 'herb', 'flower', 'vegetable', 'fruit'],
    required: true,
  },

  soil: {
    type: [String],
    enum: ['sandy', 'clay', 'loamy', 'peaty', 'chalky', 'silty'],
    required: true,
  },

  waterRequirement: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true,
  },
  wateringDesc: { type: String },

  sunlight: {
    type: String,
    enum: ['full sun', 'partial shade', 'shade'],
    required: true,
  },

  floweringPeriod: { type: PeriodSchema, required: true },
  plantingPeriod: { type: PeriodSchema },

  heightCm: { type: Number },
  color: [{ type: String }],
  compatibleWith: [{ type: String }],

  soilPh: { type: Number, min: 0, max: 14 },

  growthRate: { type: String, enum: ['slow', 'medium', 'fast'] },
  toxicity: { type: Boolean },
  careTips: { type: String },
  temp: {
    min: { type: Number },
    max: { type: Number },
  },
  lifespan: {
    type: String,
    enum: ['annual', 'biennial', 'perennial'],
  },
});

export const PlantModel = model<Plant>('Plant', PlantSchema);