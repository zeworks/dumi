/*
  Warnings:

  - You are about to drop the column `organizationId` on the `users_organizations` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `users_organizations` table. All the data in the column will be lost.
  - Added the required column `organization_id` to the `users_organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `users_organizations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users_organizations" DROP CONSTRAINT "users_organizations_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "users_organizations" DROP CONSTRAINT "users_organizations_userId_fkey";

-- AlterTable
ALTER TABLE "users_organizations" DROP COLUMN "organizationId",
DROP COLUMN "userId",
ADD COLUMN     "organization_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users_organizations" ADD CONSTRAINT "users_organizations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_organizations" ADD CONSTRAINT "users_organizations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
