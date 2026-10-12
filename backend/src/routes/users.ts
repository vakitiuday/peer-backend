import { Router } from "express";
import { demoUsers } from "../data/demoUsers.js";

const router = Router();

// GET /api/users — list demo profiles
router.get("/", (_req, res) => {
  res.json({ users: demoUsers });
});

// GET /api/users/:id — find a profile by id
router.get("/:id", (req, res) => {
  const user = demoUsers.find((item) => item.id === req.params.id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json({ user });
});

export default router;
