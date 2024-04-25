/*
  Warnings:

  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersOnOrganizations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersOnOrganizations" DROP CONSTRAINT "UsersOnOrganizations_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnOrganizations" DROP CONSTRAINT "UsersOnOrganizations_userId_fkey";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "UsersOnOrganizations";

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_organizations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "owner" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_organizations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_organizations" ADD CONSTRAINT "users_organizations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_organizations" ADD CONSTRAINT "users_organizations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
