import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fitnessGoal: { type: String, required: true },
  date: { type: Date, required: true },
});

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;
