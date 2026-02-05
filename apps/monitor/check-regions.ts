import { Prismaclient } from "prisma/client";

async function checkRegions() {
  console.log("🔍 Checking regions in database...\n");

  const regions = await Prismaclient.region.findMany();
  
  console.log("Regions in database:");
  regions.forEach(r => {
    console.log(`   ${r.name} (ID: ${r.id})`);
  });

  console.log("\nConsumer groups sending messages:");
  console.log("   usa");
  console.log("   india");
  console.log("   africa");

  await Prismaclient.$disconnect();
}

checkRegions();
