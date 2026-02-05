import { Prismaclient } from "prisma/client";

async function checkOrphanedWebsites() {
  console.log("🔍 Checking for orphaned websites...\n");

  const websites = await Prismaclient.website.findMany({
    select: {
      id: true,
      url: true,
      ownerId: true,
      alert: true,
    },
  });

  const users = await Prismaclient.user.findMany({
    select: {
      id: true,
      email: true,
    },
  });

  const userIds = new Set(users.map(u => u.id));

  const orphaned = websites.filter(w => !userIds.has(w.ownerId));

  if (orphaned.length > 0) {
    console.log(`❌ Found ${orphaned.length} orphaned websites:\n`);
    orphaned.forEach(w => {
      console.log(`   ${w.url}`);
      console.log(`   Owner ID: ${w.ownerId} (USER NOT FOUND)`);
      console.log(`   Alert: ${w.alert || "None"}`);
      console.log("");
    });

    // Fix by assigning to harshkhosla9945@gmail.com
    const harshUser = users.find(u => u.email === "harshkhosla9945@gmail.com");
    
    if (harshUser) {
      console.log(`🔧 Fixing by assigning to: ${harshUser.email}\n`);
      
      for (const site of orphaned) {
        await Prismaclient.website.update({
          where: { id: site.id },
          data: { ownerId: harshUser.id },
        });
        console.log(`✅ Fixed: ${site.url}`);
      }
    }
  } else {
    console.log("✅ No orphaned websites found!");
  }

  await Prismaclient.$disconnect();
}

checkOrphanedWebsites();
