import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import {
  ownerStats,
} from "../controllers/owner.controller.js";

const router = express.Router();

router.use(authenticate, authorize(["OWNER"]));

router.get("/owner-stats", ownerStats);


export default router;
