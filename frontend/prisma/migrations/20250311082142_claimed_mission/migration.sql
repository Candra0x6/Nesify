-- AlterTable
ALTER TABLE "Level" ADD COLUMN     "rewardValue" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "MissionCompletion" ADD COLUMN     "claimed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserReward" ADD COLUMN     "claimed" BOOLEAN NOT NULL DEFAULT false;
