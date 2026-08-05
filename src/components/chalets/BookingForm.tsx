"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInCalendarDays } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import { bookingSchema, type BookingFormInput, type BookingInput } from "@/lib/validations";
import { formatDate, formatPrice } from "@/lib/utils";
import { Input, Label, Textarea, FieldError } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import {
  AvailabilityCalendar,
  type DateRangeIso,
} from "@/components/chalets/AvailabilityCalendar";

export function BookingForm({
  chaletId,
  maxGuests,
  pricePerNight,
  bookedRanges,
}: {
  chaletId: string;
  maxGuests: number;
  pricePerNight: number;
  bookedRanges: DateRangeIso[];
}) {
  const [submitState, setSubmitState] = useState<
    { status: "idle" } | { status: "error"; message: string } | { status: "success" }
  >({ status: "idle" });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormInput, unknown, BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      chaletId,
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      checkIn: "",
      checkOut: "",
      guests: 2,
      comment: "",
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(0, differenceInCalendarDays(new Date(checkOut), new Date(checkIn)));
  }, [checkIn, checkOut]);

  async function onSubmit(data: BookingInput) {
    setSubmitState({ status: "idle" });
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setSubmitState({
          status: "error",
          message: payload?.error ?? "Не удалось отправить заявку. Попробуйте ещё раз.",
        });
        return;
      }

      setSubmitState({ status: "success" });
    } catch {
      setSubmitState({
        status: "error",
        message: "Не удалось отправить заявку. Проверьте соединение и попробуйте снова.",
      });
    }
  }

  if (submitState.status === "success") {
    return (
      <div className="rounded-2xl border border-forest-900/10 bg-paper p-8 text-center">
        <CheckCircle2 className="mx-auto text-forest-700" size={40} />
        <h3 className="mt-4 font-serif text-xl text-forest-900">Заявка отправлена</h3>
        <p className="mt-2 text-sm text-ink/60">
          Мы свяжемся с вами в течение суток, чтобы подтвердить бронирование
          {checkIn && checkOut ? ` на ${formatDate(checkIn)} — ${formatDate(checkOut)}` : ""}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border border-forest-900/10 bg-paper p-6"
    >
      <div>
        <h3 className="font-serif text-xl text-forest-900">Забронировать</h3>
        <p className="mt-1 text-sm text-ink/50">
          {formatPrice(pricePerNight)} за ночь
        </p>
      </div>

      <AvailabilityCalendar
        bookedRanges={bookedRanges}
        checkIn={checkIn}
        checkOut={checkOut}
        onChange={(range) => {
          setValue("checkIn", range.checkIn, { shouldValidate: true });
          setValue("checkOut", range.checkOut, { shouldValidate: true });
        }}
      />
      <FieldError>{errors.checkIn?.message ?? errors.checkOut?.message}</FieldError>

      {nights > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-forest-50 px-4 py-3 text-sm">
          <span className="text-ink/70">
            {formatDate(checkIn)} — {formatDate(checkOut)} · {nights} {nightsLabel(nights)}
          </span>
          <span className="font-medium text-forest-900">
            {formatPrice(pricePerNight * nights)}
          </span>
        </div>
      )}

      <div>
        <Label htmlFor="guests">Количество гостей</Label>
        <Input
          id="guests"
          type="number"
          min={1}
          max={maxGuests}
          {...register("guests")}
        />
        <p className="mt-1 text-xs text-ink/40">Максимум {maxGuests} гостей</p>
        <FieldError>{errors.guests?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="guestName">Имя</Label>
        <Input id="guestName" placeholder="Как к вам обращаться" {...register("guestName")} />
        <FieldError>{errors.guestName?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="guestEmail">Email</Label>
        <Input id="guestEmail" type="email" placeholder="you@example.com" {...register("guestEmail")} />
        <FieldError>{errors.guestEmail?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="guestPhone">Телефон</Label>
        <Input id="guestPhone" type="tel" placeholder="+7 900 000-00-00" {...register("guestPhone")} />
        <FieldError>{errors.guestPhone?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="comment">Комментарий (необязательно)</Label>
        <Textarea id="comment" rows={3} placeholder="Пожелания к заезду" {...register("comment")} />
      </div>

      {submitState.status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitState.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Отправляем…" : "Отправить заявку"}
      </Button>
    </form>
  );
}

function nightsLabel(nights: number) {
  const mod10 = nights % 10;
  const mod100 = nights % 100;
  if (mod10 === 1 && mod100 !== 11) return "ночь";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "ночи";
  return "ночей";
}
