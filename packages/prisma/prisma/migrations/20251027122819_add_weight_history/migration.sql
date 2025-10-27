-- CreateTable
CREATE TABLE "public"."WeightHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "goal" DOUBLE PRECISION,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeightHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WeightHistory_userId_date_idx" ON "public"."WeightHistory"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "WeightHistory_userId_date_key" ON "public"."WeightHistory"("userId", "date");

-- AddForeignKey
ALTER TABLE "public"."WeightHistory" ADD CONSTRAINT "WeightHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
