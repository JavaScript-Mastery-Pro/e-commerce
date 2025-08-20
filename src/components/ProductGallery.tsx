"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import { ImageOff, ChevronLeft, ChevronRight, Check } from "lucide-react";

type Variant = {
  id: string;
  label: string;
  hex?: string;
  images: string[];
};

export default function ProductGallery({ variants }: { variants: Variant[] }) {
  const variantWithImages = variants.find((v) => v.images?.length);
  const [activeVariantId, setActiveVariantId] = useState<string | undefined>(variantWithImages?.id);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = useMemo(() => {
    const current = variants.find((v) => v.id === activeVariantId);
    return (current?.images ?? []).filter(Boolean);
  }, [variants, activeVariantId]);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeVariantId]);

  const hasImages = images.length > 0;

  function handleKey(e: KeyboardEvent<HTMLDivElement>) {
    if (!hasImages) return;
    if (e.key === "ArrowRight") setActiveIndex((i) => Math.min(i + 1, images.length - 1));
    if (e.key === "ArrowLeft") setActiveIndex((i) => Math.max(i - 1, 0));
  }

  return (
    <div className="grid grid-cols-[80px_1fr] gap-4 sm:grid-cols-[96px_1fr]">
      <div className="mb-4 flex gap-3">
        {variants
          .filter((v) => v.images?.length)
          .map((v) => {
            const preview = v.images[0];
            const isActive = v.id === activeVariantId;
            return (
              <button
                key={v.id}
                onClick={() => setActiveVariantId(v.id)}
                className={`relative h-16 w-20 overflow-hidden rounded-xl ring-1 ${isActive ? "ring-dark-500" : "ring-light-300 hover:ring-dark-500"}`}
                aria-label={v.label}
              >
                <Image src={preview} alt="" fill sizes="80px" className="object-cover" />
                {isActive && (
                  <span className="absolute right-1 top-1 rounded-full bg-light-100 p-1 ring-1 ring-light-300">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            );
          })}
      </div>

      <div className="flex max-h-[460px] flex-col gap-3 overflow-auto rounded-lg bg-light-100 p-2 ring-1 ring-light-300">
        {hasImages ? (
          images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              className={`relative aspect-square overflow-hidden rounded-lg ring-1 transition ${i === activeIndex ? "ring-dark-500" : "ring-light-300 hover:ring-dark-500"}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show image ${i + 1}`}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))
        ) : (
          <div className="flex h-24 items-center justify-center text-dark-700">
            <ImageOff />
          </div>
        )}
      </div>

      <div
        className="relative rounded-xl bg-light-200 ring-1 ring-light-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
        tabIndex={0}
        onKeyDown={handleKey}
        aria-live="polite"
      >
        {hasImages ? (
          <>
            <Image
              src={images[activeIndex]}
              alt=""
              width={900}
              height={900}
              sizes="(min-width:1024px) 600px, 90vw"
              className="h-auto w-full rounded-xl object-contain"
              priority
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-4">
              <span className="pointer-events-auto rounded-full bg-light-100 p-2 ring-1 ring-light-300">
                <ChevronLeft />
              </span>
              <span className="pointer-events-auto rounded-full bg-light-100 p-2 ring-1 ring-light-300">
                <ChevronRight />
              </span>
            </div>
          </>
        ) : (
          <div className="flex aspect-square items-center justify-center text-dark-700">
            <ImageOff className="h-10 w-10" />
          </div>
        )}
      </div>

      <div className="col-span-2 mt-3 block sm:hidden">
        <div className="flex gap-3 overflow-x-auto">
          {hasImages ? (
            images.map((src, i) => (
              <button
                key={`${src}-mobile-${i}`}
                onClick={() => setActiveIndex(i)}
                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg ring-1 transition ${i === activeIndex ? "ring-dark-500" : "ring-light-300 hover:ring-dark-500"}`}
                aria-label={`Show image ${i + 1}`}
              >
                <Image src={src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))
          ) : (
            <div className="flex h-16 w-full items-center justify-center text-dark-700">
              <ImageOff />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
