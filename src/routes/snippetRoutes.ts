import express from "express";
import {
  addSnippet,
  getHelloWorld,
  getSnippets,
  updateSnippet,
} from "../controllers/snippetController";

const router = express.Router();

router
  .get("/test", getHelloWorld)
  .get("/snippets", getSnippets)
  .post("/snippets", addSnippet)
  .patch("/snippets/:id", updateSnippet);

export default router;
