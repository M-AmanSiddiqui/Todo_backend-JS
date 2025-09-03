import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import conn from "./connection/conn.js";
import auth from "./routes/auth.js";
import list from "./routes/list.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

conn();

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("/api/*", (req, res) => {
  // Handle API requests
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist", "index.html"));
});

export default app;