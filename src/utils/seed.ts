import mongoose from "mongoose";
import { Snippet } from "../models/snippetModel";
import { data } from "./data";
import { MONGO_URI } from "../config/env";

const seedSnippets = async () => {
  try {
    await mongoose.connect(MONGO_URI! as string);
    await Snippet.deleteMany();
    await Snippet.insertMany(data);
    console.log("Seeding snippets completed successfully! 🌱");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await mongoose.connection.close();
  }
};

await seedSnippets();
