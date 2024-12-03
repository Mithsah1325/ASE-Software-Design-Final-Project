import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import goalRoutes from "./routes/GoalRoutes.js";  // Fix import path
import connectDB from "./config/dbConfig.js";    // Assuming you have a file for DB config
import cors from 'cors';
import cron from 'node-cron';
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

// Schedule daily email reminder
cron.schedule('0 0 * * *', async () => {
  const Goal = (await import('./models/Goal.js')).default;  // Dynamically importing Goal model
  const goals = await Goal.find({});
  goals.forEach(goal => {
    sendEmailNotification(goal.userEmail, goal.goal, goal.deadline);
  });
});

// Function to send email notifications for the cron job
const sendEmailNotification = (email, goal, deadline) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Gmail from environment variables
      pass: process.env.EMAIL_PASS,  // App password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Daily Fitness Progress',
    text: `Hi there! Here is your daily progress reminder.\n\nGoal: ${goal}\nDeadline: ${deadline}\n\nKeep up the good work!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
