import { createClient } from "redis";

async function main() {
  const client = await createClient()
    .on("error", (err) => console.error("Redis Client Error", err))
    .connect();


  const streamKey = "betterUptime:websites";
  const groupName = "usa"; 
  const consumerName = "usa-2"; 

  const res = await client.xReadGroup(
    groupName,         // group
    consumerName,       // consumer
    {
      key: streamKey,
      id: ">",       // only new messages
    },
    {
      COUNT: 2
    }
  ); 

  if (res) {
    // @ts-ignore
    for (const stream of res) {
      for (const message of stream.messages) {
        console.log("Message ID:", message.id);
        console.log("Message Fields:", message.message);
      } 
    }
  } else {
    console.log("No new messages");
  }

  await client.quit();
}

main();
