import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/auth";

const ALLOWED_STATUSES = ["CONFIRMED", "REJECTED"] as const;

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/bookings/[id]">,
) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const status = body?.status;

  if (!ALLOWED_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Некорректный статус" }, { status: 400 });
  }

  const booking = await prisma.booking.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ booking });
}
