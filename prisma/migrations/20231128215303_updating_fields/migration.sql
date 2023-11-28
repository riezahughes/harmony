/*
  Warnings:

  - You are about to drop the column `name` on the `DiscordUser` table. All the data in the column will be lost.
  - Added the required column `nameForPost` to the `DiscordPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscordGuild" ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "dateRemoved" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DiscordPost" ADD COLUMN     "dateAdded" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nameForPost" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DiscordThread" ADD COLUMN     "closed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "DiscordUser" DROP COLUMN "name",
ADD COLUMN     "dateAdded" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastUpdated" TIMESTAMP(3);
