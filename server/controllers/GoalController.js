// controllers/goalController.js
import Goal from "../models/Goal.js";  // Assuming you have a Goal model for storing goals

// Save a goal
export const saveGoal = async (req, res) => {
  const { goal, deadline, email } = req.body;
  
  try {
    const newGoal = new Goal({
      goal,
      deadline,
      email
    });
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    console.error("Error saving goal:", error);
    res.status(500).json({ message: "Error saving goal" });
  }
};

// Get goal by email
export const getGoalByEmail = async (req, res) => {
  const { email } = req.query;
  
  try {
    const goal = await Goal.findOne({ email });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found for this email" });
    }
    res.status(200).json(goal);
  } catch (error) {
    console.error("Error fetching goal:", error);
    res.status(500).json({ message: "Error fetching goal" });
  }
};
