import { Request, Response } from "express";
import { createBudget, updateBudget, deleteBudget, getAllBudget, budgetExpenseBreakdown } from "../db/repositories/budget.repository";
import {UserResponse} from "../models/user.model";

export const createNewBudget = async (req: Request, res: Response) => {
  try {
    const budgetData = req.body;
    const newBudget = await createBudget(budgetData);

    

    res.status(201).json({
      message: "Budget created successfully",
      data: newBudget,
    });
  } catch (error) {
    console.error("Error creating budget:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const updateExistingBudget = async (req: Request, res: Response) => {
  try {
    const { budget } = req.body;

    // Check if the budget object and _id field are present
    if (!budget || !budget._id) {
      return res.status(400).json({
        message: "Bad request",
        error: "'_id' is required to update the budget",
      });
    }

    const updatedBudget = await updateBudget(budget._id, budget);

    if (!updatedBudget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    res.status(200).json({
      message: "Budget updated successfully",
      data: updatedBudget,
    });
  } catch (error) {
    console.error("Error updating budget:", error);

    // Additional check for errors
    if (error instanceof TypeError) {
      return res.status(500).json({
        message: "Internal server error",
        error: "Unexpected error: " + error.message,
      });
    }

    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};


export const deleteExistingBudget = async (req: Request, res: Response) => {
  try {
    const { budget } = req.body;
    const deletedBudget = await deleteBudget(budget._id);

    if (!deletedBudget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    res.status(200).json({
      message: "Budget deleted successfully",
      data: deletedBudget,
    });
  } catch (error) {
    console.error("Error deleting budget:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const getAllBudgets = async (req: Request, res: Response) => {
  try {
    const userResponse = req.userResponse as UserResponse;
    const budgets = await getAllBudget(userResponse._id);

    res.status(200).json({
      message: "Budgets fetched successfully",
      data: budgets,
    });

  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const getBudgetExpenseBreakdown = async (req: Request, res: Response) => {
  try {
    const { userId, month, year } = req.body

    if (!userId || !month || !year) {
      return res.status(400).json({
        message: "UserId, month and year are required."
      });
    }

    const breakdown = await budgetExpenseBreakdown(userId, month, year)

    if (!breakdown) {
      return res.status(400).json({ message: "No budget found" });
    }

    res.status(200).json({
      message: "Budget expense breakdown fetched successfully.",
      data: {
        budgetExpenseBreakdown: breakdown
      },
    });

  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
}