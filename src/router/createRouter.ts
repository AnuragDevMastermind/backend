import { Router } from "express";
import auth from "./routes/auth.routes";
import otp from "./routes/otp.routes";
import auditLog from "./routes/auditLog.routes";
import expense from "./routes/expense.routes";
import budget from "./routes/budget.routes";
import heuristicCategory from "./routes/heuristicCategory.routes";
import scoreGenerator from "./routes/scoreGenerator.routes";
import cronJob from "./routes/cronjob.routes";

const router = Router();

export default (): Router => {
  auth(router)
  otp(router)
  auditLog(router)
  expense(router)
  budget(router)
  heuristicCategory(router)
  scoreGenerator(router)
  cronJob(router)
  return router;
};