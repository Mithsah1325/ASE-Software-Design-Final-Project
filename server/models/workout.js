import mongoose from "mongoose";

// Define the workout schema
const workoutSchema = mongoose.Schema(
  {
    exercise: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
    dayNumber: { type: Number, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create the Workout model
const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;
