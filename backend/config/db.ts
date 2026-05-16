import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI is missing in environment variables");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri,{
      dbName:"service-board",
    });
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}