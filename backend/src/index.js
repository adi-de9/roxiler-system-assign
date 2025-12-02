import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { pool } from "./db.js";

const app = express();
app.use(express.json());

// test api
app.get("/health-check", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
