import mongoose, { Schema, Document } from 'mongoose';

export interface HeuristicCategory extends Document {
  name: string;
  keywords: string[];
  
}

const HeuristicCategorySchema = new Schema<HeuristicCategory>(
  {
    name: { type: String, required: true, unique: true },
    keywords: { type: [String], required: true },
  },
  { versionKey: false}
);

export const HeuristicCategoryModel = mongoose.model<HeuristicCategory>(
  'HeuristicCategory',
  HeuristicCategorySchema
);
