import { createClient } from "redis";
import { Prismaclient } from "prisma/client";

const CHECK_FREQUENCY_MS = 1 * 60 * 1000; // Check every 1 minute to handle websites with different intervals
const streamKey = "betterUptime:websites";
const consumerGroups = {
  usa: ["usa-1", "usa-2"],
  india: ["india-1", "india-2"],
  africa: ["africa-1", "africa-2"],
};

// Track last check time for each website
const lastCheckTimes = new Map<string, number>();

async function processWebsites() {
  const client = createClient();

  client.on("error", (err) => console.error("Redis Client Error", err));

  await client.connect();
  for (const groupName of Object.keys(consumerGroups)) {
    console.log(groupName);
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

  const websites = await Prismaclient.website.findMany();
  const now = Date.now();
  
  for (const site of websites) {
    const lastCheck = lastCheckTimes.get(site.id) || 0;
    const checkIntervalMs = (site.checkInterval || 5) * 60 * 1000; // Convert minutes to milliseconds
    
    // Only add to stream if enough time has passed since last check
    if (now - lastCheck >= checkIntervalMs) {
      const messageId = await client.XADD(streamKey, "*", {
        url: site.url,
        id: site.id.toString(),
      });
      console.log(`✅ Message added: ${messageId} → ${site.url} (interval: ${site.checkInterval || 5} min)`);
      lastCheckTimes.set(site.id, now);
    } else {
      const remainingTime = Math.ceil((checkIntervalMs - (now - lastCheck)) / 1000 / 60);
      console.log(`⏭️  Skipping ${site.url} (next check in ${remainingTime} min)`);
    }
  }

  await client.quit();
}

processWebsites();

setInterval(processWebsites, CHECK_FREQUENCY_MS);
