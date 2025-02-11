import {Router} from "express";
import {login, logout, refreshAccessToken, registration} from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", registration);
authRouter.post("/login", login);
authRouter.post("/refresh", refreshAccessToken);
authRouter.post("/logout", logout);

export default authRouter;
