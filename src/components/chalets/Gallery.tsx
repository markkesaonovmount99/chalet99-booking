"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-forest-100">
        <Image
          src={images[active]}
          alt={`${title} — фото ${active + 1}`}
          fill
          preload
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg ring-2 ring-transparent transition",
                index === active && "ring-forest-800",
              )}
              aria-label={`Показать фото ${index + 1}`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
