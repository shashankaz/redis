import client from "./client.js";

async function listOperations() {
  // Adding elements to the list
  await client.lpush("mylist", "value1"); // Pushes value1 to the head of the list
  await client.lpush("mylist", "value2"); // Pushes value2 to the head of the list
  await client.rpush("mylist", "value3"); // Pushes value3 to the tail of the list

  // Retrieving elements from the list
  const allElements = await client.lrange("mylist", 0, -1); // Retrieves all elements from the list
  console.log("All Elements: ", allElements);

  // Getting the length of the list
  const listLength = await client.llen("mylist");
  console.log("List Length: ", listLength);

  // Popping elements from the list
  const headElement = await client.lpop("mylist"); // Removes and returns the first element
  console.log("Popped Head Element: ", headElement);

  const tailElement = await client.rpop("mylist"); // Removes and returns the last element
  console.log("Popped Tail Element: ", tailElement);

  // Indexing into the list
  const secondElement = await client.lindex("mylist", 1); // Gets the element at index 1
  console.log("Second Element: ", secondElement);

  // Inserting elements before or after a pivot
  await client.linsert("mylist", "BEFORE", "value3", "newValue"); // Inserts newValue before value3
  const updatedList = await client.lrange("mylist", 0, -1);
  console.log("Updated List after insertion: ", updatedList);

  // Trimming the list
  await client.ltrim("mylist", 0, 1); // Trims the list to only keep the first two elements
  const trimmedList = await client.lrange("mylist", 0, -1);
  console.log("Trimmed List: ", trimmedList);

  // Setting a value at a specific index
  await client.lset("mylist", 0, "updatedValue"); // Sets the first element to updatedValue
  const listAfterSet = await client.lrange("mylist", 0, -1);
  console.log("List after setting a value: ", listAfterSet);

  // Removing elements from the list
  await client.lrem("mylist", 1, "updatedValue"); // Removes the first occurrence of updatedValue
  const finalList = await client.lrange("mylist", 0, -1);
  console.log("Final List after removal: ", finalList);

  // Blocking pop from the head of the list
  // Here, we're simulating a blocking operation. We'll set a timeout to add an element to the list to unblock it.
  setTimeout(async () => {
    await client.lpush("mylist", "blockingValue");
  }, 3000); // Add an element after 3 seconds

  const blockedElement = await client.blpop("mylist", 5); // Blocks for 5 seconds or until an element is available
  console.log("Blocked Element: ", blockedElement);
}

listOperations();
