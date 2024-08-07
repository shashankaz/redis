import axios from "axios";
import redis from "./client.js";

const JSONPLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchPosts() {
  try {
    const cachedPosts = await redis.get("posts");

    if (cachedPosts) {
      console.log("Retrieved posts from Redis");
      return JSON.parse(cachedPosts);
    } else {
      const response = await axios.get(JSONPLACEHOLDER_URL);
      const posts = response.data;

      await redis.set("posts", JSON.stringify(posts), "EX", 3600);
      console.log("Fetched posts from JSONPlaceholder and stored in Redis");
      return posts;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
