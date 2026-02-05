import { Prismaclient } from "prisma/client";

async function checkWebsites() {
  console.log("🔍 Checking all websites in database...\n");

  const websites = await Prismaclient.website.findMany({
    include: {
      notificationPref: true,
      websiteStatus: {
        orderBy: {
          timestamp: "desc",
        },
        take: 1,
      },
    },
  });

  console.log(`📊 Found ${websites.length} websites:\n`);

  for (const site of websites) {
    const latestStatus = site.websiteStatus[0];
    const status = latestStatus?.statusCheck || "UNKNOWN";
    const statusIcon = status === "Up" ? "✅" : "❌";
    
    console.log(`${statusIcon} ${site.url}`);
    console.log(`   ID: ${site.id}`);
    console.log(`   Owner ID: ${site.ownerId}`);
    console.log(`   Status: ${status}`);
    console.log(`   Incidents: ${site.incident || 0}`);
    console.log(`   Alert: ${site.alert || "None"}`);
    console.log(`   Email Notifications: ${site.notificationPref?.notifyEmail ? "✅ Enabled" : "❌ Disabled"}`);
    console.log("");
  }

  // Check users
  const users = await Prismaclient.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  console.log("👥 Users in database:");
  users.forEach((user) => {
    console.log(`   ${user.email} (${user.name || "No name"})`);
  });

  await Prismaclient.$disconnect();
}

checkWebsites();
