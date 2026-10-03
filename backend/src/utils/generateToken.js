import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const generateToken = (userId, role = "user") => {
  return jwt.sign({ id: userId, role }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN || "7d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, ENV.JWT_SECRET);
};

export default generateToken;
