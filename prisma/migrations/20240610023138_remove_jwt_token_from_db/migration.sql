/*
  Warnings:

  - You are about to drop the column `jwt_token` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_jwt_token_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "jwt_token";
