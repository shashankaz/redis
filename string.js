import client from "./client.js";

async function stringOperations() {
  // Setting a string value
  await client.set("user:1", "Alice");
  await client.set("user:2", "Bob");

  // Getting a string value
  const user1 = await client.get("user:1");
  console.log("User 1: ", user1); // Output: Alice

  // Setting a string value with an expiration time (in seconds)
  await client.set("user:3", "Charlie", "EX", 10); // Expires after 10 seconds

  // Getting the remaining time to live of a key
  const ttl = await client.ttl("user:3");
  console.log("TTL of user:3: ", ttl); // Output: Time to live in seconds

  // Incrementing a value
  await client.set("counter", 0);
  await client.incr("counter");
  await client.incrby("counter", 5);
  const counter = await client.get("counter");
  console.log("Counter: ", counter); // Output: 6

  // Decrementing a value
  await client.decr("counter");
  await client.decrby("counter", 2);
  const updatedCounter = await client.get("counter");
  console.log("Updated Counter: ", updatedCounter); // Output: 3

  // Appending to a string
  await client.append("user:1", " - Senior Developer");
  const updatedUser1 = await client.get("user:1");
  console.log("Updated User 1: ", updatedUser1); // Output: Alice - Senior Developer

  // Getting a substring
  const substring = await client.getrange("user:1", 0, 4); // Gets the substring from index 0 to 4
  console.log("Substring of User 1: ", substring); // Output: Alice

  // Setting a substring
  await client.setrange("user:1", 6, "Lead Developer");
  const finalUser1 = await client.get("user:1");
  console.log("Final User 1: ", finalUser1); // Output: Alice Lead Developer

  // Checking the existence of a key
  const exists = await client.exists("user:1");
  console.log("Does user:1 exist?: ", exists ? "Yes" : "No"); // Output: Yes

  // Deleting a key
  await client.del("user:1");
  const existsAfterDelete = await client.exists("user:1");
  console.log(
    "Does user:1 exist after delete?: ",
    existsAfterDelete ? "Yes" : "No"
  ); // Output: No
}

stringOperations();
