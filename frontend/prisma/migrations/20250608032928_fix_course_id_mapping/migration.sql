/*
  Warnings:

  - You are about to drop the column `program` on the `allocation` table. All the data in the column will be lost.
  - You are about to drop the column `program` on the `preference` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Allocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Preference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `allocation` DROP COLUMN `program`,
    ADD COLUMN `courseId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `preference` DROP COLUMN `program`,
    ADD COLUMN `courseId` VARCHAR(191) NOT NULL;
