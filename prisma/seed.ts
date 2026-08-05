import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function images(seed: string, count: number) {
  return Array.from(
    { length: count },
    (_, i) => `https://picsum.photos/seed/chalet99-${seed}-${i}/1600/1000`,
  );
}

const chalets = [
  {
    slug: "vershina-fiagdon",
    title: "Вершина Фиагдон",
    description:
      "Шале на склоне Куртатинского ущелья с панорамой на Фиагдонскую долину. Дерево, тёмно-зелёный камень и тишина — как в партии, разыгранной без спешки. Внутри — камин, библиотека и коллекционный шахматный стол ручной работы.",
    location: "Куртатинское ущелье, Северная Осетия",
    latitude: 42.7423,
    longitude: 44.2438,
    pricePerNight: 18000,
    bedrooms: 3,
    maxGuests: 6,
    amenities: [
      "Wi-Fi",
      "Камин",
      "Сауна",
      "Панорамные окна",
      "Парковка",
      "Мангальная зона",
      "Вид на горы",
      "Шахматный стол",
    ],
    images: images("fiagdon", 6),
    featured: true,
  },
  {
    slug: "bashnya-tsey",
    title: "Башня Цей",
    description:
      "Каменное шале у подножия Цейского ледника, спроектированное как современное прочтение осетинской родовой башни. Минимализм в деталях, максимум — в виде из окна спальни.",
    location: "Цейское ущелье, Северная Осетия",
    latitude: 42.7911,
    longitude: 43.9291,
    pricePerNight: 22000,
    bedrooms: 4,
    maxGuests: 8,
    amenities: [
      "Wi-Fi",
      "Камин",
      "Джакузи",
      "Тёплый пол",
      "Парковка",
      "Кухня",
      "Терраса",
      "Вид на ледник",
    ],
    images: images("tsey", 6),
    featured: true,
  },
  {
    slug: "digoria-lodge",
    title: "Дигория Лодж",
    description:
      "Уединённое шале в Дигорском ущелье — для тех, кто ценит пространство и продуманную тишину. Библиотека с видом на хребет и коллекция шахматных наборов из разных эпох в гостиной.",
    location: "Дигорское ущелье, Северная Осетия",
    latitude: 42.9814,
    longitude: 43.4967,
    pricePerNight: 15500,
    bedrooms: 2,
    maxGuests: 4,
    amenities: [
      "Wi-Fi",
      "Камин",
      "Панорамные окна",
      "Парковка",
      "Мангальная зона",
      "Библиотека",
      "Шахматный стол",
    ],
    images: images("digoria", 5),
    featured: true,
  },
  {
    slug: "mamison-house",
    title: "Мамисон Хаус",
    description:
      "Просторное шале рядом с курортом Мамисон — для больших компаний и семейных сборов. Общая гостиная с камином во всю стену, отдельная баня и терраса с видом на хребет.",
    location: "Мамисонское ущелье, Северная Осетия",
    latitude: 42.7328,
    longitude: 43.9958,
    pricePerNight: 26000,
    bedrooms: 5,
    maxGuests: 10,
    amenities: [
      "Wi-Fi",
      "Камин",
      "Баня",
      "Парковка",
      "Кухня",
      "Мангальная зона",
      "Терраса",
      "Вид на горы",
    ],
    images: images("mamison", 6),
    featured: false,
  },
  {
    slug: "zaramag-nest",
    title: "Зарамаг Нест",
    description:
      "Компактное шале для двоих на высоте — тихое место для тех, кто приезжает в горы за паузой, а не за суетой. Камин, чай на террасе и партия в шахматы под звёздами.",
    location: "Зарамагская котловина, Северная Осетия",
    latitude: 42.7047,
    longitude: 44.0764,
    pricePerNight: 12000,
    bedrooms: 1,
    maxGuests: 2,
    amenities: [
      "Wi-Fi",
      "Камин",
      "Панорамные окна",
      "Парковка",
      "Терраса",
      "Шахматный стол",
    ],
    images: images("zaramag", 5),
    featured: false,
  },
  {
    slug: "kurtatinskoe-gnezdo",
    title: "Куртатинское Гнездо",
    description:
      "Шале в глубине Куртатинского ущелья, рядом с древними склепами и сторожевыми башнями. Архитектура нарочито сдержанная: дерево, камень и много света.",
    location: "Куртатинское ущелье, Северная Осетия",
    latitude: 42.7689,
    longitude: 44.2115,
    pricePerNight: 16500,
    bedrooms: 3,
    maxGuests: 6,
    amenities: [
      "Wi-Fi",
      "Камин",
      "Сауна",
      "Парковка",
      "Кухня",
      "Мангальная зона",
      "Вид на горы",
    ],
    images: images("kurtatinskoe", 5),
    featured: false,
  },
];

async function main() {
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
