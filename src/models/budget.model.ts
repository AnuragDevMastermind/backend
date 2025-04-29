import mongoose, { Schema, Document, Types } from "mongoose";

export type Budget = {
    userId: Types.ObjectId;
    category: string;
    price: number;
    month: number;
    year: number;
};

interface BudgetDocument extends Document, Budget {}

const budgetSchema = new Schema<BudgetDocument>(
    {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
      month: { type: Number, required: true, min: 1, max: 12 },
      year: { type: Number, required: true },
    },
    { versionKey: false, timestamps: true }
  );

export const BudgetModel = mongoose.model<BudgetDocument>("Budget", budgetSchema);
