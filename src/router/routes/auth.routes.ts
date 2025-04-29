import { Router } from "express";
import { isUserLoggedIn, login, logout, register, submitOtp } from "../../controller/auth.controller";

export default (router: Router) => {
  router.post("/login", login)
  router.post("/logout", logout)
  router.post("/register", register)
  router.post("/submitOtp", submitOtp)
  router.post("/isUserLoggedIn", isUserLoggedIn)
}