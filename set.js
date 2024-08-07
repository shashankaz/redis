import client from "./client.js";

async function setOperations() {
  // Adding elements to a set
  await client.sadd("myset", "value1");
  await client.sadd("myset", "value2");
  await client.sadd("myset", "value3");
  await client.sadd("myset", "value1"); // Duplicate values are ignored

  // Getting all elements from the set
  const allElements = await client.smembers("myset");
  console.log("All Elements: ", allElements);

  // Checking if a value is a member of the set
  const isMember = await client.sismember("myset", "value2");
  console.log("Is value2 a member of myset?: ", isMember ? "Yes" : "No");

  // Getting the number of elements in the set
  const setSize = await client.scard("myset");
  console.log("Set Size: ", setSize);

  // Removing elements from the set
  await client.srem("myset", "value2");
  const elementsAfterRemoval = await client.smembers("myset");
  console.log("Elements after removal: ", elementsAfterRemoval);

  // Randomly getting an element from the set
  const randomElement = await client.srandmember("myset");
  console.log("Random Element: ", randomElement);

  // Randomly popping an element from the set
  const poppedElement = await client.spop("myset");
  console.log("Popped Element: ", poppedElement);
  const elementsAfterPop = await client.smembers("myset");
  console.log("Elements after pop: ", elementsAfterPop);

  // Performing set operations: Union, Intersection, and Difference
  await client.sadd("set1", "a", "b", "c");
  await client.sadd("set2", "c", "d", "e");

  const union = await client.sunion("set1", "set2");
  console.log("Union of set1 and set2: ", union);

  const intersection = await client.sinter("set1", "set2");
  console.log("Intersection of set1 and set2: ", intersection);

  const difference = await client.sdiff("set1", "set2");
  console.log("Difference of set1 - set2: ", difference);

  // Moving an element from one set to another
  await client.smove("set1", "set2", "a");
  const set1AfterMove = await client.smembers("set1");
  const set2AfterMove = await client.smembers("set2");
  console.log("Set1 after move: ", set1AfterMove);
  console.log("Set2 after move: ", set2AfterMove);
}

setOperations();
