import Image from 'next/image';
import Wordmark from './Wordmark';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] isolate overflow-hidden">
      {/* Background photo, shown as uncropped as possible */}
      <Image
        src="/images/product-7.png"
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        preload
        sizes="100vw"
        className="object-cover object-center -z-20"
      />

      {/* Soft warm wash so the image doesn't fight the cream palette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(4,68,101,0.18) 0%, rgba(4,68,101,0.06) 60%, rgba(232,216,181,0.12) 100%)',
        }}
      />

      {/* Left-third frosted panel that holds every word in this section */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-full md:w-1/3 backdrop-blur-2xl"
        style={{
          background:
            'linear-gradient(90deg, rgba(232,216,181,0.92) 0%, rgba(232,216,181,0.85) 70%, rgba(232,216,181,0.55) 95%, rgba(232,216,181,0) 100%)',
        }}
      />

      {/* Content lives inside that left third */}
      <div className="relative z-10 min-h-[100svh] flex items-center">
        <div className="w-full md:w-1/3 px-6 sm:px-10 lg:px-14 py-28 md:py-20 animate-fade-up">
          <p className="eyebrow text-astronaut-blue/70 mb-8">
            Ръчно изработени · България
          </p>

          <Wordmark width={520} className="text-astronaut-blue w-full max-w-[520px] h-auto" eager />

          <p className="mt-10 font-serif italic text-2xl md:text-[1.65rem] text-astronaut-blue/90 leading-snug">
            Поднеси на масата си някой,
            <br />
            <span className="text-deep-cerulean">когото обичаш.</span>
          </p>

          <p className="mt-6 font-sans text-body-mobile sm:text-body-desktop text-astronaut-blue/75">
            Премиум солници с лицата на хората, които обичаш. Миниатюрни фигурки, които живеят на твоята маса.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#products"
              className="inline-flex items-center justify-center px-8 py-4 bg-astronaut-blue text-cream-light font-medium uppercase tracking-widest text-xs hover:bg-deep-cerulean transition-colors rounded-none"
            >
              Виж колекцията
            </a>
            <a
              href="/checkout"
              className="inline-flex items-center justify-center px-8 py-4 border border-astronaut-blue text-astronaut-blue font-medium uppercase tracking-widest text-xs hover:bg-astronaut-blue hover:text-cream-light transition-colors rounded-none"
            >
              Поръчай
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue, anchored to the right two-thirds so it doesn't collide with the panel */}
      <div className="hidden md:flex absolute bottom-8 right-[10%] text-cream-light flex-col items-center gap-2 animate-float drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
        <span className="eyebrow">Скролни</span>
        <span className="block w-px h-10 bg-current" />
      </div>
    </section>
  );
}
