import { UserModel } from "../../models/user.model";

export const getUsers = () =>
  UserModel.find();

export const getUserByNumber = (
  number: string
) => UserModel.findOne({ number });

export const getUserById = (
  id: string
) => UserModel.findOne({ id });

export const createUser = (
  values: Record<string, any>
) => new UserModel(values).save().then((user) => user.toObject());

export const overspentUsers = () => UserModel.aggregate([
  {
    $lookup: {
      from: "budgets",
      let: { userId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$userId", "$$userId"] },
                {
                  $eq: [
                    "$month",
                    { $month: "$$NOW" }
                  ]
                },
                {
                  $eq: [
                    "$year",
                    { $year: "$$NOW" }
                  ]
                }
              ]
            }
          }
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
                      {
                        $eq: [
                          "$userId",
                          "$$userId"
                        ]
                      },
                      {
                        $eq: [
                          "$category",
                          "$$category"
                        ]
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
          $addFields: {
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
            hasOverspent: {
              $gt: [
                {
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
                "$price"
              ]
            }
          }
        },
        {
          $match: {
            hasOverspent: true
          }
        },
        {
          $project: {
            _id: 0,
            category: 1,
            budgetedAmount: "$price",
            expenseAmount: 1
          }
        }
      ],
      as: "budgets"
    }
  },
  {
    $match: {
      "budgets.0": { $exists: true }
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      number: 1,
      overspentCategories: "$budgets"
    }
  }
]);

export const inActiveSpenders = () => UserModel.aggregate([
  {
    $lookup: {
      from: "expenses",
      let: {
        userId: "$_id"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$userId", "$$userId"]
                },
                {
                  $eq: [
                    {
                      $month: "$date"
                    },
                    {
                      $month: "$$NOW"
                    }
                  ]
                },
                {
                  $eq: [
                    {
                      $year: "$date"
                    },
                    {
                      $year: "$$NOW"
                    }
                  ]
                }
              ]
            }
          }
        }
      ],
      as: "expenses"
    }
  },
  {
    $addFields: {
      lastExpenseDate: {
        $max: "$expenses.date"
      }
    }
  },
  {
    $match: {
      $expr: {
        $or: [
          {
            $lt: [
              "$lastExpenseDate",
              {
                $subtract: [
                  "$$NOW",
                  5 * 24 * 60 * 60 * 1000
                ]
              }
            ]
          },
          {
            $eq: ["$lastExpenseDate", null]
          }
        ]
      }
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      number: 1
    }
  }
])
