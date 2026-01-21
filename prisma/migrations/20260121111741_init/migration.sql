/*
  Warnings:

  - You are about to drop the column `locationId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_locationId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "locationId",
ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "location",
ADD COLUMN     "city" TEXT;

-- DropTable
DROP TABLE "Location";
