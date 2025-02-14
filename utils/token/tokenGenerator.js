import jwt from "jsonwebtoken";
import TokenModel from "../../models/Token.js";

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "24h",
  });
};

export const generateToken = async (userId) => {
  const accessToken = await generateAccessToken(userId);
  const refreshToken = await generateRefreshToken(userId);

  await TokenModel.deleteMany({ userId });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);

  await TokenModel.create({ userId, refreshToken, expiresAt });
  return { accessToken, refreshToken };
};
