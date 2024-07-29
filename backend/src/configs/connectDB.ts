import mongoose from "mongoose";

export const connectDB = async () => {
  const uri: any = process.env.MONGO_URI;

  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB."))
    .catch((error) => {
      console.error("MongoDB connection error :", error);
    });
};
