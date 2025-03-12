import { Request, Response } from "express";
import { Snippet } from "../models/snippetModel";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

export const getHelloWorld = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
};

export const getSnippets = async (req: Request, res: Response) => {
  try {
    const snippets = await Snippet.find();
    res.status(200).json(snippets);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const getSnippetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    // Decode base64 encoded code
    const decodedCode = Buffer.from(snippet.code, "base64").toString("utf-8");
    res.json({
      id: snippet._id,
      title: snippet.title,
      code: decodedCode,
      language: snippet.language,
      tags: snippet.tags,
      expiresIn: snippet.expiresIn,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const addSnippet = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const snippet = await Snippet.create({ task });
    res.status(201).json(snippet);
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const updateSnippet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { task, done } = req.body;
    const snippet = await Snippet.findByIdAndUpdate(
      id,
      { task, done },
      { new: true }
    );
    res.status(200).json(snippet);
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const deleteSnippetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findByIdAndDelete(id);
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.json({ message: "Snippet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
