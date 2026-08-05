import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getBookedRanges } from "@/lib/availability";

export async function GET(_request: Request, context: RouteContext<"/api/chalets/[slug]/availability">) {
  const { slug } = await context.params;

  const chalet = await prisma.chalet.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!chalet) {
    return NextResponse.json({ error: "Шале не найдено" }, { status: 404 });
  }

  const bookedRanges = await getBookedRanges(chalet.id);

  return NextResponse.json({
    bookedRanges: bookedRanges.map((range) => ({
      checkIn: range.checkIn.toISOString(),
      checkOut: range.checkOut.toISOString(),
    })),
  });
}
