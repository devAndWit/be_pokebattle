import {Router} from "express";
import {deleteOne, updateOne} from "../controllers/crudFactory.js";
import UserModel from "../models/User.js";
import {authenticate} from "../middleware/authMiddleware.js";
import {getAllUsers, getTopUsers, getUserById, getUserPokemonList} from "../controllers/user.js";

const userRouter = Router();

userRouter.get("/", authenticate, getAllUsers);
userRouter.get("/topUsers", getTopUsers);
userRouter
    .get("/:id", authenticate, getUserById)
    .put("/:id", authenticate, updateOne(UserModel))
    .delete("/:id", authenticate, deleteOne(UserModel));

userRouter.get("/pokemonList/:id", authenticate, getUserPokemonList);


export default userRouter;
