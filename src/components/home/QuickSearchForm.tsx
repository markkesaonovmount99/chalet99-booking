"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { Input, Label, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function QuickSearchForm() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    router.push(`/chalets?${params.toString()}`);
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl bg-paper p-5 shadow-xl shadow-forest-950/30 sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
    >
      <div>
        <Label htmlFor="quick-checkin">Заезд</Label>
        <Input
          id="quick-checkin"
          type="date"
          min={today}
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="quick-checkout">Выезд</Label>
        <Input
          id="quick-checkout"
          type="date"
          min={checkIn || today}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="quick-guests">Гости</Label>
        <Select
          id="quick-guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "гость" : "гостей"}
            </option>
          ))}
        </Select>
      </div>
      <Button type="submit" size="md" className="w-full lg:w-auto">
        <Search size={18} />
        Найти шале
      </Button>
    </form>
  );
}
