-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "profilePic" SET DEFAULT 'https://res.cloudinary.com/djisevvr2/image/upload/v1721960040/csisfnc5iwsc7rvhp5vr.jpg';
