import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import goalRoutes from "./routes/GoalRoutes.js";  // Fix import path
import connectDB from "./config/dbConfig.js";    // Assuming you have a file for DB config
import cors from 'cors';
import dotenv from 'dotenv'; // Load environment variables
import workoutRoutes from './routes/workoutRoutes.js'


dotenv.config(); // Initialize dotenv to use environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // to parse JSON bodies
app.use(express.json());


// Use goal routes
app.use("/api/goals", goalRoutes);  // Corrected the path to match API structure

// Routes
app.use("/api/workouts", workoutRoutes);



// Connect to MongoDB
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



