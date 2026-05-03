import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductOptions from '@/components/ProductOptions';
import StorySections from '@/components/StorySections';
import Mission from '@/components/Mission';
import Process from '@/components/Process';
import NoLimits from '@/components/NoLimits';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <ProductOptions />
      <StorySections />
      <Mission />
      <Process />
      <NoLimits />
      <Footer />
    </main>
  );
}
