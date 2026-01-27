-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "jobPicture" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "picture" TEXT;
