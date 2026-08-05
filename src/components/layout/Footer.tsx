import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-cream">
      <div className="mx-auto max-w-8xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl">Шале 99</p>
            <p className="mt-3 max-w-xs text-sm text-cream/60">
              Коллекция люксовых шале в горах Северной Осетии. Каждый дом
              выбран так же тщательно, как экспонат в коллекции.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-cream/50">
              Навигация
            </p>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              <li>
                <Link href="/chalets" className="hover:text-cream">
                  Каталог шале
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cream">
                  О регионе
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-cream">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-cream">
                  Админ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-cream/50">
              Контакты
            </p>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              <li>
                <a href="tel:+79280000099" className="hover:text-cream">
                  +7 (928) 000-00-99
                </a>
              </li>
              <li>
                <a href="mailto:hello@chalet99.ru" className="hover:text-cream">
                  hello@chalet99.ru
                </a>
              </li>
              <li className="text-cream/60">
                Горы Северной Осетии, Куртатинское ущелье
              </li>
            </ul>
          </div>
        </div>

        <div className="wood-divider mt-12" />

        <p className="mt-6 text-xs text-cream/40">
          © {new Date().getFullYear()} Шале 99. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
