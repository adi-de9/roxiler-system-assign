import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { pool } from "./db/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logDetails } from "./middleware/logger.middleware.js";

//routes imports
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.route.js";
import ownerRoutes from "./routes/owner.route.js";

const app = express();

//middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CORS_FRONTEND_URL,
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logDetails);

// test api
app.get("/health-check", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/owner", ownerRoutes);

// app listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));