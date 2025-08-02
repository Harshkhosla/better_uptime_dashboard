-- CreateEnum
CREATE TYPE "public"."statusCheck" AS ENUM ('Up', 'DOWN', 'UNKNONE');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Website" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "timeAdded" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WebsiteStatus" (
    "id" TEXT NOT NULL,
    "responseTime" INTEGER NOT NULL,
    "statusCheck" "public"."statusCheck" NOT NULL,
    "regionId" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,

    CONSTRAINT "WebsiteStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_UserRegions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserRegions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "_UserRegions_B_index" ON "public"."_UserRegions"("B");

-- AddForeignKey
ALTER TABLE "public"."Website" ADD CONSTRAINT "Website_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WebsiteStatus" ADD CONSTRAINT "WebsiteStatus_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WebsiteStatus" ADD CONSTRAINT "WebsiteStatus_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "public"."Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserRegions" ADD CONSTRAINT "_UserRegions_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserRegions" ADD CONSTRAINT "_UserRegions_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
