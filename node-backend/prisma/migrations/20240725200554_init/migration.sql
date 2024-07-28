/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_tagUnderPostRelation" DROP CONSTRAINT "_tagUnderPostRelation_B_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("tagName");

-- AddForeignKey
ALTER TABLE "_tagUnderPostRelation" ADD CONSTRAINT "_tagUnderPostRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tagName") ON DELETE CASCADE ON UPDATE CASCADE;
