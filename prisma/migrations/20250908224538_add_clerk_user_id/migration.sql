/*
  Warnings:

  - You are about to drop the column `ClerkUserId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkUserId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkUserId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."users_ClerkUserId_key";

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "ClerkUserId",
ADD COLUMN     "clerkUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkUserId_key" ON "public"."users"("clerkUserId");
