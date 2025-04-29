import { Router } from "express";
import { createNewExpense, deleteExistingExpense, updateExistingExpense, getAllExpenses } from "../../controller/expense.controller";
import { LOGGED_IN_USER } from "../../middlewares/auth.middleware";


export default (router: Router) => {
  router.post("/createNewExpense", LOGGED_IN_USER, createNewExpense);
  router.put("/updateExpense", LOGGED_IN_USER, updateExistingExpense);
  router.delete("/deleteExpense", LOGGED_IN_USER, deleteExistingExpense);
  router.get("/getAllExpense", LOGGED_IN_USER, getAllExpenses);
};
