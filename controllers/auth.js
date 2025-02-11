import {generateAccessToken, generateRefreshToken} from "../utils/token/tokenGenerator.js";
import TokenModel from "../models/Token.js";
import asyncHandler from "../utils/handler/asyncHandler.js";
import UserModel from "../models/User.js";
import ErrorResponse from "../utils/error/ErrorResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = async (userId) => {
    const accessToken = await generateAccessToken(userId);
    const refreshToken = await generateRefreshToken(userId);

    await TokenModel.deleteMany({userId})

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    await TokenModel.create({userId, refreshToken, expiresAt});
    return {accessToken, refreshToken};
};

export const registration = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const existingUser = await UserModel.findOne({email});
    if (existingUser) throw new ErrorResponse('User already exist', 400);
    await UserModel.create({email, password});
    res.status(201).json({message: "User registered successfully"});
});

export const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if (!user) throw new ErrorResponse('Invalid credentials', 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ErrorResponse('Invalid credentials', 400);

    const tokens = await generateToken(user._id);
    res.json(tokens);
});

export const refreshAccessToken = asyncHandler( async (req, res) => {
    const {refreshToken} = req.body;
    if(!refreshToken) throw new ErrorResponse("Refresh token required", 401);

    const storedToken = await TokenModel.findOne({refreshToken: refreshToken });
    if(!storedToken) throw new ErrorResponse("Invalid refresh token", 403);

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const tokens = await generateToken(decoded.userId);

    await TokenModel.deleteOne({refreshToken: refreshToken})

    res.json(tokens);
});

export const logout = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    await TokenModel.deleteOne({ refreshToken });
    res.json({ message: "Logged out successfully" });
});
