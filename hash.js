import client from "./client.js";

async function hashOperations() {
  // Setting multiple fields in a hash
  await client.hset(
    "user:1000",
    "name",
    "Alice",
    "age",
    "30",
    "email",
    "alice@example.com"
  );

  // Getting all fields and values in a hash
  const user = await client.hgetall("user:1000");
  console.log("User: ", user);

  // Setting a single field in a hash
  await client.hset("user:1000", "country", "Wonderland");

  // Getting the value of a specific field
  const email = await client.hget("user:1000", "email");
  console.log("Email: ", email);

  // Checking if a field exists in a hash
  const hasAge = await client.hexists("user:1000", "age");
  console.log("Does age exist?: ", hasAge ? "Yes" : "No");

  // Getting the number of fields in a hash
  const fieldCount = await client.hlen("user:1000");
  console.log("Number of fields: ", fieldCount);

  // Getting the values of all fields in a hash
  const values = await client.hvals("user:1000");
  console.log("Values: ", values);

  // Getting the keys of all fields in a hash
  const keys = await client.hkeys("user:1000");
  console.log("Keys: ", keys);

  // Incrementing the value of a field in a hash
  await client.hincrby("user:1000", "age", 1);
  const updatedAge = await client.hget("user:1000", "age");
  console.log("Updated Age: ", updatedAge);

  // Incrementing the value of a field by a float in a hash
  await client.hincrbyfloat("user:1000", "score", 10.5);
  const score = await client.hget("user:1000", "score");
  console.log("Score: ", score);

  // Deleting one or more fields from a hash
  await client.hdel("user:1000", "email", "country");
  const updatedUser = await client.hgetall("user:1000");
  console.log("Updated User: ", updatedUser);

  // Setting multiple fields in a hash if they do not exist
  await client.hsetnx("user:1000", "nickname", "WonderGirl");
  const nickname = await client.hget("user:1000", "nickname");
  console.log("Nickname: ", nickname);

  // Getting all fields and values in a hash after all operations
  const finalUser = await client.hgetall("user:1000");
  console.log("Final User: ", finalUser);
}

hashOperations();
