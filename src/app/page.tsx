import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Gallery from '@/components/Gallery';
import Mission from '@/components/Mission';
import Process from '@/components/Process';
import NoLimits from '@/components/NoLimits';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      <Section id="what-is" title="Какво е Солнички?" background="cream">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="font-sans text-body-desktop leading-relaxed text-astronaut-blue/90">
            Солнички е премиум бранд за персонализирани солници — ръчно изработени миниатюрни фигурки с лицата на хората, които обичаш. Всяка солничка е уникално произведение, създадено специално за теб, което не прилича на нищо друго на пазара.
          </p>
          <p className="font-sans text-body-desktop leading-relaxed text-astronaut-blue/90">
            Това не е поредният декоративен предмет, обречен да събира прах. Солничката е практична — използва се всеки ден, на всяко хранене. Всеки път, когато подправяш храната си, ще се сещаш за някого. Всеки път, когато погледнеш масата си, ще усещаш присъствието на човека, когото обичаш.
          </p>
          <p className="font-sans text-body-desktop leading-relaxed text-astronaut-blue/90 italic font-medium">
            Инвестирай в подарък, който съчетава сантименталност с практичност — защото истинският лукс е в детайлите, които правят ежедневието по-красиво.
          </p>
        </div>
      </Section>

      <Gallery />
      <Mission />
      <Process />
      <NoLimits />
      <Suspense fallback={
        <div className="text-center py-8 text-astronaut-blue/60">
          Зареждане на цените…
        </div>
      }>
        <Pricing />
      </Suspense>
      <Footer />
    </main>
  );
}
