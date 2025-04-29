import { Router } from "express";
import { createNewHeuristicCategory, getAllHeuristicCategory, updateExistingHeuristicCategory, deleteExistingHeuristicCategory } from "../../controller/heuristicCategory.controller";
import { LOGGED_IN_USER } from "../../middlewares/auth.middleware";


export default (router: Router) => {
  router.post("/createNewHeuristicCategory", LOGGED_IN_USER, createNewHeuristicCategory);
  router.put("/updateHeuristicCategory", LOGGED_IN_USER, updateExistingHeuristicCategory);
  router.delete("/deleteHeuristicCategory", LOGGED_IN_USER, deleteExistingHeuristicCategory);
  router.get("/getAllHeuristicCategory", LOGGED_IN_USER, getAllHeuristicCategory);
};
