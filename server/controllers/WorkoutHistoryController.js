import Workout from "../models/Workout.js"; // Import Workout model using ES6 import

// Get workout history by userId and status
const getWorkoutHistory = async (req, res) => {
  try {
    const { userId, status } = req.query;

    const workouts = await Workout.find({ userId, status });
    res.status(200).json(workouts);
  } catch (error) {
    console.error("Error fetching workout history:", error);
    res.status(500).json({ message: "Failed to fetch workout history." });
  }
};

// Mark a workout as complete
const markWorkoutAsComplete = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      { status: "completed" },
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found." });
    }

    res.status(200).json({ message: "Workout marked as complete.", updatedWorkout });
  } catch (error) {
    console.error("Error marking workout as complete:", error);
    res.status(500).json({ message: "Failed to update workout status." });
  }
};

// Create a new workout
const createWorkout = async (req, res) => {
  try {
    const { userId, exercise, date, status, dayNumber } = req.body;

    const newWorkout = new Workout({
      userId,
      exercise,
      date,
      status,
      dayNumber,
    });

    await newWorkout.save();

    res.status(201).json({ message: "Workout created successfully.", newWorkout });
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ message: "Failed to create workout." });
  }
};

// Update an existing workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { exercise, date, status, dayNumber } = req.body;

    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      { exercise, date, status, dayNumber },
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found." });
    }

    res.status(200).json({ message: "Workout updated successfully.", updatedWorkout });
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(500).json({ message: "Failed to update workout." });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedWorkout = await Workout.findByIdAndDelete(id);

    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found." });
    }

    res.status(200).json({ message: "Workout deleted successfully." });
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({ message: "Failed to delete workout." });
  }
};

export {
  getWorkoutHistory,
  markWorkoutAsComplete,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
