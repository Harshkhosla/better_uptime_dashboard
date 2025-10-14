-- CreateTable
CREATE TABLE "public"."UserDetails" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "bmi" INTEGER NOT NULL,
    "preferences" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserDemoGraph" (
    "id" TEXT NOT NULL,
    "progress" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "UserDemoGraph_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_ownerId_key" ON "public"."UserDetails"("ownerId");

-- AddForeignKey
ALTER TABLE "public"."UserDetails" ADD CONSTRAINT "UserDetails_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserDemoGraph" ADD CONSTRAINT "UserDemoGraph_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
