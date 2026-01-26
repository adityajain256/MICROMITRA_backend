-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN');

-- CreateEnum
CREATE TYPE "jobStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "jobStatus" "jobStatus" NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "jobType" "JobType" NOT NULL DEFAULT 'PART_TIME',
ALTER COLUMN "salary" SET DATA TYPE TEXT;
