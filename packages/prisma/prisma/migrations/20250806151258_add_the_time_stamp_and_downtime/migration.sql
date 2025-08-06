-- AlterTable
ALTER TABLE "public"."Website" ADD COLUMN     "incident" INTEGER,
ADD COLUMN     "uptime" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."WebsiteStatus" ADD COLUMN     "timestamp" TIMESTAMP(3);
