import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  tags: { type: [String], required: true },
  expiresAt: { type: Date, default: null },
});

export const Snippet = mongoose.model("Snippet", snippetSchema);
