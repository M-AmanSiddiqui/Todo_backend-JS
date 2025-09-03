import express from "express";
import cors from "cors";
import conn from "./connection/conn.js";
import auth from "./routes/auth.js";
import list from "./routes/list.js";

const app = express();
app.use(express.json());
app.use(cors());

conn();

app.use("/api/v1", auth);
app.use("/api/v2", list);

export default app;