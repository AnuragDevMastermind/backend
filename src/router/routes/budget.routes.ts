import { Router } from "express";
import { createNewBudget, deleteExistingBudget, getAllBudgets, getBudgetExpenseBreakdown, updateExistingBudget } from "../../controller/budget.controller";
import { LOGGED_IN_USER } from "../../middlewares/auth.middleware";


export default (router: Router) => {
  router.post("/createNewBudget", LOGGED_IN_USER, createNewBudget);
  router.put("/updateBudget", LOGGED_IN_USER, updateExistingBudget);
  router.delete("/deleteBudget", LOGGED_IN_USER, deleteExistingBudget);
  router.get("/getAllBudget", LOGGED_IN_USER, getAllBudgets);
  router.get("/getBudgetExpenseBreakdown", LOGGED_IN_USER, getBudgetExpenseBreakdown);
};
