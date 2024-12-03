import mongoose from "mongoose";

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
      await mongoose.connect(
        "mongodb+srv://mithsah1325:mithsah1325@cluster0.jeqai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        { useNewUrlParser: true, useUnifiedTopology: true } // Optional config
      );
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      process.exit(1);
    }
  }
}

const databaseManagerInstance = new DatabaseManager();
export default databaseManagerInstance;
