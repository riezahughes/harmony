/*
  Warnings:

  - You are about to drop the column `nameForPost` on the `DiscordPost` table. All the data in the column will be lost.
  - You are about to drop the column `threadId` on the `DiscordPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DiscordPost" DROP COLUMN "nameForPost",
DROP COLUMN "threadId";
