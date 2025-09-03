import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://mamansiddiqui2024_db_user:aman123@cluster0.wqq3nbn.mongodb.net/todolist";

const conn = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

export default conn;
