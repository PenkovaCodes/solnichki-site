import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-flax/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-deep-cerulean/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text */}
          <div className="space-y-8">
            <h1 className="font-serif text-hero text-astronaut-blue leading-tight">
              Поднеси на масата си
              <br />
              <em className="text-deep-cerulean italic">някой, когото обичаш.</em>
            </h1>

            <p className="font-sans text-body-mobile sm:text-body-desktop text-astronaut-blue/80 max-w-xl leading-relaxed">
              Премиум бранд за персонализирани солници — ръчно изработени миниатюрни фигурки с лицата на хората, които обичаш.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/checkout"
                className="inline-flex items-center justify-center px-8 py-4 bg-deep-cerulean text-white font-medium uppercase tracking-wider text-sm hover:bg-astronaut-blue transition-colors rounded-sm"
              >
                Поръчай своята солничка
              </a>
              <a
                href="#process"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-deep-cerulean text-deep-cerulean font-medium uppercase tracking-wider text-sm hover:bg-deep-cerulean hover:text-white transition-colors rounded-sm"
              >
                Виж процеса
              </a>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Hero product image - first image from gallery */}
            <div className="relative w-full max-w-lg aspect-square">
              <Image
                src="/images/снимки_снилчки_image1.png"
                alt="Солничка — ръчно изработена миниатюрна фигурка"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
