import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import {
  ownerAverageRating,
  ownerRatings,
} from "../controllers/owner.controller.js";

const router = express.Router();

router.use(authenticate, authorize(["OWNER"]));

router.get("/ratings", ownerRatings);
router.get("/average-rating", ownerAverageRating);

export default router;
