import { Types } from "mongoose";
import { BudgetModel } from "../../models/budget.model";

export const createBudget = (
  values: Record<string, any>
) => new BudgetModel(values).save().then((budget) => budget.toObject());

export const updateBudget = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return BudgetModel.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    { new: true }
  );
};

export const deleteBudget = (id: string) => {
  return BudgetModel.findByIdAndDelete(id);
};

export const getAllBudget = (userId: string) => {
  return BudgetModel.find({ userId });
};

export const budgetExpenseBreakdown = (
  userId: string,
  month: number,
  year: number
) => BudgetModel.aggregate([
  {
    $match: { userId: new Types.ObjectId(userId), month, year }
  },
  {
    $lookup: {
      from: "expenses",
      let: {
        category: "$category",
        userId: "$userId",
        month: "$month",
        year: "$year"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$userId", "$$userId"] },
                {
                  $eq: ["$category", "$$category"]
                },
                {
                  $eq: [
                    { $month: "$date" },
                    "$$month"
                  ]
                },
                {
                  $eq: [
                    { $year: "$date" },
                    "$$year"
                  ]
                }
              ]
            }
          }
        },
        {
          $group: {
            _id: null,
            totalSpent: { $sum: "$amount" }
          }
        }
      ],
      as: "expenses"
    }
  },
  {
    $project: {
      _id: 0,
      category: 1,
      budgetedAmount: "$price",
      expenseAmount: {
        $ifNull: [
          {
            $arrayElemAt: [
              "$expenses.totalSpent",
              0
            ]
          },
          0
        ]
      },
      month: 1,
      year: 1
    }
  }
]);