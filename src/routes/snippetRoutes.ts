import express from "express";
import {
  addSnippet,
  deleteSnippetById,
  // getHelloWorld,
  getSnippetById,
  getSnippets,
  updateSnippet,
} from "../controllers/snippetController";

const router = express.Router();

router
  // .get("/test", getHelloWorld)
  .get("/snippets", getSnippets)
  .post("/snippets", addSnippet)
  .get("/snippets/:id", getSnippetById)
  .put("/snippets/:id", updateSnippet)
  .delete("/snippets/:id", deleteSnippetById);

export default router;
