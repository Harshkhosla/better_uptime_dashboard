// packages/db/prisma/seed.ts

import { faker } from "@faker-js/faker";
import { Prismaclient } from "../src";
import bcrypt from "bcryptjs";

const prisma = Prismaclient;

async function main() {
  console.log("🌱 Starting seed...\n");

  // Clear existing data
  // console.log("🗑️  Clearing existing data...");
  // await prisma.websiteStatus.deleteMany();
  // await prisma.website.deleteMany();
  // await prisma.userDetails.deleteMany();
  // await prisma.userDemoGraph.deleteMany();
  // await prisma.notificationPreference.deleteMany();
  // await prisma.user.deleteMany();
  // await prisma.region.deleteMany();
  // console.log("✓ Cleared all data\n");

  // Create Regions (matching worker consumer groups)
  console.log("📍 Creating regions...");
  const usa = await prisma.region.create({
    data: { name: "usa" },
  });
  const india = await prisma.region.create({
    data: { name: "india" },
  });
  const africa = await prisma.region.create({
    data: { name: "africa" },
  });
  console.log("✓ Created 3 regions\n");

  // Create Notification Preferences
  console.log("🔔 Creating notification preferences...");
  const notifPref1 = await prisma.notificationPreference.create({
    data: {
      notifyCall: true,
      notifyEmail: true,
      notifySMS: false,
      notifyPush: true,
    },
  });
  const notifPref2 = await prisma.notificationPreference.create({
    data: {
      notifyCall: false,
      notifyEmail: true,
      notifySMS: true,
      notifyPush: false,
    },
  });
  console.log("✓ Created 2 notification preferences\n");

  // Create Users
  console.log("👥 Creating users...");
  const hashedPassword = await bcrypt.hash("password123", 10);
  const harshPassword = await bcrypt.hash("1234", 10);
  
  const user1 = await prisma.user.create({
    data: {
      email: "harshkhosla9945@gmail.com",
      name: "Admin User",
      password: hashedPassword,
      regionIds: [usa.id, india.id],
      userDetailsFilled: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      name: "John Doe",
      password: hashedPassword,
      regionIds: [africa.id],
      userDetailsFilled: false,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "jane.smith@example.com",
      name: "Jane Smith",
      password: hashedPassword,
      regionIds: [india.id],
      userDetailsFilled: true,
    },
  });

  const user4 = await prisma.user.create({
    data: {
      email: "harshkhosl9945@gmail.com",
      name: "Harsh Khosla",
      password: harshPassword,
      regionIds: [usa.id, africa.id],
      userDetailsFilled: true,
    },
  });

  console.log("✓ Created 4 users\n");

  // Create Websites for User 1
  console.log("🌐 Creating websites...");
  const websites = [
    { url: "https://google.com", status: "Up" as const, checkInterval: 5 },
    { url: "https://github.com", status: "Up" as const, checkInterval: 3 },
    { url: "https://stackoverflow.com", status: "Up" as const, checkInterval: 10 },
    { url: "https://example-down.com", status: "DOWN" as const, checkInterval: 5 },
    { url: "http://localhost:3001", status: "Up" as const, checkInterval: 1 },
  ];

  for (const site of websites) {
    const website = await prisma.website.create({
      data: {
        url: site.url,
        timeAdded: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        alert: site.status === "DOWN" ? "Website is down!" : null,
        acknowledge: site.status === "DOWN" ? "Investigating issue" : null,
        escalationPolicy: "Level 1",
        checkInterval: site.checkInterval,
        incident: site.status === "DOWN" ? 1 : 0,
        notificationPrefId: notifPref1.id,
        ownerId: user1.id,
      },
    });

    // Create website statuses in different regions with historical data
    const regions = [usa, india, africa];
    
    // Create historical data points (last 24 hours)
    for (let hour = 24; hour >= 0; hour--) {
      for (const region of regions) {
        const timestamp = new Date(Date.now() - hour * 60 * 60 * 1000);
        await prisma.websiteStatus.create({
          data: {
            responseTime: faker.number.int({ min: 80, max: 600 }),
            statusCheck: site.status,
            regionId: region.id,
            websiteId: website.id,
            timestamp,
          },
        });
      }
    }
    console.log(`✓ Created website: ${site.url}`);
  }

  // Create websites for User 2
  const user2Website = await prisma.website.create({
    data: {
      url: "https://npmjs.com",
      timeAdded: new Date(),
      checkInterval: 5,
      notificationPrefId: notifPref2.id,
      ownerId: user2.id,
    },
  });

  await prisma.websiteStatus.create({
    data: {
      responseTime: 250,
      statusCheck: "Up",
      regionId: africa.id,
      websiteId: user2Website.id,
      timestamp: new Date(),
    },
  });

  console.log("✓ Created 6 websites total\n");

  // Create UserDetails
  console.log("📝 Creating user details...");
  await prisma.userDetails.create({
    data: {
      age: 28,
      weight: 75,
      height: 175,
      goalWeight: 70,
      bmi: 24,
      preferences: "Vegetarian, No nuts",
      ownerId: user1.id,
    },
  });

  await prisma.userDetails.create({
    data: {
      age: 35,
      weight: 82,
      height: 180,
      goalWeight: 78,
      bmi: 25,
      preferences: "Low carb",
      ownerId: user3.id,
    },
  });
  console.log("✓ Created user details\n");

  console.log("✅ Seed completed successfully!");
  console.log("\n📊 Summary:");
  console.log("- 4 Regions");
  console.log("- 4 Users");
  console.log("- 6 Websites");
  console.log("- 2 Notification Preferences");
  console.log("\n🔑 Test credentials:");
  console.log("Email: admin@betteruptime.com");
  console.log("Password: password123");
  console.log("\nEmail: harshkhosla9945@gmail.com");
  console.log("Password: 1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
