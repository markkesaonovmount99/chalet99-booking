import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { Advantages } from "@/components/home/Advantages";
import { FeaturedChalets } from "@/components/home/FeaturedChalets";

async function getFeaturedChalets() {
  const featured = await prisma.chalet.findMany({
    where: { featured: true },
    orderBy: { createdAt: "asc" },
    take: 3,
  });

  if (featured.length > 0) return featured;

  return prisma.chalet.findMany({ orderBy: { createdAt: "asc" }, take: 3 });
}

export default async function Home() {
  const chalets = await getFeaturedChalets();

  return (
    <>
      <Hero />
      <Advantages />
      <FeaturedChalets chalets={chalets} />
    </>
  );
}
