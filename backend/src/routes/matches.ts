import { Router } from "express";
import { demoUsers } from "../data/demoUsers.js";

const router = Router();

// GET /api/matches/:userId — simple reciprocal skill matches for the demo data
router.get("/:userId", (req, res) => {
  const current = demoUsers.find((user) => user.id === req.params.userId);
  if (!current) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const matches = demoUsers
    .filter((other) => other.id !== current.id)
    .map((other) => {
      const theyTeachWhatIWant = other.teaches.filter((skill) =>
        current.learns.some((wanted) => wanted.toLowerCase() === skill.toLowerCase())
      );
      const ITeachWhatTheyWant = current.teaches.filter((skill) =>
        other.learns.some((wanted) => wanted.toLowerCase() === skill.toLowerCase())
      );
      const score = theyTeachWhatIWant.length + ITeachWhatTheyWant.length;
      return { user: other, score, theyTeachWhatIWant, ITeachWhatTheyWant };
    })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score);

  res.json({ matches });
});

export default router;
