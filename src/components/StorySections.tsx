'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const pastOrders = [
  { src: '/images/product-2.png', alt: 'Поръчка — мъж в работни дрехи', tilt: -6, top: '6%', left: '4%', size: 230, depth: 0.18, delay: 0 },
  { src: '/images/product-4.png', alt: 'Поръчка — дама в черна рокля', tilt: 5, top: '2%', left: '64%', size: 250, depth: 0.32, delay: 0.05 },
  { src: '/images/product-5.png', alt: 'Поръчка — баба с очила', tilt: -3, top: '36%', left: '46%', size: 200, depth: 0.12, delay: 0.1 },
  { src: '/images/product-9.png', alt: 'Поръчка — готвач', tilt: 7, top: '54%', left: '6%', size: 230, depth: 0.24, delay: 0.15 },
  { src: '/images/product-10.png', alt: 'Поръчка — дама в традиционни дрехи', tilt: -4, top: '60%', left: '70%', size: 240, depth: 0.34, delay: 0.2 },
  { src: '/images/product-13.png', alt: 'Поръчка — фигурка в розово', tilt: 4, top: '24%', left: '28%', size: 190, depth: 0.16, delay: 0.25 },
];

/**
 * "Какво е Солнички?" → "Минали поръчки" — joined by a single giant
 * salt-shaker that straddles the seam. Top half (head/torso) sits in the
 * upper section; bottom half (legs) hangs into the lower section.
 */
export default function StorySections() {
  return (
    <div className="relative">
      <WhatIsSection />

      {/* The seam — zero-height ruler the giant shaker pivots around */}
      <div className="relative w-full" aria-hidden>
        <div className="absolute right-[3%] sm:right-[6%] lg:right-[10%] top-0 -translate-y-1/2 z-[5] pointer-events-none">
          <div className="relative w-[60vw] sm:w-[42vw] md:w-[32vw] lg:w-[26vw] max-w-[520px] aspect-[3/4.6]">
            <Image
              src="/images/product-11.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 50vw, 26vw"
              className="object-contain shaker-cutout drop-shadow-[0_40px_60px_rgba(4,68,101,0.35)]"
            />
          </div>
        </div>
      </div>

      <PastOrdersSection />
    </div>
  );
}

function WhatIsSection() {
  return (
    <section
      id="what-is"
      className="relative bg-cream-dark bg-grain"
      style={{ overflowX: 'clip' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-44 lg:pt-40 lg:pb-56">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-4">
              <span className="hairline w-16 text-astronaut-blue" />
              <span className="eyebrow text-astronaut-blue/70">За бранда</span>
            </div>

            <h2 className="font-serif text-section text-astronaut-blue max-w-2xl">
              Какво е <em className="italic text-deep-cerulean">Солнички?</em>
            </h2>

            <p className="font-serif italic text-2xl md:text-3xl text-astronaut-blue/85 leading-snug max-w-2xl">
              Не поредният декоративен предмет, обречен да събира прах.
            </p>

            <div className="space-y-5 max-w-xl text-body-desktop text-astronaut-blue/85 leading-relaxed">
              <p>
                Солнички е премиум бранд за персонализирани солници — ръчно
                изработени миниатюрни фигурки с лицата на хората, които обичаш.
                Всяка солничка е уникално произведение, създадено специално за теб.
              </p>
              <p>
                Тя е практична — използва се всеки ден, на всяко хранене. Всеки
                път, когато подправяш храната си, ще се сещаш за някого. Всеки
                път, когато погледнеш масата си, ще усещаш присъствие.
              </p>
              <p className="font-medium text-astronaut-blue">
                Истинският лукс е в детайлите, които правят ежедневието
                по-красиво.
              </p>
            </div>
          </div>

          {/* Reserves visual room for the giant shaker on desktop */}
          <div className="hidden lg:block lg:col-span-5" aria-hidden />
        </div>
      </div>
    </section>
  );
}

function PastOrdersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      const p = Math.max(0, Math.min(1, traveled / total));
      setScrollProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="past-orders"
      className="relative bg-cream bg-grain"
      style={{ overflowX: 'clip' }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-astronaut-blue/15" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-32 lg:pt-56 lg:pb-48">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-7">
            <div className="flex items-center gap-4">
              <span className="hairline w-16 text-astronaut-blue" />
              <span className="eyebrow text-astronaut-blue/70">Архив</span>
            </div>

            <h2 className="font-serif text-section text-astronaut-blue">
              Минали <em className="italic text-deep-cerulean">поръчки</em>
            </h2>

            <p className="font-serif italic text-2xl text-astronaut-blue/80 max-w-xl leading-snug">
              Лица, които вече живеят на нечия маса.
            </p>

            <p className="font-sans text-body-desktop text-astronaut-blue/80 max-w-xl">
              Малка част от хората, които сме изработили досега. Всяка фигурка
              започна от една снимка, описание и желание да се запази нещо
              истинско.
            </p>
          </div>
        </div>

        {/* Floating gallery — drifts as the section scrolls past */}
        <div className="relative h-[640px] md:h-[720px] lg:h-[820px] mt-12">
          {pastOrders.map((p, i) => {
            const offset = -scrollProgress * 80 * p.depth + Math.sin((scrollProgress + p.delay) * Math.PI * 2) * 6;
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  top: p.top,
                  left: p.left,
                  width: `min(${p.size}px, 38vw)`,
                  transform: `translate3d(0, ${offset.toFixed(2)}px, 0) rotate(${p.tilt}deg)`,
                  transition: 'transform 50ms linear',
                }}
              >
                <div
                  className="relative aspect-[3/4] animate-float"
                  style={{ animationDelay: `${p.delay * 4}s`, animationDuration: `${6 + i * 0.6}s` }}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 38vw, 240px"
                    className="object-contain shaker-cutout drop-shadow-[0_20px_30px_rgba(4,68,101,0.3)]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
