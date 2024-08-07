import client from "./client.js";

async function sortedSetOperations() {
  // Adding elements to a sorted set
  await client.zadd("mysortedset", 1, "value1");
  await client.zadd("mysortedset", 2, "value2");
  await client.zadd("mysortedset", 3, "value3");

  // Getting all elements from the sorted set with their scores
  const allElements = await client.zrange("mysortedset", 0, -1, "WITHSCORES");
  console.log("All Elements: ", allElements);

  // Getting the number of elements in the sorted set
  const setSize = await client.zcard("mysortedset");
  console.log("Set Size: ", setSize);

  // Getting the score of a specific element
  const score = await client.zscore("mysortedset", "value2");
  console.log("Score of value2: ", score);

  // Incrementing the score of an element
  await client.zincrby("mysortedset", 2, "value2");
  const updatedScore = await client.zscore("mysortedset", "value2");
  console.log("Updated Score of value2: ", updatedScore);

  // Getting elements by score range
  const elementsByScore = await client.zrangebyscore("mysortedset", 1, 3);
  console.log("Elements by Score Range (1-3): ", elementsByScore);

  // Getting elements by rank range
  const elementsByRank = await client.zrange("mysortedset", 0, 1);
  console.log("Elements by Rank Range (0-1): ", elementsByRank);

  // Removing elements from the sorted set
  await client.zrem("mysortedset", "value2");
  const elementsAfterRemoval = await client.zrange("mysortedset", 0, -1);
  console.log("Elements after removal: ", elementsAfterRemoval);

  // Getting the rank of an element
  const rank = await client.zrank("mysortedset", "value1");
  console.log("Rank of value1: ", rank);

  // Removing elements by score range
  await client.zremrangebyscore("mysortedset", 1, 2);
  const elementsAfterScoreRangeRemoval = await client.zrange(
    "mysortedset",
    0,
    -1
  );
  console.log(
    "Elements after Score Range Removal (1-2): ",
    elementsAfterScoreRangeRemoval
  );

  // Removing elements by rank range
  await client.zremrangebyrank("mysortedset", 0, 0);
  const elementsAfterRankRangeRemoval = await client.zrange(
    "mysortedset",
    0,
    -1
  );
  console.log(
    "Elements after Rank Range Removal (0-0): ",
    elementsAfterRankRangeRemoval
  );

  // Performing set operations: Union and Intersection
  await client.zadd("sortedset1", 1, "a", 2, "b", 3, "c");
  await client.zadd("sortedset2", 2, "c", 3, "d", 4, "e");

  const union = await client.zunionstore(
    "unionset",
    2,
    "sortedset1",
    "sortedset2"
  );
  const unionElements = await client.zrange("unionset", 0, -1, "WITHSCORES");
  console.log("Union of sortedset1 and sortedset2: ", unionElements);

  const intersection = await client.zinterstore(
    "interset",
    2,
    "sortedset1",
    "sortedset2"
  );
  const intersectionElements = await client.zrange(
    "interset",
    0,
    -1,
    "WITHSCORES"
  );
  console.log(
    "Intersection of sortedset1 and sortedset2: ",
    intersectionElements
  );
}

sortedSetOperations();
