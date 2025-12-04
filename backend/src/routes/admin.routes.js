import express from "express";
import {
  addUser,
  addStore,
  adminDashboard,
  listStores,
  listUsers,
  userDetails,
} from "../controllers/admin.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Only ADMIN allowed routes
router.use(authenticate, authorize(["ADMIN"]));

router.post("/add-user", addUser);
router.post("/add-store", addStore);

router.get("/stats", adminDashboard);
router.get("/users", listUsers);
router.get("/stores", listStores);
router.get("/users/:id", userDetails);

export default router;
