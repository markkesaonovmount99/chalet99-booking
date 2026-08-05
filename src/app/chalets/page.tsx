import type { Metadata } from "next";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ChaletCard } from "@/components/chalets/ChaletCard";
import { ChaletFilters } from "@/components/chalets/ChaletFilters";

export const metadata: Metadata = {
  title: "Каталог шале",
  description:
    "Люксовые шале в горах Северной Осетии. Фильтры по вместимости, цене, удобствам и локации.",
};

function toParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function toList(value: string | string[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function ChaletsPage({
  searchParams,
}: PageProps<"/chalets">) {
  const sp = await searchParams;

  const location = toParam(sp.location) || undefined;
  const guests = toParam(sp.guests);
  const priceMin = toParam(sp.priceMin);
  const priceMax = toParam(sp.priceMax);
  const amenities = toList(sp.amenities);

  const where: Prisma.ChaletWhereInput = {};
  if (location) where.location = location;
  if (guests) where.maxGuests = { gte: Number(guests) };
  if (priceMin || priceMax) {
    where.pricePerNight = {
      ...(priceMin ? { gte: Number(priceMin) } : {}),
      ...(priceMax ? { lte: Number(priceMax) } : {}),
    };
  }
  if (amenities.length > 0) where.amenities = { hasEvery: amenities };

  const [chalets, allChalets] = await Promise.all([
    prisma.chalet.findMany({ where, orderBy: { createdAt: "asc" } }),
    prisma.chalet.findMany({ select: { location: true, amenities: true } }),
  ]);

  const locations = Array.from(new Set(allChalets.map((c) => c.location))).sort();
  const amenityOptions = Array.from(
    new Set(allChalets.flatMap((c) => c.amenities)),
  ).sort();

  return (
    <div className="mx-auto max-w-8xl px-6 py-14 lg:px-10">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-wood-700">
          Каталог
        </p>
        <h1 className="mt-4 font-serif text-3xl text-forest-900 sm:text-4xl">
          Шале в горах Северной Осетии
        </h1>
        <p className="mt-4 text-ink/60">
          {chalets.length} шале найдено по вашим критериям
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[300px_1fr]">
        <ChaletFilters
          locations={locations}
          amenities={amenityOptions}
          current={{ location, guests, priceMin, priceMax, amenities }}
        />

        {chalets.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {chalets.map((chalet) => (
              <ChaletCard key={chalet.id} chalet={chalet} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-forest-900/20 py-20 text-center">
            <p className="font-serif text-xl text-forest-900">
              Ничего не найдено
            </p>
            <p className="mt-2 max-w-sm text-sm text-ink/60">
              Попробуйте изменить параметры фильтра — например, расширить
              диапазон цены или вместимость.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
