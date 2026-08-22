"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { GridTileImage } from "components/grid/tile";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageIndex = searchParams.has("image")
    ? parseInt(searchParams.get("image")!)
    : 0;

  const updateImage = (index: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  return (
    <form>
      {/* Main image */}
      <div className="relative aspect-square h-full max-h-[600px] w-full overflow-hidden   bg-[var(--color-stone)]">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-cover"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
            priority={true}
          />
        )}

        {/* Nav arrows */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              formAction={() => updateImage(previousImageIndex.toString())}
              aria-label="Previous product image"
              className="flex h-9 w-9 items-center justify-center   bg-white/85 text-[var(--color-ink)] shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md active:scale-95"
            >
              <ArrowLeft size={16} weight="bold" />
            </button>
            <button
              formAction={() => updateImage(nextImageIndex.toString())}
              aria-label="Next product image"
              className="flex h-9 w-9 items-center justify-center   bg-white/85 text-[var(--color-ink)] shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md active:scale-95"
            >
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4   bg-[var(--color-forest)]/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {imageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <ul className="mt-4 flex flex-wrap items-center gap-2">
          {images.map((image, index) => {
            const isActive = index === imageIndex;
            return (
              <li key={image.src} className="h-16 w-16 flex-none">
                <button
                  formAction={() => updateImage(index.toString())}
                  aria-label={`Select image ${index + 1}`}
                  className="h-full w-full overflow-hidden  "
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={64}
                    height={64}
                    active={isActive}
                    isInteractive={false}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
}
