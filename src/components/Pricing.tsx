'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PriceOption {
  id: number;
  label: string;
  price: string;
  description: string;
}

const options: PriceOption[] = [
  {
    id: 1,
    label: '1 персонализирана солничка',
    price: '46,00 €',
    description: 'Уникална миниатюрна фигурка с лице на избран човек',
  },
  {
    id: 2,
    label: '2 персонални солнички',
    price: '89,99 €',
    description: 'Пакет сол и пипер — перфектен двойен подарък',
  },
  {
    id: 3,
    label: '3 персонализирани солнички',
    price: '135,99 €',
    description: 'Три уникални фигурки за семейство или приятели',
  },
  {
    id: 4,
    label: '4 персонализирани солнички',
    price: '184,99 €',
    description: 'Пълна колекция — за специален повод',
  },
];

export default function Pricing() {
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState<number>(1);

  // Get pre-selected option from URL
  useEffect(() => {
    const option = searchParams.get('option');
    if (option && !isNaN(Number(option))) {
      const id = Number(option);
      if (id >= 1 && id <= 4) {
        setSelectedId(id);
      }
    }
  }, [searchParams]);

  const selectedOption = options.find((o) => o.id === selectedId)!;

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-section text-center text-astronaut-blue mb-6">
          Цени
        </h2>

        <p className="text-center text-body-desktop text-astronaut-blue/70 mb-16 max-w-2xl mx-auto">
          Всяка солничка се изработва ръчно. Време за изработка: до 6 работни дни след плащане.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option) => (
            <div
              key={option.id}
              className={`
                relative rounded-lg p-8 transition-all duration-300 cursor-pointer
                border border-astronaut-blue/15
                hover:shadow-xl hover:border-deep-cerulean/30
                ${
                  selectedId === option.id
                    ? 'bg-deep-cerulean text-white shadow-lg scale-[1.02]'
                    : 'bg-white text-astronaut-blue hover:bg-flax/5'
                }
              `}
              onClick={() => setSelectedId(option.id)}
            >
              {/* Radio indicator */}
              <div className="absolute top-4 right-4">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedId === option.id
                      ? 'border-white bg-white'
                      : 'border-astronaut-blue/40'
                  }`}
                >
                  {selectedId === option.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-deep-cerulean" />
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="font-serif text-4xl lg:text-5xl font-semibold">
                  {option.price}
                </p>
              </div>

              {/* Label */}
              <h3 className="font-serif text-xl mb-3 leading-tight">
                {option.label}
              </h3>

              {/* Description */}
              <p
                className={`text-sm leading-relaxed mb-8 ${
                  selectedId === option.id ? 'text-white/80' : 'text-astronaut-blue/60'
                }`}
              >
                {option.description}
              </p>

              {/* CTA */}
              <Link
                href={`/checkout?option=${option.id}`}
                className={`
                  block w-full text-center py-3 font-medium uppercase tracking-wider text-sm rounded transition-colors
                  ${
                    selectedId === option.id
                      ? 'bg-white text-deep-cerulean hover:bg-flax'
                      : 'bg-deep-cerulean text-white hover:bg-astronaut-blue'
                  }
                `}
              >
                Избери →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
