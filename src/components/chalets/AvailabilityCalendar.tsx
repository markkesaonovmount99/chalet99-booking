"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { ru } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type DateRangeIso = { checkIn: string; checkOut: string };

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function isBooked(day: Date, bookedRanges: DateRangeIso[]) {
  return bookedRanges.some((range) =>
    isWithinInterval(day, {
      start: startOfDay(new Date(range.checkIn)),
      end: new Date(new Date(range.checkOut).getTime() - 1),
    }),
  );
}

function hasBookedBetween(start: Date, end: Date, bookedRanges: DateRangeIso[]) {
  return bookedRanges.some(
    (range) =>
      startOfDay(new Date(range.checkIn)) < end &&
      new Date(range.checkOut) > start,
  );
}

function MonthGrid({
  month,
  bookedRanges,
  checkIn,
  checkOut,
  today,
  onSelectDay,
}: {
  month: Date;
  bookedRanges: DateRangeIso[];
  checkIn: Date | null;
  checkOut: Date | null;
  today: Date;
  onSelectDay: (day: Date) => void;
}) {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const days = eachDayOfInterval({ start, end });
  const leadingBlanks = (getDay(start) + 6) % 7;

  return (
    <div>
      <p className="text-center text-sm font-medium capitalize text-forest-900">
        {format(month, "LLLL yyyy", { locale: ru })}
      </p>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs text-ink/40">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {days.map((day) => {
          const disabled = isBefore(day, today) || isBooked(day, bookedRanges);
          const selectedStart = checkIn && isSameDay(day, checkIn);
          const selectedEnd = checkOut && isSameDay(day, checkOut);
          const inRange =
            checkIn &&
            checkOut &&
            isWithinInterval(day, { start: checkIn, end: checkOut });

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDay(day)}
              className={cn(
                "aspect-square rounded-md text-xs transition-colors",
                disabled && "cursor-not-allowed text-ink/20 line-through",
                !disabled && !inRange && "text-ink/80 hover:bg-forest-50",
                inRange && !selectedStart && !selectedEnd && "bg-forest-100 text-forest-900",
                (selectedStart || selectedEnd) && "bg-forest-900 text-cream",
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AvailabilityCalendar({
  bookedRanges,
  checkIn,
  checkOut,
  onChange,
}: {
  bookedRanges: DateRangeIso[];
  checkIn: string;
  checkOut: string;
  onChange: (range: { checkIn: string; checkOut: string }) => void;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(today));

  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;

  function handleSelectDay(day: Date) {
    if (!checkInDate || checkOutDate) {
      onChange({ checkIn: format(day, "yyyy-MM-dd"), checkOut: "" });
      return;
    }

    if (isBefore(day, checkInDate) || isSameDay(day, checkInDate)) {
      onChange({ checkIn: format(day, "yyyy-MM-dd"), checkOut: "" });
      return;
    }

    if (hasBookedBetween(checkInDate, day, bookedRanges)) {
      onChange({ checkIn: format(day, "yyyy-MM-dd"), checkOut: "" });
      return;
    }

    onChange({
      checkIn: format(checkInDate, "yyyy-MM-dd"),
      checkOut: format(day, "yyyy-MM-dd"),
    });
  }

  return (
    <div className="rounded-2xl border border-forest-900/10 bg-paper p-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Предыдущий месяц"
          onClick={() => setVisibleMonth((m) => addMonths(m, -1))}
          disabled={isSameDay(visibleMonth, startOfMonth(today))}
          className="rounded-full p-1.5 text-forest-900 hover:bg-forest-50 disabled:opacity-20"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-xs text-ink/50">Выберите даты заезда и выезда</span>
        <button
          type="button"
          aria-label="Следующий месяц"
          onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
          className="rounded-full p-1.5 text-forest-900 hover:bg-forest-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <MonthGrid
          month={visibleMonth}
          bookedRanges={bookedRanges}
          checkIn={checkInDate}
          checkOut={checkOutDate}
          today={today}
          onSelectDay={handleSelectDay}
        />
        <MonthGrid
          month={addMonths(visibleMonth, 1)}
          bookedRanges={bookedRanges}
          checkIn={checkInDate}
          checkOut={checkOutDate}
          today={today}
          onSelectDay={handleSelectDay}
        />
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-ink/50">
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-forest-900" /> выбрано
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-ink/30 line-through">12</span> занято
        </span>
      </div>
    </div>
  );
}
