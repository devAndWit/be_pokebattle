import asyncHandler from "../utils/handler/asyncHandler.js";
import ErrorResponse from "../utils/error/ErrorResponse.js";
import jwt from "jsonwebtoken";

export const authenticate = asyncHandler(async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return next(new ErrorResponse("Access denied", 401)); // ✅ `return next(error)`, а не `throw`
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new ErrorResponse("Invalid token", 403)); // ✅ Обрабатываем неверный токен
    }
});
