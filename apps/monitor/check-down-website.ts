import { Prismaclient } from "prisma/client";

async function checkDownWebsite() {
  const website = await Prismaclient.website.findFirst({
    where: {
      url: "https://example-down.com",
    },
    include: {
      notificationPref: true,
    },
  });

  if (!website) {
    console.log("❌ Website not found!");
    return;
  }

  const user = await Prismaclient.user.findFirst({
    where: {
      id: website.ownerId,
    },
  });

  console.log("🔍 DOWN Website Details:\n");
  console.log(`URL: ${website.url}`);
  console.log(`Owner ID: ${website.ownerId}`);
  console.log(`Owner Email: ${user?.email || "NOT FOUND"}`);
  console.log(`Owner Name: ${user?.name || "NOT FOUND"}`);
  console.log(`Email Notifications: ${website.notificationPref?.notifyEmail ? "✅ Enabled" : "❌ Disabled"}`);
  console.log(`\nIncidents: ${website.incident}`);
  console.log(`Alert: ${website.alert}`);

  await Prismaclient.$disconnect();
}

checkDownWebsite();
