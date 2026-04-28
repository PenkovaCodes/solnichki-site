'use client';

import Image from 'next/image';

const images = [
      '/images/product-1.png',
      '/images/product-2.png',
      '/images/product-3.png',
      '/images/product-4.png',
      '/images/product-5.png',
      '/images/product-6.png',
      '/images/product-7.png',
      '/images/product-8.png',
      '/images/product-9.png',
      '/images/product-10.png',
      '/images/product-11.png',
      '/images/product-12.png',
      '/images/product-13.png',
      '/images/product-14.png'
    ];

export default function Gallery() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-section text-center text-astronaut-blue mb-16">
          Галерия
        </h2>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
          {/* Large featured image */}
          <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden">
            <Image
              src={images[0]}
              alt="Ръчно изработена солничка — детайл"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>

          {/* Smaller images in a pattern */}
          {images.slice(1, 7).map((src, idx) => (
            <div
              key={idx}
              className={`relative rounded-lg overflow-hidden ${
                idx === 1 || idx === 4 ? 'row-span-2' : ''
              }`}
            >
              <Image
                src={src}
                alt={`Ръчно изработена солничка ${idx + 2}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
            </div>
          ))}

          {/* Fill out remaining slots with the rest */}
          {images.slice(7).map((src, idx) => (
            <div key={idx + 7} className="relative rounded-lg overflow-hidden">
              <Image
                src={src}
                alt={`Ръчно изработена солничка ${idx + 8}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-sm text-astronaut-blue/60 italic font-serif">
          Всяка солничка е ръчно изработена с внимание към детайлите.
        </p>
      </div>
    </section>
  );
}
