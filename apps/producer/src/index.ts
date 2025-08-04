import { createClient } from "redis";
import { Prismaclient } from "prisma/client";


const INTERVAL_MS = 3 * 60 * 1000; 
const streamKey = "betterUptime:websites";
const consumerGroups = {
  usa: ["usa-1", "usa-2"],
  india: ["india-1", "india-2"],
  africa: ["africa-1", "africa-2"],
};

async function processWebsites() {

  const client = createClient();

  client.on("error", (err) => console.error("Redis Client Error", err));

  await client.connect();
   const urls = await Prismaclient.website.findMany();
   for (const groupName of Object.keys(consumerGroups)) {
    console.log(groupName)
    try {
      await client.xGroupCreate(streamKey, groupName, "$", { MKSTREAM: true });
      console.log(`Consumer group "${groupName}" created.`);
    } catch (err: any) {
      if (err?.message?.includes("BUSYGROUP")) {
        console.log(`Consumer group "${groupName}" already exists.`);
      } else {
        console.error("Error creating group:", err);
        continue;
      }
    }
  }


for(const site of urls){
  const messageId = await client.XADD(streamKey,"*",{
    url:site.url,
   d: site.id.toString(),
  })
   console.log(`Message added: ${messageId} → ${site.url}`);
}

  await client.quit();
}

processWebsites();

setInterval(processWebsites, INTERVAL_MS);