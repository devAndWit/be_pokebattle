import {Router} from "express";
import {deleteOne, getAll, getOneById, updateOne} from "../controllers/crudFactory.js";
import BattleHistoryModel from "../models/BattleHistory.js";
import {getUserABattleHistory} from "../controllers/battleHistory.js";

const battleHistoryRouter = Router();

battleHistoryRouter.get("/", getAll(BattleHistoryModel));
battleHistoryRouter.get("/user/:userId", getUserABattleHistory);
battleHistoryRouter
    .get("/:id", getOneById(BattleHistoryModel))
    .put("/:id", updateOne(BattleHistoryModel))
    .delete("/:id", deleteOne(BattleHistoryModel));

export default battleHistoryRouter;
