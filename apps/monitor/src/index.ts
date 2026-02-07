import { createClient } from "redis";
import nodemailer from "nodemailer";
import { Prismaclient } from "prisma/client";
import axios from "axios";
import { IncidentAnalysisService } from "./incidentAnalysis";

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

        // Check if the website exists before creating WebsiteStatus
        const website = await Prismaclient.website.findFirst({
          where: {
            id: message.message.id,
          },
          select: {
            id: true,
            uptime: true,
            url: true,
          },
        });

        if (!website) {
          console.log(
            `⚠️ Website with id ${message.message.id} not found, skipping...`,
          );
          continue;
        }

        if (!region) {
          console.log(
            `⚠️ Region with name ${message.message.origin} not found, skipping...`,
          );
          continue;
        }

        // Set uptime if this is the first time website is UP (uptime is null)
        // This means the website just recovered from being DOWN
        const wasDown = !website.uptime;
        if (wasDown) {
          await Prismaclient.website.update({
            where: { id: message.message.id },
            data: { uptime: new Date() },
          });
          console.log(`🟢 Website came UP, uptime started: ${message.message.url}`);
          
          // Resolve any active incidents
          const activeIncident = await Prismaclient.incident.findFirst({
            where: {
              websiteId: message.message.id,
              status: "ACTIVE",
            },
            orderBy: { startedAt: 'desc' },
          });

          if (activeIncident) {
            const duration = Math.floor((Date.now() - activeIncident.startedAt.getTime()) / 1000);
            await Prismaclient.incident.update({
              where: { id: activeIncident.id },
              data: {
                resolvedAt: new Date(),
                duration,
                status: "RESOLVED",
              },
            });

            // Add timeline event for resolution
            await Prismaclient.incidentTimeline.create({
              data: {
                incidentId: activeIncident.id,
                eventType: "RESOLVED",
                description: `Website ${website.url} is back online`,
                metadata: { duration, region: message.message.origin },
              },
            });

            console.log(`✅ Resolved incident #${activeIncident.incidentNumber} after ${duration}s`);
          }
          
          // Send recovery email notification
          await triggerRecoveryEmail(message.message.id, message.message.url || website.url);
        }

        let duration = Number.isFinite(Number(message.message.duration))
          ? message.message.duration
          : 0;
        const created = await Prismaclient.websiteStatus.create({
          data: {
            regionId: region.id,
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

async function triggerAction(websitedata: any, url: string, incident?: any, analysis?: any) {
  console.log(`🔔 Triggering notifications for website: ${url}`);

  const userdata = await Prismaclient.user.findFirst({
    where: {
      id: websitedata.ownerId,
    },
  });

  if (!userdata?.email) {
    console.log("⚠️ No user email found, skipping notification");
    return;
  }

  // Check if notifications are enabled for this website
  const website = await Prismaclient.website.findFirst({
    where: {
      id: websitedata.id,
    },
    include: {
      notificationPref: true,
      owner: true,
    },
  });

  // Trigger webhook if configured
  if (website?.owner && website.owner.webhookUrl) {
    await triggerWebhook(website.owner.webhookUrl, {
      event: 'website.down',
      website: {
        id: websitedata.id,
        url: url,
        incident: websitedata.incident,
        timestamp: new Date().toISOString(),
      },
      incidentDetails: incident ? {
        id: incident.id,
        number: incident.incidentNumber,
        severity: incident.severity,
        errorType: incident.errorType,
      } : undefined,
      analysis: analysis ? {
        rootCause: analysis.rootCause,
        impactSummary: analysis.impactSummary,
        recommendations: analysis.recommendations,
        preventionTips: analysis.preventionTips,
      } : undefined,
      user: {
        id: userdata.id,
        email: userdata.email,
        name: userdata.name,
      }
    });
  }

  if (website?.notificationPref && !website.notificationPref.notifyEmail) {
    console.log("📧 Email notifications disabled for this website");
    return;
  }

  // Rate limiting: Check if last email was sent less than 5 minutes ago
  if (website?.lastEmailSentAt) {
    const timeSinceLastEmail = Date.now() - website.lastEmailSentAt.getTime();
    const fiveMinutesInMs = 5 * 60 * 1000; // 5 minutes in milliseconds

    if (timeSinceLastEmail < fiveMinutesInMs) {
      const remainingTime = Math.ceil((fiveMinutesInMs - timeSinceLastEmail) / 1000 / 60);
      console.log(`⏳ Rate limit: Last email sent ${Math.floor(timeSinceLastEmail / 1000 / 60)} minutes ago. Next email in ${remainingTime} minutes.`);
      return;
    }
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Harshkhosla9945@gmail.com",
      pass: "iqby twxq smrt jxtp",
    },
  });

  const mailOptions = {
    from: `"Uptime Monitor" <Harshkhosla9945@gmail.com>`,
    to: userdata.email,
    subject: `🚨 Alert: Your website ${url} is DOWN`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #dc2626; color: white; padding: 20px; border-radius: 5px; }
            .content { background-color: #f9fafb; padding: 20px; margin-top: 20px; border-radius: 5px; }
            .footer { margin-top: 20px; font-size: 12px; color: #6b7280; }
            .status { font-weight: bold; color: #dc2626; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🚨 Website Down Alert</h2>
            </div>
            <div class="content">
              <p>Hello ${userdata.name || "User"},</p>
              <p>Your monitored website is currently experiencing downtime:</p>
              <p><strong>URL:</strong> <a href="${url}">${url}</a></p>
              <p><strong>Status:</strong> <span class="status">DOWN</span></p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Total Incidents:</strong> ${websitedata.incident || 0}</p>
              <hr>
              <p>Please investigate immediately to restore service.</p>
            </div>
            <div class="footer">
              <p>This is an automated notification from Better Uptime Dashboard.</p>
              <p>You're receiving this because you have email notifications enabled for this website.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email notification sent to ${userdata.email}`);
    
    // Update lastEmailSentAt timestamp
    await Prismaclient.website.update({
      where: { id: websitedata.id },
      data: { lastEmailSentAt: new Date() },
    });
    console.log(`📝 Updated lastEmailSentAt for website: ${url}`);
  } catch (error) {
    console.error(`❌ Failed to send email notification:`, error);
  }
}

async function triggerWebhook(webhookUrl: string, payload: any) {
  console.log(`🪝 Triggering webhook: ${webhookUrl}`);
  try {
    const response = await axios.post(webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000, // 5 second timeout
    });
    console.log(`✅ Webhook triggered successfully: ${response.status}`);
  } catch (error: any) {
    console.error(`❌ Failed to trigger webhook: ${error.message}`);
  }
}

async function triggerRecoveryEmail(websiteId: string, url: string) {
  console.log(`🟢 Triggering recovery notifications for website: ${url}`);

  const website = await Prismaclient.website.findFirst({
    where: { id: websiteId },
    include: {
      notificationPref: true,
      owner: true,
    },
  });

  if (!website?.owner?.email) {
    console.log("⚠️ No user email found, skipping notification");
    return;
  }

  // Trigger recovery webhook if configured
  if (website?.owner && website.owner.webhookUrl) {
    await triggerWebhook(website.owner.webhookUrl, {
      event: 'website.up',
      website: {
        id: websiteId,
        url: url,
        incident: website.incident || 0,
        timestamp: new Date().toISOString(),
        uptime: website.uptime,
      },
      user: {
        id: website.owner.id,
        email: website.owner.email,
        name: website.owner.name,
      }
    });
  }

  if (website?.notificationPref && !website.notificationPref.notifyEmail) {
    console.log("📧 Email notifications disabled for this website");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Harshkhosla9945@gmail.com",
      pass: "iqby twxq smrt jxtp",
    },
  });

  const mailOptions = {
    from: `"Uptime Monitor" <Harshkhosla9945@gmail.com>`,
    to: website.owner.email,
    subject: `✅ Good News: Your website ${url} is back UP`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #16a34a; color: white; padding: 20px; border-radius: 5px; }
            .content { background-color: #f0fdf4; padding: 20px; margin-top: 20px; border-radius: 5px; border: 1px solid #86efac; }
            .footer { margin-top: 20px; font-size: 12px; color: #6b7280; }
            .status { font-weight: bold; color: #16a34a; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>✅ Website Recovered</h2>
            </div>
            <div class="content">
              <p>Hello ${website.owner.name || "User"},</p>
              <p>Great news! Your website is back online and responding normally:</p>
              <p><strong>URL:</strong> <a href="${url}">${url}</a></p>
              <p><strong>Status:</strong> <span class="status">UP</span></p>
              <p><strong>Recovered at:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Total Incidents:</strong> ${website.incident || 0}</p>
              <hr>
              <p>Your website is now operational. Monitoring continues as usual.</p>
            </div>
            <div class="footer">
              <p>This is an automated notification from Better Uptime Dashboard.</p>
              <p>You're receiving this because you have email notifications enabled for this website.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Recovery email sent to ${website.owner.email}`);
  } catch (error) {
    console.error(`❌ Failed to send recovery email:`, error);
  }
}

async function processErrorStream(
  client: ReturnType<typeof createClient>,
  lastErrorId: string,
) {
  console.log(`🔍 Checking error stream from ID: ${lastErrorId}`);
  
  const errorStreamData = await client.xRead(
    [{ key: streamErrorKey, id: lastErrorId }],
    { COUNT: 100, BLOCK: 5000 },
  );

  if (Array.isArray(errorStreamData)) {
    // @ts-ignore - Redis stream type complexity
    const messageCount = errorStreamData[0]?.messages?.length || 0;
    console.log(`📨 Found ${messageCount} error messages`);
    for (const stream of errorStreamData) {
      // @ts-ignore
      for (const message of stream.messages) {
        lastErrorId = message.id;
        console.log(`🚨 Processing error for: ${message.message.url} (ID: ${message.message.id})`);
        
        const region = await Prismaclient.region.findFirst({
          where: {
            name: message.message.origin,
          },
          select: {
            id: true,
          },
        });

        // Check if the website exists before updating/creating records
        const website = await Prismaclient.website.findFirst({
          where: {
            id: message?.message?.id,
          },
          select: {
            id: true,
            url: true,
            ownerId: true,
          },
        });

        if (!website) {
          console.log(
            `⚠️ Website with id ${message?.message?.id} not found, skipping...`,
          );
          continue;
        }

        if (!region) {
          console.log(
            `⚠️ Region with name ${message.message.origin} not found, skipping...`,
          );
          continue;
        }

        let duration = Number.isFinite(Number(message.message.duration))
          ? message.message.duration
          : 0;

        // When website goes DOWN, clear uptime (reset uptime counter)
        const websiteadata = await Prismaclient.website.update({
          where: {
            id: message?.message?.id,
          },
          data: {
            uptime: null, // Reset uptime when website goes DOWN
            incident: { increment: 1 },
            alert: "ALERT",
          },
        });
        console.log(`🔴 Website went DOWN, uptime reset: ${websiteadata.url}`);
        
        // Create a new incident record
        const incidentNumber = (websiteadata.incident || 0);
        const incident = await Prismaclient.incident.create({
          data: {
            websiteId: message.message.id,
            incidentNumber,
            startedAt: new Date(),
            severity: "MAJOR",
            status: "ACTIVE",
            errorType: "timeout", // You can determine this from error message
            errorMessage: message.message.error || "Website is not responding",
            affectedRegions: [message.message.origin],
          },
        });
        console.log(`🚨 Created incident #${incidentNumber} for ${websiteadata.url}`);

        // Add timeline event for incident start
        await Prismaclient.incidentTimeline.create({
          data: {
            incidentId: incident.id,
            eventType: "STARTED",
            description: `Website ${websiteadata.url} went down`,
            metadata: { region: message.message.origin },
          },
        });

        // Trigger AI analysis
        const recentStatuses = await Prismaclient.websiteStatus.findMany({
          where: { websiteId: message.message.id },
          orderBy: { timestamp: 'desc' },
          take: 50,
        });

        const historicalIncidents = await Prismaclient.incident.findMany({
          where: { 
            websiteId: message.message.id,
            id: { not: incident.id } // Exclude current incident
          },
        });

        console.log(`🤖 Triggering AI analysis for incident #${incidentNumber}`);
        const analysis = await IncidentAnalysisService.analyzeIncident(incident.id, {
          url: websiteadata.url,
          errorType: "timeout",
          errorMessage: message.message.error,
          responseTime: duration,
          affectedRegions: [message.message.origin],
          recentStatuses,
          historicalIncidents,
        });
        console.log(`✅ AI analysis completed for incident #${incidentNumber}`);
        
        console.log(`📧 Sending email for: ${websiteadata.url}`);
        await triggerAction(websiteadata, websiteadata.url, incident, analysis);
        const created = await Prismaclient.websiteStatus.create({
          data: {
            regionId: region.id,
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
