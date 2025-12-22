// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    console.log("authMiddleware - checking authorization");
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader ? "present" : "missing");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No valid Bearer token");
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token extracted");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded, user ID:", decoded.id);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log("User not found in database");
      return res.status(401).json({ message: "User not found" });
    }

    console.log("User found:", user.email, user.role);
    req.user = user;
    next();
  } catch (err) {
    console.log("Auth error:", err.message);
    return res.status(401).json({ message: "Token invalid" });
  }
};
