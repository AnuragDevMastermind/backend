import { Router } from "express";
import { createNewAuditLog } from "../../controller/auditLog.controller";
import { LOGGED_IN_USER } from "../../middlewares/auth.middleware";

export default (router: Router) => {
  router.post("/createAuditLog", LOGGED_IN_USER, createNewAuditLog)
}