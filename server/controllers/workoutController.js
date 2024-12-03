import Workout from "../models/Workout.js";

// Get all workouts
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workouts" });
  }
};

// Add a workout
export const addWorkout = async (req, res) => {
  const { exercise, date, status, dayNumber } = req.body;

  try {
    const workout = new Workout({ exercise, date, status, dayNumber });
    const savedWorkout = await workout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    res.status(500).json({ message: "Error saving workout" });
  }
};

// Update a workout
export const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { exercise, date, status, dayNumber } = req.body;

  try {
    const workout = await Workout.findByIdAndUpdate(
      id,
      { exercise, date, status, dayNumber },
      { new: true } // Return the updated document
    );
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Error updating workout" });
  }
};

// Delete a workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting workout" });
  }
};
////////////