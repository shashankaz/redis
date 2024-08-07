import client from "./client.js";

async function streamOperations() {
  // Adding entries to a stream
  const messageId1 = await client.xadd(
    "mystream",
    "*",
    "user",
    "Alice",
    "message",
    "Hello, world!"
  );
  const messageId2 = await client.xadd(
    "mystream",
    "*",
    "user",
    "Bob",
    "message",
    "Hi, there!"
  );
  console.log("Added messages with IDs:", messageId1, messageId2);

  // Reading entries from a stream
  const messages = await client.xrange("mystream", "-", "+");
  console.log("Messages in stream:", messages);

  // Reading entries from a stream with a count limit
  const limitedMessages = await client.xrange("mystream", "-", "+", "COUNT", 1);
  console.log("Limited messages in stream:", limitedMessages);

  // Reading entries from a stream starting from a specific ID
  const messagesFromId = await client.xrange("mystream", messageId1, "+");
  console.log("Messages from specific ID in stream:", messagesFromId);

  // Creating a consumer group
  await client.xgroup("CREATE", "mystream", "mygroup", "$", { MKSTREAM: true });

  // Adding entries to a stream (new ones for consumption)
  const messageId3 = await client.xadd(
    "mystream",
    "*",
    "user",
    "Charlie",
    "message",
    "How are you?"
  );
  console.log("Added message with ID:", messageId3);

  // Reading entries from a stream for a consumer group
  const groupMessages = await client.xreadgroup(
    "GROUP",
    "mygroup",
    "consumer1",
    "STREAMS",
    "mystream",
    ">"
  );
  console.log("Messages read by consumer group:", groupMessages);

  // Acknowledging messages in a consumer group
  await client.xack("mystream", "mygroup", messageId3);
  console.log("Acknowledged message ID:", messageId3);

  // Getting pending messages for a consumer group
  const pendingMessages = await client.xpending("mystream", "mygroup");
  console.log("Pending messages:", pendingMessages);

  // Deleting entries from a stream
  await client.xdel("mystream", messageId1, messageId2);
  const messagesAfterDelete = await client.xrange("mystream", "-", "+");
  console.log("Messages after deletion:", messagesAfterDelete);
}

streamOperations();
