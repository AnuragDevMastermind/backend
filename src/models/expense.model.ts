import mongoose, { Schema, Document,Types } from "mongoose";

export type Expense = {
  userId: Types.ObjectId;
  amount: number;
  category: string;
  date: Date;
  tags: string[];
  notes?: string;
};

interface ExpenseDocument extends Document, Expense {}

const expenseSchema = new Schema<ExpenseDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    tags: { type: [String], default: [] },
    notes: { type: String },
  },
  { versionKey: false, timestamps: true }
);

export const ExpenseModel = mongoose.model<ExpenseDocument>("Expense", expenseSchema);

