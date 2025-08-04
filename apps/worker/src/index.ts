import { createClient } from "redis";

const streamKey = "betterUptime:websites";

const consumerGroups = {
  usa: ["usa-1", "usa-2"],
  india: ["india-1", "india-2"],
  africa: ["africa-1", "africa-2"],
};

async function startConsumer(client: any, groupName: string, consumer: string) {
  while (true) {
    try {
      const res = await client.xReadGroup(
        groupName,
        consumer,
        { key: streamKey, id: ">" },
        { COUNT: 1, BLOCK: 5000 }, // Wait max 5 seconds if no message
      );

      if (res) {
        for (const stream of res) {
          for (const message of stream.messages) {
            console.log(
              `📨 [${groupName}/${consumer}] Message ID:`,
              message.id,
            );
            console.log("📦 Fields:", message.message);

            // ✅ Acknowledge message
            await client.xAck(streamKey, groupName, message.id);
          }
        }
      } else {
        console.log(`🕐 [${groupName}/${consumer}] No new messages...`);
      }
    } catch (err) {
      console.error(`❌ [${groupName}/${consumer}] Error:`, err);
    }
  }
}

async function main() {
  const client = await createClient()
    .on("error", (err) => console.error("Redis Client Error", err))
    .connect();

  for (const [groupName, consumers] of Object.entries(consumerGroups)) {
    for (const consumer of consumers) {
      startConsumer(client, groupName, consumer);
    }
  }
}

main();
