import asyncHandler from "../utils/handler/asyncHandler.js";
import ErrorResponse from "../utils/error/ErrorResponse.js";
import jwt from "jsonwebtoken";

export const authenticate  = asyncHandler((req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token) throw new ErrorResponse("Access denied", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
});
