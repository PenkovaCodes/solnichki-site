import Image from 'next/image';
import Wordmark from './Wordmark';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center isolate overflow-hidden">
      {/* Full-bleed background photo */}
      <Image
        src="/images/product-7.png"
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        preload
        sizes="100vw"
        className="object-cover object-center scale-[1.02] -z-20"
      />
      {/* Tonal wash that pulls the photo into our palette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(4,68,101,0.55) 0%, rgba(4,68,101,0.32) 35%, rgba(232,216,181,0.10) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 mix-blend-soft-light"
        style={{
          background:
            'radial-gradient(60% 70% at 50% 40%, rgba(227,207,125,0.45) 0%, transparent 70%)',
        }}
      />

      {/* The blur "card" that lifts the wordmark off the photo */}
      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="relative mx-auto max-w-5xl text-center">
            {/* Soft halo behind the wordmark */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 backdrop-blur-2xl rounded-[2rem]"
              style={{
                background:
                  'radial-gradient(60% 70% at 50% 50%, rgba(232,216,181,0.85) 0%, rgba(232,216,181,0.55) 45%, rgba(232,216,181,0) 80%)',
                boxShadow: '0 30px 80px -20px rgba(4,68,101,0.35)',
                margin: '-2rem',
              }}
            />

            <div className="px-6 py-12 md:px-12 md:py-16 animate-fade-up">
              <p className="eyebrow text-astronaut-blue/70 mb-6">
                Ръчно изработени · България
              </p>

              <Wordmark size="xl" variant="outline" className="text-astronaut-blue" />

              <p className="mt-10 font-serif italic text-2xl md:text-3xl text-astronaut-blue/85 max-w-2xl mx-auto leading-snug">
                Поднеси на масата си някой,
                <br className="hidden sm:block" />{' '}
                <span className="text-deep-cerulean">когото обичаш.</span>
              </p>

              <p className="mt-6 font-sans text-body-mobile sm:text-body-desktop text-astronaut-blue/75 max-w-xl mx-auto">
                Премиум солници с лицата на хората, които обичаш — миниатюрни фигурки,
                които живеят на твоята маса.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-astronaut-blue/70 flex flex-col items-center gap-2 animate-float">
          <span className="eyebrow">Скролни</span>
          <span className="block w-px h-10 bg-current" />
        </div>
      </div>
    </section>
  );
}
