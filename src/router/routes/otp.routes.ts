import { Router } from "express";
import { sendOtp } from "../../controller/otp.controller";
import { LOGGED_IN_USER } from "../../middlewares/auth.middleware";

export default (router: Router) => {
  router.post("/sendOtp",LOGGED_IN_USER, sendOtp)
}