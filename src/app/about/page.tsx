import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "О регионе",
  description:
    "История проекта Шале 99 и региона: горы Северной Осетии, Куртатинское ущелье, инфраструктура и то, что делает эти места особенными.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <Image
          src="/images/site/about-hero.jpg"
          alt="Панорама гор Северной Осетии"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-8xl px-6 pb-12 lg:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-wood-300">
            О регионе
          </p>
          <h1 className="mt-4 max-w-xl font-serif text-3xl text-cream sm:text-5xl">
            Северная Осетия — горы, которые не спешат вам понравиться
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <h2 className="font-serif text-2xl text-forest-900">Идея Шале 99</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          Шале 99 — это два дома в Куртатинском ущелье, построенные и
          обставленные по одному принципу: архитектура без лишнего шума,
          честные материалы и вид, ради которого стоит проделать долгий путь.
          Один дом камернее, для тихого отдыха вдвоём или небольшой семьёй,
          второй — просторнее, с отдельным большим залом для компании побольше.
        </p>

        <h2 className="mt-12 font-serif text-2xl text-forest-900">Локация</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          Оба шале расположены рядом друг с другом в Куртатинском ущелье —
          части Кавказского хребта с древними сторожевыми башнями, ледниками и
          альпийскими лугами. Точное расположение — на карте на странице
          контактов.
        </p>

        <h2 className="mt-12 font-serif text-2xl text-forest-900">
          Инфраструктура
        </h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          Рядом — горные склоны, пешие маршруты и смотровые площадки на
          средневековые башенные комплексы Куртатинского ущелья. До ближайшего
          ресторана — около 1,9 км. Для более длинных поездок мы поможем
          организовать трансфер и экскурсии — просто напишите нам на странице
          контактов.
        </p>

        <div className="mt-12">
          <LinkButton href="/chalets" size="lg">
            Смотреть доступные шале
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
