import "dotenv/config";
import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";
import matchesRouter from "./routes/matches.js";

const app = express();
const port = Number(process.env.PORT || 4000);
const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "peer-skill-exchange-api" });
});

app.use("/api/users", usersRouter);
app.use("/api/matches", matchesRouter);

app.listen(port, () => {
  console.log(`Peer Skill Exchange API running at http://localhost:${port}`);
});
