// config/dbConfig.js
import mongoose from "mongoose";

let isConnected = false; // Track connection state

const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    await mongoose.connect(
      "mongodb+srv://mithsah1325:mithsah1325@cluster0.jeqai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    );
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
