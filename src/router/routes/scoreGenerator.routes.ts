import { Router } from "express";
import { getFinalScore } from "../../controller/scoreGenerator.controller";
import {LOGGED_IN_USER} from "../../middlewares/auth.middleware";


export default (router: Router) => {
  router.get("/getFinalScore",LOGGED_IN_USER, getFinalScore);
};
