import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const options = { httpOnly: true, secure: false };

export const signup = async (req, res) => {
  const { name, email, password, address } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create(name, email, hashed, address, "USER");
    res.json(user.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const userRes = await User.findByEmail(email);
  const user = userRes.rows[0];

  if (!user) return res.status(404).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  );

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address,
    role: user.role,
  };

  res
    .cookie("accessToken", token, options)
    .json({ status: 200, success: true, user: userWithoutPassword, token });
};

export const logout = async (req, res) => {
  req.user = null;
  res.clearCookie("accessToken", options);
  res.json({ success: true, message: "Logged out" });
};

export const updatePassword = async (req, res) => {
  const { newPassword } = req.body;
  const user = req.user;

  const hashed = await bcrypt.hash(newPassword, 10);

  await User.updatePassword(user.id, hashed);

  res.json({ success: true, message: "Password updated" });
};

export const me = async (req, res) => {
  const user = req.user;
  return res.json({ user });
};
