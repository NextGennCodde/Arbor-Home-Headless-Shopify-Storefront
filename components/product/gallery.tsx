"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
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
    <form className="flex flex-col gap-3">
      {/* Main image — 4:5 portrait ratio matching arbor-home.png */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EAE7E1]">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-cover object-center"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
            priority={true}
          />
        )}

        {/* Nav arrows — minimal cream style */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              formAction={() => updateImage(previousImageIndex.toString())}
              aria-label="Previous product image"
              className="flex h-9 w-9 items-center justify-center bg-white/90 text-[#1C1917] shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md active:scale-95"
            >
              <ArrowLeft size={15} weight="bold" />
            </button>
            <button
              formAction={() => updateImage(nextImageIndex.toString())}
              aria-label="Next product image"
              className="flex h-9 w-9 items-center justify-center bg-white/90 text-[#1C1917] shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md active:scale-95"
            >
              <ArrowRight size={15} weight="bold" />
            </button>
          </div>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 text-[10px] font-medium tracking-widest uppercase text-[#1C1917] backdrop-blur-sm">
            {imageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails — square tight row */}
      {images.length > 1 && (
        <ul className="flex flex-wrap items-center gap-2">
          {images.map((image, index) => {
            const isActive = index === imageIndex;
            return (
              <li key={image.src} className="h-[72px] w-[72px] flex-none">
                <button
                  formAction={() => updateImage(index.toString())}
                  aria-label={`Select image ${index + 1}`}
                  className={`relative h-full w-full overflow-hidden block transition-all duration-200 ${
                    isActive
                      ? "ring-1 ring-[#1C1917] ring-offset-1"
                      : "ring-1 ring-transparent hover:ring-[#B3966D] hover:ring-offset-1"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.altText || ""}
                    fill
                    sizes="72px"
                    className="object-cover object-center"
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
