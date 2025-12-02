import express from "express";
import {
  signup,
  login,
  updatePassword,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.put("/update-password", authenticate, updatePassword);

export default router;
