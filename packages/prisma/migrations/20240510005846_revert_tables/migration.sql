/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserOrganizationRole" AS ENUM ('MEMBER', 'OWNER', 'USER');

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- AlterTable
ALTER TABLE "users_organizations" ADD COLUMN     "role" "UserOrganizationRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "sessions";
