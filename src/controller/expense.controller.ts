import { Request, Response } from "express";
import { createExpense, updateExpense, deleteExpense, getAllExpense } from "../db/repositories/expense.repository";
import { getCategoryByKeywords } from "../db/repositories/heuristicCategory.repository";
import { UserResponse } from "../models/user.model";

export const createNewExpense = async (req: Request, res: Response) => {
  try {
    let expenseData = req.body;
    const userResponse = req.userResponse as UserResponse;
    expenseData.userId = userResponse._id;
    const tagWords = expenseData.tags.flatMap((tag: string) => tag.split(/\s+/));
    const noteWords = expenseData.notes.split(/\s+/);
    const keywords = Array.from(new Set([...tagWords, ...noteWords].map(word => word.toLowerCase())));
    const category = await getCategoryByKeywords(keywords)
    expenseData.category = category
    const newExpense = await createExpense(expenseData);
    res.status(201).json({
      message: "Expense created successfully",
      data: {
        newExpense
      },
    });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};


export const updateExistingExpense = async (req: Request, res: Response) => {
  try {
    let { expense } = req.body;

    if (expense?.tags && expense?.notes) {
      const tagWords = expense.tags.flatMap((tag: string) => tag.split(/\s+/));
      const noteWords = expense.notes.split(/\s+/);
      const keywords = Array.from(new Set([...tagWords, ...noteWords].map(word => word.toLowerCase())));
      const category = await getCategoryByKeywords(keywords)
      expense.category = category
    }

    const updatedExpense = await updateExpense(expense._id, expense);

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const deleteExistingExpense = async (req: Request, res: Response) => {
  try {
    const { expense } = req.body;
    const deletedExpense = await deleteExpense(expense._id);

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
      data: deletedExpense,
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
}


export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const userResponse = req.userResponse as UserResponse;
    const expenses = await getAllExpense(userResponse._id);

    res.status(200).json({
      message: "Expenses fetched successfully",
      data: expenses,
    });

  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};