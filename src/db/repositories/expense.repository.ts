import { Types } from "mongoose";
import { ExpenseModel } from "../../models/expense.model";
import { OperationType, TransactionLedgerModel } from "../../models/ledger.model";

const createLedgerEntry = async (data: {
  userId: Types.ObjectId;
  operation: OperationType;
  amount: number;
  category: string;
  date: Date;
  tags: string[];
  notes?: string;
}) => {
  await new TransactionLedgerModel({
    ...data
  }).save();
};

export const createExpense = async (values: Record<string, any>) => {
  const expense = await new ExpenseModel(values).save();

  // Create ledger entry for creation
  await createLedgerEntry({
    userId: expense.userId,
    operation: OperationType.CREATE,
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
    tags: expense.tags,
    notes: expense.notes,

  });

  return expense.toObject();
};

export const updateExpense = async (id: string, updatedFields: Record<string, any>) => {
  const expense = await ExpenseModel.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    { new: true }
  );

  if (expense) {
    // Create ledger entry for edit
    await createLedgerEntry({
      userId: expense.userId,
      operation: OperationType.EDIT,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      tags: expense.tags,
      notes: expense.notes,
    });
  }

  return expense;
};

export const deleteExpense = async (id: string) => {
  const expense = await ExpenseModel.findByIdAndDelete(id);

  if (expense) {
    // Create ledger entry for delete
    await createLedgerEntry({
      userId: expense.userId,
      operation: OperationType.DELETE,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      tags: expense.tags,
      notes: expense.notes,
    });
  }

  return expense;
};

export const getAllExpense = (
  userId: string
) => ExpenseModel.find({ userId });
