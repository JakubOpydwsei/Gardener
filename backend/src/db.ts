import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI in .env");

  mongoose.set("strictQuery", true);

  mongoose.connection.on("connected", () => console.log("[db] connected"));
  mongoose.connection.on("error", (err) => console.error("[db] error:", err));

  await mongoose.connect(uri);
}