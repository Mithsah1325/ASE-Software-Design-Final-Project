// routes/goalRoutes.js
import express from "express";
import { saveGoal, getGoalByEmail } from "../controllers/goalController.js";

const router = express.Router();

// Save a goal
router.post("/Goal", saveGoal);

// Get a saved goal by email
router.get("/getGoal", getGoalByEmail);

export default router;
