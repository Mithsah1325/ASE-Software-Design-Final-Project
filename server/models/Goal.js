import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true,
  },
  deadline: {
    type: String, 
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
