# Felipe's Node.js examen

Hey **Jorne**! Here is my miserable attempt at making sense of what I've learned.

## GET /api/snippets

Status: 200 OK
I am currently able to fetch data manually input into the database through MongoDB Compass.

## POST /api/snippets

Status: 400 Bad Request

### Error message:

{
"message": "Snippet validation failed: language: Path `language` is required., code: Path `code` is required., title: Path `title` is required."
}

### exampleModel.ts is:

import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
title: { type: String, required: true },
code: { type: String, required: true },
language: { type: String, required: true },
tags: { type: [String], required: true },
expiresIn: { type: Date, default: null },
});

export const Snippet = mongoose.model("Snippet", snippetSchema);

## GET /api/snippets/:id

Status: 404 Not Found

### Error message:

{
"message": "The requested endpoint doesn't exist.",
"method": "GET",
"endpoint": "/api/snippets/67d159aeeba84740a81fa674"
}
