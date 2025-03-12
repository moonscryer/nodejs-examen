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
    const decodedSnippets = snippets.map((snippet) => ({
      id: snippet._id,
      title: snippet.title,
      code: Buffer.from(snippet.code, "base64").toString("utf-8"),
      language: snippet.language,
      tags: snippet.tags,
      expiresIn: snippet.expiresIn,
    }));
    res.status(200).json(decodedSnippets);
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
    const { title, code, language, tags, expiresIn } = req.body;
    if (!title || !code || !language || !tags) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const encodedCode = Buffer.from(code).toString("base64");
    const snippetData = {
      title,
      code: encodedCode,
      language,
      tags,
      expiresIn: expiresIn ? new Date(Date.now() + expiresIn * 1000) : null,
    };
    const snippet = new Snippet(snippetData);
    await snippet.save();

    res.status(201).json({ id: snippet._id, ...snippetData });
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
    const { title, code, language, tags, expiresIn } = req.body;

    if (!title || !code || !language || !tags) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Encode code to avoid issues with double quotes
    const encodedCode = Buffer.from(code).toString("base64");

    const updatedSnippet = await Snippet.findByIdAndUpdate(
      id,
      {
        title,
        code: encodedCode,
        language,
        tags,
        expiresIn: expiresIn ? new Date(Date.now() + expiresIn * 1000) : null,
      },
      { new: true }
    );

    if (!updatedSnippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.json({
      id: updatedSnippet._id,
      title: updatedSnippet.title,
      code: Buffer.from(updatedSnippet.code, "base64").toString("utf-8"),
      language: updatedSnippet.language,
      tags: updatedSnippet.tags,
      expiresIn: updatedSnippet.expiresIn,
    });
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
