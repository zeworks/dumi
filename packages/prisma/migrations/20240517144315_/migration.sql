/*
  Warnings:

  - You are about to drop the `users_organizations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `owner_id` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('MEMBER', 'OWNER', 'USER');

-- DropForeignKey
ALTER TABLE "users_organizations" DROP CONSTRAINT "users_organizations_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "users_organizations" DROP CONSTRAINT "users_organizations_user_id_fkey";

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "owner_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "users_organizations";

-- DropEnum
DROP TYPE "UserOrganizationRole";

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "role" "MemberRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
