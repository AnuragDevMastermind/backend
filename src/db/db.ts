import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const MONGO_URL = `${process.env.MONGO_URI}`;
export const connectDB = () => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(MONGO_URL);
};