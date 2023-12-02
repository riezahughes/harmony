/*
  Warnings:

  - Added the required column `channel` to the `DiscordGuild` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscordGuild" ADD COLUMN     "channel" TEXT NOT NULL;
