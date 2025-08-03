/*
  Warnings:

  - Added the required column `acknowledge` to the `Website` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alert` to the `Website` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notificationPrefId` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Website" ADD COLUMN     "acknowledge" TEXT NOT NULL,
ADD COLUMN     "alert" TEXT NOT NULL,
ADD COLUMN     "escalationPolicy" TEXT,
ADD COLUMN     "notificationPrefId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."NotificationPreference" (
    "id" TEXT NOT NULL,
    "notifyCall" BOOLEAN NOT NULL DEFAULT false,
    "notifySMS" BOOLEAN NOT NULL DEFAULT false,
    "notifyEmail" BOOLEAN NOT NULL DEFAULT false,
    "notifyPush" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "NotificationPreference_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Website" ADD CONSTRAINT "Website_notificationPrefId_fkey" FOREIGN KEY ("notificationPrefId") REFERENCES "public"."NotificationPreference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
