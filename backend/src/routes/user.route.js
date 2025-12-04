import express from "express";
import { getStores } from "../controllers/user.controller.js";
import { rateStore } from "../controllers/rating.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate, authorize(["USER"]));

router.get("/stores", getStores);
router.post("/rate", rateStore);

export default router;
