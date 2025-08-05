import { createClient } from "redis";

const streamKey = "betterUptime:websites";
const streamerrorkey = "errorProcessingQueue";
const streambulkkey = "bulkUpdateQueue";

const consumerGroups = {
  usa: ["usa-1", "usa-2"],
  india: ["india-1", "india-2"],
  africa: ["africa-1", "africa-2"],
};

async function pingAndProcess(message: any, client: any, originalMessage: any) {
  try {
    const res = await fetch(message.url, { method: "GET" });
    if (res.status < 400) {
      await client.xAdd(streambulkkey, "*", {
        url: message.url,
        id: message.id,
        status: res.status.toString(),
        timestamp: Date.now().toString(),
        origin: originalMessage.groupName,
      });
    } else {
      await client.xAdd(streamerrorkey, "*", {
        url: message.url,
        id: message.id,
        status: res.status.toString(),
        timestamp: Date.now().toString(),
        origin: originalMessage.groupName,
      });
    }
    console.log(res.status, "sam,pledata ");
  } catch (err) {
    await client.xAdd(streamerrorkey, "*", {
      url: message.url,
      id: message.id,
      error: (err as Error).message,
      timestamp: Date.now().toString(),
      origin: originalMessage.groupName,
    });
    console.log(err, "sample here");
  }
  await client.xAck(streamKey, originalMessage.groupName, originalMessage.id);
}
async function startConsumer(client: any, groupName: string, consumer: string) {
  while (true) {
    try {
      const res = await client.xReadGroup(
        groupName,
        consumer,
        { key: streamKey, id: ">" },
        { COUNT: 1, BLOCK: 5000 },
      );
      // ONCE WE GET THE URL FIRST PING IT AND CHECK WHAT RESPONSE IS RECIVED IF ERROR THEN SEND IT TO A PROCESSING QUEUE
      // THAT FIGURES OUT AND FOR THE OTHER WITH NO ERROR TO A QUESE FOR A BULK UPDATING AND THE ERROR FIELDS ARE ALSO
      // PROCESSED TO A DIFFERENT QUEUE SO THAT FURTHER ACTION CAN BE TAKEN PLACE
      if (res) {
        for (const stream of res) {
          for (const message of stream.messages) {
            const url = message.message.url;
            const id = message.message.id;
            console.log(
              `📨 [${groupName}/${consumer}] Message ID:`,
              message.id,
            );
            if (url) {
              await pingAndProcess({ url, id }, client, {
                groupName,
                id: message.id,
              });
              console.log("📦 Fields:", message.message);
            } else {
              // ✅ Acknowledge message
              await client.xAck(streamKey, groupName, message.id);
            }
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
