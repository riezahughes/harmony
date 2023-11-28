-- CreateTable
CREATE TABLE "DiscordGuild" (
    "id" SERIAL NOT NULL,
    "did" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateRemoved" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscordGuild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordUser" (
    "id" SERIAL NOT NULL,
    "did" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guildId" INTEGER NOT NULL,

    CONSTRAINT "DiscordUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordPost" (
    "id" SERIAL NOT NULL,
    "did" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "threadId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DiscordPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordThread" (
    "id" SERIAL NOT NULL,
    "did" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "DiscordThread_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordThread_postId_key" ON "DiscordThread"("postId");

-- AddForeignKey
ALTER TABLE "DiscordUser" ADD CONSTRAINT "DiscordUser_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "DiscordGuild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscordPost" ADD CONSTRAINT "DiscordPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "DiscordUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscordThread" ADD CONSTRAINT "DiscordThread_postId_fkey" FOREIGN KEY ("postId") REFERENCES "DiscordPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
