import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    req.user = user.rows[0];
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

export const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ error: "Access denied. Not authenticated." });
      return;
    }

    const roleArray = Array.isArray(roles) ? roles : [roles];
    if (!roleArray.includes(req.user.role)) {
      res
        .status(403)
        .json({ error: "Access denied. Insufficient permissions." });
      return;
    }

    next();
  };
};
