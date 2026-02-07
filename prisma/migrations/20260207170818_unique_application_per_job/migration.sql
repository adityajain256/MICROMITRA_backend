/*
  Warnings:

  - A unique constraint covering the columns `[jobId,jobSeekerId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Application_jobId_jobSeekerId_key" ON "Application"("jobId", "jobSeekerId");
