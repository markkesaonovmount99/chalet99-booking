import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BedDouble, MapPin, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getBookedRanges } from "@/lib/availability";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Gallery } from "@/components/chalets/Gallery";
import { BookingForm } from "@/components/chalets/BookingForm";

async function getChalet(slug: string) {
  return prisma.chalet.findUnique({ where: { slug } });
}

export async function generateMetadata({
  params,
}: PageProps<"/chalets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const chalet = await getChalet(slug);

  if (!chalet) return {};

  return {
    title: chalet.title,
    description: chalet.description,
    openGraph: {
      title: chalet.title,
      description: chalet.description,
      images: chalet.images[0] ? [chalet.images[0]] : undefined,
    },
  };
}

export default async function ChaletPage({
  params,
}: PageProps<"/chalets/[slug]">) {
  const { slug } = await params;
  const chalet = await getChalet(slug);

  if (!chalet) notFound();

  const bookedRanges = await getBookedRanges(chalet.id);
  const bookedRangesIso = bookedRanges.map((range) => ({
    checkIn: range.checkIn.toISOString(),
    checkOut: range.checkOut.toISOString(),
  }));

  return (
    <div className="mx-auto max-w-8xl px-6 py-14 lg:px-10">
      <div className="flex items-center gap-1.5 text-sm text-ink/50">
        <MapPin size={16} />
        {chalet.location}
      </div>
      <h1 className="mt-2 font-serif text-3xl text-forest-900 sm:text-4xl">
        {chalet.title}
      </h1>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <Gallery images={chalet.images} title={chalet.title} />

          <div className="mt-8 flex flex-wrap gap-6 border-y border-forest-900/10 py-6 text-sm text-ink/70">
            <span className="flex items-center gap-2">
              <BedDouble size={18} className="text-forest-700" />
              {chalet.bedrooms} спальни
            </span>
            <span className="flex items-center gap-2">
              <Users size={18} className="text-forest-700" />
              до {chalet.maxGuests} гостей
            </span>
            <span className="flex items-center gap-2 font-medium text-forest-900">
              {formatPrice(chalet.pricePerNight)} за ночь
            </span>
          </div>

          <div className="mt-8">
            <h2 className="font-serif text-2xl text-forest-900">Описание</h2>
            <p className="mt-4 whitespace-pre-line text-ink/70 leading-relaxed">
              {chalet.description}
            </p>
          </div>

          {chalet.amenities.length > 0 && (
            <div className="mt-8">
              <h2 className="font-serif text-2xl text-forest-900">Удобства</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {chalet.amenities.map((amenity) => (
                  <Badge key={amenity}>{amenity}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <BookingForm
            chaletId={chalet.id}
            maxGuests={chalet.maxGuests}
            pricePerNight={chalet.pricePerNight}
            bookedRanges={bookedRangesIso}
          />
        </div>
      </div>
    </div>
  );
}
