import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function localImages(dir: string, count: number) {
  return Array.from(
    { length: count },
    (_, i) => `/images/chalets/${dir}/${String(i + 1).padStart(2, "0")}.jpg`,
  );
}

// Реальные данные по состоянию на 09.09.2026. Координаты и часть удобств —
// провизорные, уточняются у владельца (см. переписку по ТЗ на описания).
const chalets = [
  {
    slug: "maloe-shale",
    title: "Малое шале",
    description:
      "Компактное шале на 60 м² в Куртатинском ущелье — одноэтажный дом с одной спальней и общей кухней-гостиной. Панорамные окна выходят на хребет, на террасе — лаунж-зона среди сосен. До ближайшего ресторана — около 1,9 км.",
    location: "Куртатинское ущелье, Северная Осетия",
    latitude: 42.7423,
    longitude: 44.2438,
    pricePerNight: 17990,
    bedrooms: 1,
    maxGuests: 3,
    amenities: [
      "Wi-Fi",
      "Кухня",
      "Панорамные окна",
      "Терраса",
      "Вид на горы",
      "Библиотека",
    ],
    images: localImages("maloe-shale", 12),
    featured: true,
  },
  {
    slug: "bolshoe-shale",
    title: "Большое шале",
    description:
      "Просторное шале на 120 м² по соседству с малым домом — одноэтажная планировка с двумя спальнями и отдельным большим залом для компании. Панорамное остекление, терраса с видом на хребет и библиотека в гостиной. До ближайшего ресторана — около 1,9 км.",
    location: "Куртатинское ущелье, Северная Осетия",
    latitude: 42.7423,
    longitude: 44.2438,
    pricePerNight: 23900,
    bedrooms: 2,
    maxGuests: 6,
    amenities: [
      "Wi-Fi",
      "Кухня",
      "Панорамные окна",
      "Терраса",
      "Вид на горы",
      "Библиотека",
    ],
    images: localImages("bolshoe-shale", 13),
    featured: true,
  },
];

const KEEP_SLUGS = chalets.map((c) => c.slug);

async function main() {
  await prisma.booking.deleteMany({
    where: { chalet: { slug: { notIn: KEEP_SLUGS } } },
  });
  await prisma.chalet.deleteMany({ where: { slug: { notIn: KEEP_SLUGS } } });

  for (const chalet of chalets) {
    await prisma.chalet.upsert({
      where: { slug: chalet.slug },
      update: chalet,
      create: chalet,
    });
  }
  console.log(`Засеяно шале: ${chalets.length}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
