import express from "express";
import {
  getWorkoutHistory,
  markWorkoutAsComplete,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/WorkoutHistoryController.js"; // Import controller using ES6 import

const router = express.Router();

// Routes for workout history CRUD
router.get("/workouts", getWorkoutHistory);
router.put("/workouts/complete/:id", markWorkoutAsComplete);
router.post("/workouts", createWorkout);
router.put("/workouts/:id", updateWorkout);
router.delete("/workouts/:id", deleteWorkout);

export default router;
