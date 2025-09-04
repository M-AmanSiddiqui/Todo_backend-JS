import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conn from "./connection/conn.js";
import auth from "./routes/auth.js";
import list from "./routes/list.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

conn();

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Todo Backend is running!" });
});

// API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found", path: req.path });
});

export default app;