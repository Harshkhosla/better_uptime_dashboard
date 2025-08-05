   //     const errorStreamData = await client.xRead(
    //       [{ key: streamErrorKey, id: "0" }],
    //       { COUNT: 100 }
    //     );

    // if (Array.isArray(errorStreamData)) {
    //     for (const stream of errorStreamData) {
    //         // @ts-ignore
    //       for (const message of stream?.messages) {
    //         console.log("Error Message:", message);
    //       }
    //     }
    //   }
import { createClient } from "redis";
import { Prismaclient } from "prisma/client";

const streamBulkKey = "bulkUpdateQueue";

async function main() {
  const client = createClient();

  client.on("error", (err) => console.error("Redis Client Error", err));
  await client.connect();

  let lastId = "0";

  try {
    while (true) {
      const bulkStreamData = await client.xRead(
        [{ key: streamBulkKey, id: lastId }],
        { COUNT: 100, BLOCK: 5000 } 
      );

      let totalMessages = 0;

      if (Array.isArray(bulkStreamData)) {
        for (const stream of bulkStreamData) {
            // @ts-ignore
          for (const message of stream.messages) {
            totalMessages++;
            lastId = message.id;
            // TODO:can save this backend computatioon start by hardcoding then updating
            const regionid = await Prismaclient.region.findFirst({
              where: {
                name: message.message.origin,
              },
              select: {
                id: true,
              },
            });

            const createddata = await Prismaclient.websiteStatus.create({
                 // @ts-ignore
              data: {
                regionId: regionid?.id,
                websiteId: message.message.id,
                //TODO: This need to be passed from the worker 
                responseTime: 500,
                statusCheck: "Up",
              },
            });

            console.log("✅ Website data saved:", createddata);
          }
        }

        if (lastId !== "0") {
             // @ts-ignore
          await client.xTrim(streamBulkKey, "MINID", lastId as string);
          console.log("🧹 Stream trimmed up to ID:", lastId);
        }

        console.log("🔁 Total messages processed:", totalMessages);
      } else {
        console.log("⏳ No new messages, waiting...");
      }
    }
  } catch (err) {
    console.error("❌ Error in stream processing:", err);
  } finally {
    await client.quit();
  }
}

main();
