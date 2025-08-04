import { createClient } from "redis";

async function main() {
  const client = createClient();

  client.on("error", (err) => console.error("Redis Client Error", err));

  await client.connect();

  const streamKey = "betterUptime:websites";
  const groupName = "usa";
  const consumerName = "usa-1";



  try {
    await client.xGroupCreate(streamKey, groupName, "$", { MKSTREAM: true });
    console.log(`Consumer group "${groupName}" created.`);
  } catch (err: any) {
    if (err?.message?.includes("BUSYGROUP")) {
      console.log(`Consumer group "${groupName}" already exists.`);
    } else {
      console.error("Error creating group:", err);
      await client.quit();
      return;
    }
  }

    const messageId = await client.xAdd(streamKey, "*", {
    url: "https://google.com",
    id: "1",
  });
    const messageId2 = await client.xAdd(streamKey, "*", {
    url: "https://redis.io",
    id: "2",
  });
    const messageId3 = await client.xAdd(streamKey, "*", {
    url: "https://www.npmjs.com",
    id: "3",
  });
  console.log("Message added:", messageId);
  await client.quit();
}

main();
