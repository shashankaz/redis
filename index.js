import express from "express";
import { fetchPosts } from "./app.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const posts = await fetchPosts();
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
