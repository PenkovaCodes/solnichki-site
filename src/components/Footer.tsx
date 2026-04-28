import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-astronaut-blue text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-flax flex items-center justify-center">
                <span className="text-astronaut-blue font-serif text-2xl">С</span>
              </div>
              <span className="font-serif text-2xl font-semibold">Солнички</span>
            </div>
            <p className="text-white/70 leading-relaxed max-w-xs">
              Премиум бранд за персонализирани солници — ръчно изработени миниатюрни фигурки с лицата на хората, които обичаш.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Контакти</h4>
            <div className="space-y-2 text-white/70">
              <p>
                <span className="font-medium">Имейл:</span>{' '}
                <a href="mailto:solnichki@gmail.com" className="hover:text-flax transition-colors">
                  solnichki@gmail.com
                </a>
              </p>
              <p>
                <span className="font-medium">Instagram:</span>{' '}
                {/* TODO: Add Instagram handle @ */}
                <span className="italic text-white/50">(未完)</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Навигация</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#what-is" className="hover:text-flax transition-colors">
                  Какво е
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-flax transition-colors">
                  Процес
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-flax transition-colors">
                  Цени
                </a>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-flax transition-colors">
                  Поръчай
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-white/60">
            © 2026 Солнички · Ръчно изработено в България
          </p>
        </div>
      </div>
    </footer>
  );
}
