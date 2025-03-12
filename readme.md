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

### snippetModel.ts is:

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

Status: 200 OK
I'm able to get snippets by ID. The code displayed is still messed up.

### Error message:

On snippetRoutes.ts there is an issue with getSnippetById: 'No overload matches this call.'
I don't really understand Codeium's explanation.

## DELETE /api/snippets/:id

Status: 200 OK
I'm able to delete snippets by ID.

### Error message:

Same as when getting by ID: 'No overload matches this call.'
