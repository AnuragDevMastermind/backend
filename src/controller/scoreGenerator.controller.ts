import { Request, Response } from "express";
import { budgetAdherence } from "../db/repositories/scoreGenerator.repository";
import { calculateBudgetAdherence, calculateUsageFrequency, getDaysInMonth } from "../helpers/scoreGenerator.helper";
import { activeUsers } from "../db/repositories/auditLog.repository";

export const getFinalScore = async (req: Request, res: Response) => {
  try {
    const { userId, month, year } = req.body

    if (!userId || !month || !year) {
      return res.status(400).json({
        message: "UserId, month and year are required."
      });
    }

    const breakdown = await budgetAdherence(userId, month, year)

    if (!breakdown) {
      return res.status(400).json({ message: "No budget found" });
    }
    
    

    const adherence = calculateBudgetAdherence(breakdown);

    const active = await activeUsers(userId,month,year)
    const activedays = active.activeDays;
    const daysInMonth = getDaysInMonth(month-1,year);
    
    const frequency = calculateUsageFrequency(activedays,daysInMonth);

    let finalScore = (adherence*30)/100 + (frequency*30)/100;

    res.status(200).json({
      message: "score fetched successfully.",
      adherence,
      frequency,
      finalScore,
    });

  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
}
