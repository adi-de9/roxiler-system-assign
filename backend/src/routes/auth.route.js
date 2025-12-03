import express from "express";
import {
  signup,
  login,
  updatePassword,
  me,
  logout,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.put("/update-password", authenticate, updatePassword);
router.get("/me", authenticate, me);

export default router;
