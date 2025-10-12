import { createClient } from "redis";
import nodemailer from "nodemailer";
import { Prismaclient } from "prisma/client";

const streamBulkKey = "bulkUpdateQueue";
const streamErrorKey = "errorProcessingQueue";

async function processBulkStream(
  client: ReturnType<typeof createClient>,
  lastBulkId: string,
) {
  const bulkStreamData = await client.xRead(
    [{ key: streamBulkKey, id: lastBulkId }],
    { COUNT: 100, BLOCK: 5000 },
  );

  if (Array.isArray(bulkStreamData)) {
    for (const stream of bulkStreamData) {
      // @ts-ignore
      for (const message of stream.messages) {
        lastBulkId = message.id;

        const region = await Prismaclient.region.findFirst({
          where: {
            name: message.message.origin,
          },
          select: {
            id: true,
          },
        });
        let duration = Number.isFinite(Number(message.message.duration))
          ? message.message.duration
          : 0;
        const created = await Prismaclient.websiteStatus.create({
          // @ts-ignore
          data: {
            regionId: region?.id,
            websiteId: message.message.id,
            responseTime: Number(duration),
            statusCheck: "Up",
            timestamp: new Date(),
          },
        });

        // console.log("✅ Website data saved:", created);
      }
    }

    // Trim bulk stream
    // @ts-ignore
    await client.xTrim(streamBulkKey, "MINID", lastBulkId);
    console.log("🧹 Bulk stream trimmed up to:", lastBulkId);
  } else {
    console.log("⏳ No new bulk messages.");
  }

  return lastBulkId;
}


async function triggerAction(websitedata:any,url:string){
    console.log(websitedata.ownerId,"cdkjnkjdvnskvndsjnvnsskdndskjvnsdvkndsv")

   const userdata = await Prismaclient.user.findFirst({
    where:{
      id:websitedata.ownerId
    }
   })

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Harshkhosla9945@gmail.com',
            pass: 'smos vryu mccy rhqp',
        },
    });

    const mailOptions = {
    from: `"Uptime Monitor" <Harshkhosla9945@gmail.com>`,
    to: userdata?.email,
    subject: `🚨 Alert: Your website is DOWN`,
    html: `
      <h3>Website Down Alert</h3>
      <p>Your website <b>${url}</b> is currently <span style="color: red;">DOWN</span>.</p>
      <p>Please investigate immediately.</p>
    `,
  };
   console.log(userdata,"cdkjnkjdvnskvndsjnvnsskdndskjvnsdvkndsv")
   await transporter.sendMail(mailOptions);
}

async function processErrorStream(
  client: ReturnType<typeof createClient>,
  lastErrorId: string,
) {
  const errorStreamData = await client.xRead(
    [{ key: streamErrorKey, id: lastErrorId }],
    { COUNT: 100, BLOCK: 5000 },
  );

  if (Array.isArray(errorStreamData)) {
    for (const stream of errorStreamData) {
      // @ts-ignore
      for (const message of stream.messages) {
        lastErrorId = message.id;
        const region = await Prismaclient.region.findFirst({
          where: {
            name: message.message.origin,
          },
          select: {
            id: true,
          },
        });
        let duration = Number.isFinite(Number(message.message.duration))
          ? message.message.duration
          : 0;

         
       const websiteadata =  await Prismaclient.website.update({
          where: {
            id: message?.message?.id,
          },
          data: {
            uptime: new Date(),
            incident: { increment: 1 },
            alert:"ALERT"
          },
        });
        // await triggerAction (websiteadata,websiteadata.url)
        const created = await Prismaclient.websiteStatus.create({
          // @ts-ignore
          data: {
            regionId: region?.id,
            websiteId: message.message.id,
            responseTime: Number(duration),
            statusCheck: "DOWN",
            timestamp: new Date(),
          },
        });
        // console.error("🚨 Error Message:", created);
      }
    }

    // @ts-ignore
    await client.xTrim(streamErrorKey, "MINID", lastErrorId);
    console.log("🧹 Error stream trimmed up to:", lastErrorId);
  } else {
    console.log("⏳ No new error messages.");
  }

  return lastErrorId;
}

async function main() {
  const client = createClient();
  client.on("error", (err) => console.error("Redis Client Error", err));
  await client.connect();

  let lastBulkId = "0";
  let lastErrorId = "0";

  try {
    while (true) {
      // Process bulk messages
      lastBulkId = await processBulkStream(client, lastBulkId);

      // Process error messages once per loop
      lastErrorId = await processErrorStream(client, lastErrorId);
    }
  } catch (err) {
    console.error("❌ Error in main loop:", err);
  } finally {
    await client.quit();
    await Prismaclient.$disconnect();
  }
}

main();
