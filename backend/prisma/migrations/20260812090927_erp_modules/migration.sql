/*
  Warnings:

  - You are about to drop the column `challanNo` on the `Challan` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `assignedToId` on the `FollowUp` table. All the data in the column will be lost.
  - You are about to drop the column `completed` on the `FollowUp` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `FollowUp` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[challanNumber]` on the table `Challan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `challanNumber` to the `Challan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `ChallanItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `ChallanItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `createdById` to the `FollowUp` table without a default value. This is not possible if the table is not empty.
  - Made the column `reason` on table `StockMovement` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('RETAIL', 'WHOLESALE', 'DISTRIBUTOR');

-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('LEAD', 'ACTIVE', 'INACTIVE');

-- AlterEnum
ALTER TYPE "ChallanStatus" ADD VALUE 'CANCELLED';

-- DropForeignKey
ALTER TABLE "FollowUp" DROP CONSTRAINT "FollowUp_assignedToId_fkey";

-- DropForeignKey
ALTER TABLE "FollowUp" DROP CONSTRAINT "FollowUp_customerId_fkey";

-- DropIndex
DROP INDEX "Challan_challanNo_key";

-- DropIndex
DROP INDEX "ChallanItem_challanId_productId_key";

-- AlterTable
ALTER TABLE "Challan" DROP COLUMN "challanNo",
ADD COLUMN     "challanNumber" TEXT NOT NULL,
ADD COLUMN     "totalQuantity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ChallanItem" ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL,
ALTER COLUMN "unitPrice" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "phone",
ADD COLUMN     "businessName" TEXT NOT NULL,
ADD COLUMN     "followUpDate" TIMESTAMP(3),
ADD COLUMN     "gstNumber" TEXT,
ADD COLUMN     "mobile" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "status" "CustomerStatus" NOT NULL DEFAULT 'LEAD',
ADD COLUMN     "type" "CustomerType" NOT NULL,
ALTER COLUMN "address" SET NOT NULL;

-- AlterTable
ALTER TABLE "FollowUp" DROP COLUMN "assignedToId",
DROP COLUMN "completed",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdById" INTEGER NOT NULL,
ALTER COLUMN "followUpDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'General',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'Main Warehouse',
ALTER COLUMN "price" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "StockMovement" ALTER COLUMN "reason" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt";

-- CreateIndex
CREATE UNIQUE INDEX "Challan_challanNumber_key" ON "Challan"("challanNumber");

-- AddForeignKey
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
