import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { QuickSearchForm } from "@/components/home/QuickSearchForm";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest-950 text-cream">
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/chalet99-hero/2000/1200"
          alt="Горы Северной Осетии на закате"
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-forest-950/30" />
      </div>

      <div className="relative mx-auto max-w-8xl px-6 pb-28 pt-24 lg:px-10 lg:pb-36 lg:pt-32">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-wood-300">
          Горы Северной Осетии
        </p>
        <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Шале, отобранные с той же тщательностью, что и предметы коллекции
        </h1>
        <p className="mt-6 max-w-lg text-base text-cream/70 sm:text-lg">
          Дерево, тишина и виды на хребты Кавказа. Шале 99 — небольшая
          подборка домов для тех, кто ценит неспешность и точность в деталях.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <LinkButton href="/chalets" size="lg">
            Смотреть каталог
          </LinkButton>
          <LinkButton
            href="/about"
            variant="secondary"
            size="lg"
            className="border-cream/30 text-cream hover:border-cream hover:bg-cream/10"
          >
            О регионе
          </LinkButton>
        </div>
      </div>

      <div className="relative mx-auto max-w-8xl px-6 pb-10 lg:px-10">
        <QuickSearchForm />
      </div>
    </section>
  );
}
