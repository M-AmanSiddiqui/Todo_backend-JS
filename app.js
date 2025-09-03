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

// ✅ MongoDB connect
conn();

// ✅ API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// ✅ Serve frontend build
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist", "index.html"));
});

// ✅ Export for Vercel
export default app;

// ✅ Local dev
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 1000;
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}
