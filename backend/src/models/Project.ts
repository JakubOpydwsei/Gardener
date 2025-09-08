import mongoose, { Document, Schema } from "mongoose";

export interface Item {
  type: string;
  label: string;
  x: number;
  y: number;
}

export interface Project extends Document {
  name: string;
  description: string;
  items: Item[];
}

const ItemSchema = new Schema<Item>(
  {
    type: { type: String, default: "plant" },
    label: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  { _id: false }
);

const ProjectSchema = new Schema<Project>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    items: [ItemSchema]
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.model<Project>("Project", ProjectSchema);