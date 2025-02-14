import {Router} from "express";
import {deleteOne, updateOne} from "../controllers/crudFactory.js";
import UserModel from "../models/User.js";
import {authenticate} from "../middleware/authMiddleware.js";
import {getAllUsers, getTopUsers, getUserById, getUserPokemonList} from "../controllers/user.js";

const userRouter = Router();

userRouter.get("/", authenticate, getAllUsers);
userRouter.get("/topUsers", getTopUsers);
userRouter.get("/:id", authenticate, getUserById);
userRouter.get("/pokemonList/:id", authenticate, getUserPokemonList);

userRouter.put("/:id", authenticate, updateOne(UserModel));
userRouter.delete("/:id", authenticate, deleteOne(UserModel));

export default userRouter;
