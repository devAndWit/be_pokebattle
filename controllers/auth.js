import {generateToken} from "../utils/token/tokenGenerator.js";
import TokenModel from "../models/Token.js";
import asyncHandler from "../utils/handler/asyncHandler.js";
import UserModel from "../models/User.js";
import ErrorResponse from "../utils/error/ErrorResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registration = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    const existingUser = await UserModel.findOne({email});

    if (existingUser) throw new ErrorResponse('User already exist', 400);

    await UserModel.create({username, email, password});
    res.status(201).json({message: "User registered successfully"});
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) throw new ErrorResponse("Invalid credentials", 400);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new ErrorResponse("Invalid credentials", 400);

  const tokens = await generateToken(user._id);
  res.json({userId: user._id, tokens});
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new ErrorResponse("Refresh token required", 401);

  const storedToken = await TokenModel.findOne({ refreshToken: refreshToken });

  if (!storedToken) throw new ErrorResponse("Invalid refresh token", 403);

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const tokens = await generateToken(decoded.userId);

  res.json(tokens);
});

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  await TokenModel.deleteOne({ refreshToken });

  res.json({ message: "Logged out successfully" });
});
