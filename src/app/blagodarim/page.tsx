import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-flax"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="font-serif text-hero text-astronaut-blue mb-6">
            Благодарим ти!
          </h1>

          <p className="font-sans text-body-desktop text-astronaut-blue/80 mb-8 leading-relaxed">
            Получихме твоята поръчка. До 6 работни дни ще изработим солничката ти и ще я изпратим. Ще получиш имейл с потвърждение и tracking номер скоро.
          </p>

          <div className="mb-12">
            <img
              src="/images/product-1.png"
              alt="Солничка"
              className="w-48 h-48 mx-auto object-contain drop-shadow-lg"
            />
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-deep-cerulean text-white font-medium uppercase tracking-wider text-sm rounded hover:bg-astronaut-blue transition-colors"
          >
            Към началото
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
