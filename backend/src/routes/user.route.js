import express from "express";
import { getStores, searchStores } from "../controllers/user.controller.js";
import { rateStore } from "../controllers/rating.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate, authorize(["USER"]));

router.get("/stores", getStores);
router.get("/stores/search", searchStores);
router.post("/rate", rateStore);

export default router;
