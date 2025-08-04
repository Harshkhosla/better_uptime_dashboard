// packages/db/prisma/seed.ts

import { faker } from "@faker-js/faker";
import { Prismaclient } from "../src";

const prisma = Prismaclient;

async function main() {
  // Create Region
  const region = await prisma.region.create({
    data: {
      name: "US-East",
    },
  });

  // Create Notification Preference
  const notificationPref = await prisma.notificationPreference.create({
    data: {
      notifyCall: true,
      notifyEmail: true,
    },
  });

  // Create User
  const user = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      regions: {
        connect: [{ id: region.id }],
      },
    },
  });

  // Create additional websites
  for (let i = 0; i < 3; i++) {
    const newWebsite = await prisma.website.create({
      data: {
        url: faker.internet.url(),
        timeAdded: new Date(),
        alert: faker.lorem.words(2),
        acknowledge: faker.lorem.sentence(),
        escalationPolicy: `Level ${i + 2}`,
        notificationPrefId: notificationPref.id,
        ownerId: user.id,
      },
    });

    await prisma.websiteStatus.create({
      data: {
        responseTime: faker.number.int({ min: 100, max: 600 }),
        statusCheck: "Up",
        regionId: region.id,
        websiteId: newWebsite.id,
      },
    });
  }

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
