/*
  Warnings:

  - Added the required column `totalComments` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalLikes` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "totalComments" INTEGER NOT NULL,
ADD COLUMN     "totalLikes" INTEGER NOT NULL;
