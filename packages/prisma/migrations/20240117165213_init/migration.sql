-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'BLOCKED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
