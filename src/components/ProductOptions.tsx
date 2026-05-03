import Image from 'next/image';
import Link from 'next/link';

interface ProductOption {
  id: number;
  numeral: string;
  title: string;
  price: string;
  unit: string;
  blurb: string;
  detail: string;
  image: string;
}

const options: ProductOption[] = [
  {
    id: 1,
    numeral: 'I',
    title: 'Една солничка',
    price: '46',
    unit: '€',
    blurb: 'За един човек, един спомен, една маса.',
    detail:
      'Уникална миниатюрна фигурка, изработена ръчно по твоя снимка и описание. За себе си или за някого, когото обичаш.',
    image: '/images/product-3.png',
  },
  {
    id: 2,
    numeral: 'II',
    title: 'Сол и пипер',
    price: '89,99',
    unit: '€',
    blurb: 'Двойката, която стои редом до теб всеки ден.',
    detail:
      'Двойка солнички за сол и пипер, създадени една за друга. Перфектен подарък за родителите, за половинката или за теб и любимия човек.',
    image: '/images/product-1.png',
  },
  {
    id: 3,
    numeral: 'III',
    title: 'Семейството около масата',
    price: '135,99',
    unit: '€',
    blurb: 'Три фигурки, една история.',
    detail:
      'Три уникални солнички за семейството, за приятелите, за хората, без които домът ти не е дом.',
    image: '/images/product-6.png',
  },
  {
    id: 4,
    numeral: 'IV',
    title: 'Пълната колекция',
    price: '184,99',
    unit: '€',
    blurb: 'За поводите, които си струва да помниш цял живот.',
    detail:
      'Четири фигурки за специален повод като сватба, юбилей или годишнина. За това, че просто искаш всички около масата да са там, дори когато не са.',
    image: '/images/product-14.png',
  },
];

export default function ProductOptions() {
  return (
    <div id="products" className="relative">
      {options.map((opt, idx) => (
        <ProductSection key={opt.id} option={opt} reverse={idx % 2 === 1} />
      ))}
    </div>
  );
}

function ProductSection({ option, reverse }: { option: ProductOption; reverse: boolean }) {
  return (
    <section
      id={`option-${option.id}`}
      className={`relative min-h-[100svh] flex items-center bg-grain ${
        option.id % 2 === 0 ? 'bg-cream-light' : 'bg-cream'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-32">
        <div
          className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
            reverse ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Image side */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/5] max-w-xl mx-auto">
              <div className="absolute inset-0">
                <Image
                  src={option.image}
                  alt={option.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain drop-shadow-[0_30px_40px_rgba(4,68,101,0.25)]"
                />
              </div>

              {/* Roman numeral overlay — sits on top of the figurine */}
              <span
                aria-hidden
                className={`absolute z-10 font-serif text-[14rem] md:text-[18rem] leading-none select-none pointer-events-none mix-blend-multiply ${
                  reverse ? '-right-4 sm:-right-8 top-2' : '-left-4 sm:-left-8 top-2'
                }`}
                style={{
                  color: 'rgba(4,68,101,0.55)',
                  textShadow: '0 2px 0 rgba(232,216,181,0.4)',
                }}
              >
                {option.numeral}
              </span>
            </div>
          </div>

          {/* Text side */}
          <div className="lg:col-span-5 space-y-7">
            <div className="flex items-baseline gap-4">
              <span className="eyebrow text-deep-cerulean">
                Опция {option.numeral}
              </span>
              <span className="hairline flex-1 text-astronaut-blue" />
            </div>

            <h2 className="font-serif text-section text-astronaut-blue">
              {option.title}
            </h2>

            <p className="font-serif italic text-2xl text-deep-cerulean leading-snug">
              {option.blurb}
            </p>

            <p className="font-sans text-body-desktop text-astronaut-blue/80 max-w-lg">
              {option.detail}
            </p>

            <div className="flex items-end gap-3 pt-4">
              <span className="font-serif text-7xl md:text-8xl text-astronaut-blue leading-none">
                {option.price}
              </span>
              <span className="font-serif text-3xl text-astronaut-blue/60 mb-3">
                {option.unit}
              </span>
            </div>

            <div className="pt-2">
              <Link
                href={`/checkout?option=${option.id}`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-astronaut-blue text-cream-light font-medium uppercase tracking-widest text-xs hover:bg-deep-cerulean transition-colors"
              >
                Поръчай
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            <p className="text-xs text-astronaut-blue/55 pt-2">
              Изработка до 6 работни дни · Безплатна доставка в България
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
