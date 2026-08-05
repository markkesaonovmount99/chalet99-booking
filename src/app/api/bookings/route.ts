import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validations";
import { isRangeAvailable } from "@/lib/availability";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const chalet = await prisma.chalet.findUnique({
    where: { id: data.chaletId },
  });

  if (!chalet) {
    return NextResponse.json({ error: "Шале не найдено" }, { status: 404 });
  }

  if (data.guests > chalet.maxGuests) {
    return NextResponse.json(
      { error: `Максимальная вместимость — ${chalet.maxGuests} гостей` },
      { status: 400 },
    );
  }

  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);

  const available = await isRangeAvailable(data.chaletId, checkIn, checkOut);
  if (!available) {
    return NextResponse.json(
      { error: "Выбранные даты уже заняты" },
      { status: 409 },
    );
  }

  const booking = await prisma.booking.create({
    data: {
      chaletId: data.chaletId,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
      checkIn,
      checkOut,
      guests: data.guests,
      comment: data.comment || null,
    },
  });

  return NextResponse.json({ booking }, { status: 201 });
}
