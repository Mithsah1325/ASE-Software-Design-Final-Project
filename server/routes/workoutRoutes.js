import express from "express";
import { getWorkouts, addWorkout, updateWorkout, deleteWorkout } from "../controllers/workoutController.js";

const router = express.Router();

router.get("/", getWorkouts);
router.post("/", addWorkout);
router.put("/:id", updateWorkout);  // Endpoint for updating a workout
router.delete("/:id", deleteWorkout);  // Endpoint for deleting a workout

export default router;
