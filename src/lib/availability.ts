import { prisma } from "@/lib/prisma";

const BLOCKING_STATUSES = ["NEW", "CONFIRMED"] as const;

export function rangesOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date,
) {
  return aStart < bEnd && aEnd > bStart;
}

export async function getBookedRanges(chaletId: string) {
  const bookings = await prisma.booking.findMany({
    where: { chaletId, status: { in: [...BLOCKING_STATUSES] } },
    select: { checkIn: true, checkOut: true },
    orderBy: { checkIn: "asc" },
  });

  return bookings;
}

export async function isRangeAvailable(
  chaletId: string,
  checkIn: Date,
  checkOut: Date,
) {
  const bookedRanges = await getBookedRanges(chaletId);
  return !bookedRanges.some((range) =>
    rangesOverlap(checkIn, checkOut, range.checkIn, range.checkOut),
  );
}
