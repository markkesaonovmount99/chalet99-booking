import Image from "next/image";
import Link from "next/link";
import { BedDouble, MapPin, Users } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { ChaletListItem } from "@/types";

export function ChaletCard({ chalet }: { chalet: ChaletListItem }) {
  const isAvailable = chalet.status === "AVAILABLE";

  return (
    <Link
      href={`/chalets/${chalet.slug}`}
      className="group block overflow-hidden rounded-2xl border border-forest-900/10 bg-paper transition-shadow hover:shadow-xl hover:shadow-forest-900/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-forest-100">
        <Image
          src={chalet.images[0]}
          alt={chalet.title}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!isAvailable && (
          <span className="absolute left-3 top-3 rounded-full bg-forest-950/90 px-3 py-1 text-xs font-medium text-cream">
            Занято
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-ink/50">
          <MapPin size={14} />
          <span>{chalet.location}</span>
        </div>

        <h3 className="mt-2 font-serif text-xl text-forest-900">{chalet.title}</h3>

        <div className="mt-3 flex items-center gap-4 text-sm text-ink/60">
          <span className="flex items-center gap-1.5">
            <BedDouble size={16} />
            {chalet.bedrooms} спальни
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={16} />
            до {chalet.maxGuests} гостей
          </span>
        </div>

        <div className="mt-4 flex items-baseline justify-between border-t border-forest-900/10 pt-4">
          <span className="font-serif text-lg text-forest-900">
            {formatPrice(chalet.pricePerNight)}
          </span>
          <span className="text-xs text-ink/50">за ночь</span>
        </div>
      </div>
    </Link>
  );
}
