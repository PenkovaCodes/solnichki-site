import Link from 'next/link';
import Wordmark from './Wordmark';

export default function Footer() {
  return (
    <footer className="relative bg-astronaut-blue text-cream-light pt-20 pb-10 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(40% 60% at 80% 20%, rgba(227,207,125,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-cream-light/15 pb-12 mb-12">
          <Wordmark size="md" variant="solid" className="text-cream-light" />
          <p className="mt-6 max-w-md text-cream-light/75 leading-relaxed">
            Премиум бранд за персонализирани солници — ръчно изработени
            миниатюрни фигурки с лицата на хората, които обичаш.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-14">
          <div className="space-y-4">
            <h4 className="eyebrow text-cream-light/60">Контакт</h4>
            <div className="space-y-2 text-cream-light/85">
              <p>
                <a href="mailto:solnichki@gmail.com" className="hover:text-flax transition-colors">
                  solnichki@gmail.com
                </a>
              </p>
              <p className="text-cream-light/55 italic">Instagram скоро</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="eyebrow text-cream-light/60">Навигация</h4>
            <ul className="space-y-2 text-cream-light/85">
              <li>
                <a href="#products" className="hover:text-flax transition-colors">
                  Опции и цени
                </a>
              </li>
              <li>
                <a href="#what-is" className="hover:text-flax transition-colors">
                  За бранда
                </a>
              </li>
              <li>
                <a href="#past-orders" className="hover:text-flax transition-colors">
                  Минали поръчки
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-flax transition-colors">
                  Процес
                </a>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-flax transition-colors">
                  Поръчай
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="eyebrow text-cream-light/60">Информация</h4>
            <ul className="space-y-2 text-cream-light/85">
              <li>
                <Link href="/terms" className="hover:text-flax transition-colors">
                  Условия за ползване
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-flax transition-colors">
                  Политика за поверителност
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cream-light/15 flex flex-col sm:flex-row sm:justify-between gap-4 text-xs text-cream-light/55">
          <p>© 2026 Солнички</p>
          <p>Ръчно изработено в България</p>
        </div>
      </div>
    </footer>
  );
}
