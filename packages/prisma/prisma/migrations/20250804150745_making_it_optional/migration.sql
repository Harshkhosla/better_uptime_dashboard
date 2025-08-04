-- DropForeignKey
ALTER TABLE "public"."Website" DROP CONSTRAINT "Website_notificationPrefId_fkey";

-- AlterTable
ALTER TABLE "public"."Website" ALTER COLUMN "acknowledge" DROP NOT NULL,
ALTER COLUMN "alert" DROP NOT NULL,
ALTER COLUMN "notificationPrefId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Website" ADD CONSTRAINT "Website_notificationPrefId_fkey" FOREIGN KEY ("notificationPrefId") REFERENCES "public"."NotificationPreference"("id") ON DELETE SET NULL ON UPDATE CASCADE;
