import {Router} from "express";
import {updateOne} from "../controllers/crudFactory.js";
import UserModel from "../models/User.js";
import {authenticate} from "../middleware/authMiddleware.js";
import {getAllUsers, getTopUsers, getUserById, getUserPokemonList} from "../controllers/user.js";

const userRouter = Router();

userRouter.get("/", authenticate, getAllUsers);
userRouter.get("/:id", authenticate, getUserById);
userRouter.get("/pokemonList/:id", authenticate, getUserPokemonList);
userRouter.get("/topUsers", getTopUsers);
userRouter.put("/:id", authenticate, updateOne(UserModel));
userRouter.delete("/:id", authenticate, updateOne(UserModel));

export default userRouter;
