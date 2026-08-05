import { ChaletCard } from "@/components/chalets/ChaletCard";
import { LinkButton } from "@/components/ui/Button";
import type { ChaletListItem } from "@/types";

export function FeaturedChalets({ chalets }: { chalets: ChaletListItem[] }) {
  if (chalets.length === 0) return null;

  return (
    <section className="bg-forest-50/60">
      <div className="mx-auto max-w-8xl px-6 py-20 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-wood-700">
              Подборка
            </p>
            <h2 className="mt-4 font-serif text-3xl text-forest-900 sm:text-4xl">
              Популярные шале
            </h2>
          </div>
          <LinkButton href="/chalets" variant="secondary">
            Весь каталог
          </LinkButton>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {chalets.map((chalet) => (
            <ChaletCard key={chalet.id} chalet={chalet} />
          ))}
        </div>
      </div>
    </section>
  );
}
