import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contacts/ContactForm";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с командой Шале 99 — телефон, email и форма обратной связи.",
};

const YANDEX_MAPS_URL = "https://yandex.com/maps/-/CTGaQPkN";

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-8xl px-6 py-14 lg:px-10">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-wood-700">
          Контакты
        </p>
        <h1 className="mt-4 font-serif text-3xl text-forest-900 sm:text-4xl">
          Будем рады ответить на вопросы
        </h1>
        <p className="mt-4 text-ink/60">
          Напишите или позвоните нам — поможем выбрать шале и подскажем детали
          по инфраструктуре и дороге в горы Северной Осетии.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-forest-900/10 bg-paper p-6">
            <a href="tel:+79280000099" className="flex items-center gap-3 text-ink/80 hover:text-forest-900">
              <Phone size={18} className="text-forest-700" />
              +7 (928) 000-00-99
            </a>
            <a href="mailto:hello@chalet99.ru" className="flex items-center gap-3 text-ink/80 hover:text-forest-900">
              <Mail size={18} className="text-forest-700" />
              hello@chalet99.ru
            </a>
            <div className="flex items-center gap-3 text-ink/80">
              <MapPin size={18} className="text-forest-700" />
              Горы Северной Осетии, Куртатинское ущелье
            </div>
          </div>

          <a
            href={YANDEX_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-forest-900/10 bg-forest-950 p-6 text-cream transition-colors hover:bg-forest-900"
          >
            <div>
              <p className="font-serif text-lg">Как нас найти</p>
              <p className="mt-1 text-sm text-cream/60">
                Открыть расположение региона на Яндекс.Картах
              </p>
            </div>
            <MapPin size={22} />
          </a>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
