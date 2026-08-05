-- CreateEnum
CREATE TYPE "ChaletStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('NEW', 'CONFIRMED', 'REJECTED');

-- CreateTable
CREATE TABLE "Chalet" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "pricePerNight" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "maxGuests" INTEGER NOT NULL,
    "amenities" TEXT[],
    "images" TEXT[],
    "status" "ChaletStatus" NOT NULL DEFAULT 'AVAILABLE',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chalet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "chaletId" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "guestPhone" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "guests" INTEGER NOT NULL,
    "comment" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chalet_slug_key" ON "Chalet"("slug");

-- CreateIndex
CREATE INDEX "Chalet_status_idx" ON "Chalet"("status");

-- CreateIndex
CREATE INDEX "Booking_chaletId_checkIn_checkOut_idx" ON "Booking"("chaletId", "checkIn", "checkOut");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_chaletId_fkey" FOREIGN KEY ("chaletId") REFERENCES "Chalet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
