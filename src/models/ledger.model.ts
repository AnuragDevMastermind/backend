import mongoose, { Schema, Document, Types } from "mongoose";

// Enum for operation types (create, edit, delete)
export enum OperationType {
  CREATE = "CREATE",
  EDIT = "EDIT",
  DELETE = "DELETE",
}

// TransactionLedger schema definition
interface TransactionLedger {
  userId: Types.ObjectId;
  operation: OperationType;
  amount: number;
  category: string;
  date: Date;
  tags: string[];
  notes?: string;
  createdAt: Date;
}

interface TransactionLedgerDocument extends Document, TransactionLedger {}

const transactionLedgerSchema = new Schema<TransactionLedgerDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    operation: { type: String, enum: Object.values(OperationType), required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    tags: { type: [String], default: [] },
    notes: { type: String },
  },
  { versionKey: false, timestamps: true }
);

export const TransactionLedgerModel = mongoose.model<TransactionLedgerDocument>("TransactionLedger", transactionLedgerSchema);
