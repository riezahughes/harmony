-- AlterTable
ALTER TABLE "DiscordGuild" ALTER COLUMN "timesAdded" DROP DEFAULT;
DROP SEQUENCE "DiscordGuild_timesAdded_seq";
