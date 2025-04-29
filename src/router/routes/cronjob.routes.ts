import { Router } from "express";
import { startEmailReminder, stopEmailReminder } from "../../controller/cronJob.controller";
import { ADMIN } from "../../middlewares/auth.middleware";

export default (router: Router) => {
  router.post("/cron/startNotification", ADMIN, startEmailReminder)
  router.post("/cron/stopNotification", ADMIN, stopEmailReminder)
}