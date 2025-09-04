import mongoose from "mongoose";

const conn = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://mamansiddiqui2024_db_user:aman123@cluster0.wqq3nbn.mongodb.net/todolist";
    console.log("🔗 Attempting to connect to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    // Don't throw error for Vercel deployment
    if (process.env.NODE_ENV === 'production') {
      console.log("⚠️ Continuing without MongoDB connection in production...");
    }
  }
};

export default conn;
