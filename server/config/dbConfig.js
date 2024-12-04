import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class DatabaseManager {
  constructor() {
    if (DatabaseManager.instance) {
      return DatabaseManager.instance;
    }

    this._connect();
    DatabaseManager.instance = this;
  }

  async _connect() {
    try {
      const mongoURI = process.env.MONGO_URI; // Use environment variable
      if (!mongoURI) {
        throw new Error("MongoDB URI is not defined in .env file");
      }

      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1); // Exit 
    }
  }
}

const databaseManagerInstance = new DatabaseManager();
export default databaseManagerInstance;
