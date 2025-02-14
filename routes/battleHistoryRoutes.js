import {Router} from "express";
import {createOne, deleteOne, getAll, getOneById, updateOne} from "../controllers/crudFactory.js";
import BattleHistoryModel from "../models/BattleHistory.js";
import {getUserABattleHistory} from "../controllers/battleHistory.js";

const battleHistoryRouter = Router();

battleHistoryRouter
    .get("/", getAll(BattleHistoryModel))
    .post("/", createOne(BattleHistoryModel));

battleHistoryRouter.get("/user/:userId", getUserABattleHistory);

battleHistoryRouter
    .get("/:id", getOneById(BattleHistoryModel))
    .put("/:id", updateOne(BattleHistoryModel))
    .delete("/:id", deleteOne(BattleHistoryModel));

export default battleHistoryRouter;
