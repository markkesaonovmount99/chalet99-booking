"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Главная" },
  { href: "/chalets", label: "Каталог" },
  { href: "/about", label: "О регионе" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forest-900/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="font-serif text-2xl tracking-tight text-forest-900"
          onClick={() => setOpen(false)}
        >
          Шале 99
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-forest-900",
                  active ? "text-forest-900 font-medium" : "text-ink/60",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/chalets"
          className="hidden rounded-full bg-forest-900 px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-forest-800 md:inline-flex"
        >
          Забронировать
        </Link>

        <button
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          className="text-forest-900 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-forest-900/10 bg-cream px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-base text-ink/80"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/chalets"
                className="mt-2 inline-flex rounded-full bg-forest-900 px-6 py-2.5 text-sm font-medium text-cream"
                onClick={() => setOpen(false)}
              >
                Забронировать
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
