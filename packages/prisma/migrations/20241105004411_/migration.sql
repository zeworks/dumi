/*
  Warnings:

  - Changed the type of `provider_account_id` on the `accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "provider_account_id",
ADD COLUMN     "provider_account_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");
