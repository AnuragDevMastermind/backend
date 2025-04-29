import { Types } from "mongoose";
import { BudgetModel } from "../../models/budget.model";

export const budgetAdherence = (
  userId: string,
  month: number,
  year: number
) =>{ 
  return BudgetModel.aggregate([
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
}