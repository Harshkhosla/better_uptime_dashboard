import { Prismaclient } from "prisma/client";

async function checkWebsiteStatus() {
  console.log("🔍 Checking WebsiteStatus records...\n");

  // Get any website
  const website = await Prismaclient.website.findFirst({
    include: {
      websiteStatus: {
        orderBy: { timestamp: "desc" },
        take: 10,
      },
    },
  });

  if (!website) {
    console.log("❌ Website not found!");
    return;
  }

  console.log(`Website: ${website.url}`);
  console.log(`Status records found: ${website.websiteStatus.length}\n`);

  if (website.websiteStatus.length === 0) {
    console.log("⚠️  No WebsiteStatus records found!");
    console.log("This means the worker hasn't created any status entries yet.\n");
  } else {
    console.log("Status records:");
    website.websiteStatus.forEach((status, i) => {
      console.log(`\n${i + 1}. Timestamp: ${status.timestamp}`);
      console.log(`   Status: ${status.statusCheck}`);
      console.log(`   Response Time: ${status.responseTime}ms`);
      console.log(`   Region: ${status.regionId}`);
    });
  }

  await Prismaclient.$disconnect();
}

checkWebsiteStatus();
