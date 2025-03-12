// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";
import testRoutes from "./routes/snippetRoutes";
import { helloMiddleware } from "./middleware/snippetMiddleware";
import mongoose from "mongoose";
import connectToDb from "./config/database";
// import { Snippet } from "./models/snippetModel";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));

// TODO

// app.get("/", helloMiddleware, async (req, res) => {
//   const snippets = await Snippet.find();
//   res.render("index", {
//     title: "Snippets Database",
//     snippets,
//   });
// });

// Routes
app.use("/api", helloMiddleware, testRoutes);
// app.use("/api/snippets", snippetRoutes);
app.all("*", notFound);

// Database connection
try {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("Database connection OK");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// Server Listening
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
  await connectToDb();
});
