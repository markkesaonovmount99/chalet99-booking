import type { Metadata } from "next";
import Link from "next/link";
import { differenceInCalendarDays } from "date-fns";
import { prisma } from "@/lib/prisma";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { logoutAction, updateBookingStatusAction } from "@/app/admin/actions";
import type { BookingStatus } from "@/generated/prisma/enums";

export const metadata: Metadata = {
  title: "Админ-панель",
  robots: { index: false, follow: false },
};

const TABS: { label: string; value: BookingStatus | "ALL" }[] = [
  { label: "Все", value: "ALL" },
  { label: "Новые", value: "NEW" },
  { label: "Подтверждённые", value: "CONFIRMED" },
  { label: "Отклонённые", value: "REJECTED" },
];

const STATUS_LABELS: Record<BookingStatus, string> = {
  NEW: "Новая",
  CONFIRMED: "Подтверждена",
  REJECTED: "Отклонена",
};

const STATUS_CLASSES: Record<BookingStatus, string> = {
  NEW: "bg-wood-100 text-wood-900",
  CONFIRMED: "bg-forest-100 text-forest-900",
  REJECTED: "bg-red-50 text-red-700",
};

export default async function AdminPage({
  searchParams,
}: PageProps<"/admin">) {
  const sp = await searchParams;
  const statusParam = Array.isArray(sp.status) ? sp.status[0] : sp.status;
  const activeStatus =
    statusParam === "NEW" || statusParam === "CONFIRMED" || statusParam === "REJECTED"
      ? statusParam
      : "ALL";

  const bookings = await prisma.booking.findMany({
    where: activeStatus === "ALL" ? {} : { status: activeStatus },
    include: { chalet: { select: { title: true, slug: true, pricePerNight: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-8xl px-6 py-14 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-wood-700">
            Админ-панель
          </p>
          <h1 className="mt-2 font-serif text-3xl text-forest-900">Заявки на бронирование</h1>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full border border-forest-900/20 px-5 py-2 text-sm text-forest-900 hover:bg-forest-50"
          >
            Выйти
          </button>
        </form>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <Link
            key={tab.value}
            href={tab.value === "ALL" ? "/admin" : `/admin?status=${tab.value}`}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition-colors",
              activeStatus === tab.value
                ? "bg-forest-900 text-cream"
                : "bg-forest-50 text-forest-900 hover:bg-forest-100",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {bookings.length === 0 && (
          <p className="rounded-2xl border border-dashed border-forest-900/20 py-16 text-center text-ink/50">
            Заявок нет
          </p>
        )}

        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="grid gap-4 rounded-2xl border border-forest-900/10 bg-paper p-6 lg:grid-cols-[1fr_auto]"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/chalets/${booking.chalet.slug}`}
                  target="_blank"
                  className="font-serif text-lg text-forest-900 hover:underline"
                >
                  {booking.chalet.title}
                </Link>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    STATUS_CLASSES[booking.status],
                  )}
                >
                  {STATUS_LABELS[booking.status]}
                </span>
              </div>

              <p className="mt-2 text-sm text-ink/70">
                {formatDate(booking.checkIn)} — {formatDate(booking.checkOut)} ·{" "}
                {booking.guests} гостей ·{" "}
                {formatPrice(
                  booking.chalet.pricePerNight *
                    differenceInCalendarDays(booking.checkOut, booking.checkIn),
                )}
              </p>

              <p className="mt-1 text-sm text-ink/70">
                {booking.guestName} · {booking.guestEmail} · {booking.guestPhone}
              </p>

              {booking.comment && (
                <p className="mt-2 text-sm italic text-ink/50">«{booking.comment}»</p>
              )}

              <p className="mt-2 text-xs text-ink/40">
                Заявка от {formatDate(booking.createdAt)}
              </p>
            </div>

            {booking.status === "NEW" && (
              <div className="flex items-start gap-2 lg:flex-col">
                <form action={updateBookingStatusAction.bind(null, booking.id, "CONFIRMED")}>
                  <button
                    type="submit"
                    className="rounded-full bg-forest-900 px-5 py-2 text-sm font-medium text-cream hover:bg-forest-800"
                  >
                    Подтвердить
                  </button>
                </form>
                <form action={updateBookingStatusAction.bind(null, booking.id, "REJECTED")}>
                  <button
                    type="submit"
                    className="rounded-full border border-forest-900/20 px-5 py-2 text-sm text-forest-900 hover:bg-forest-50"
                  >
                    Отклонить
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
