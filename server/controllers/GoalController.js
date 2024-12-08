import Goal from '../models/Goal.js';

// Create a new goal
export const saveGoal = async (req, res) => {
  try {
    const { email, fitnessGoal, date } = req.body;
    const newGoal = new Goal({ email, fitnessGoal, date });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    console.error("Error saving goal:", err);
    res.status(500).json({ message: "Error saving goal" });
  }
};

// Get all goals
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (err) {
    console.error("Error fetching goals:", err);
    res.status(500).json({ message: "Error fetching goals" });
  }
};

// Get goal by ID
export const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).json({ message: "Error fetching goal" });
  }
};

// Update goal by ID
export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).json({ message: "Error updating goal" });
  }
};

// Delete goal by ID
export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.status(200).json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting goal" });
  }
};
