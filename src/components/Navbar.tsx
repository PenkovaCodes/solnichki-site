'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/85 backdrop-blur-md shadow-[0_1px_0_rgba(4,68,101,0.08)] py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="group" aria-label="Солнички начало">
            <Image
              src="/images/logo-1.png"
              alt="Солнички"
              width={56}
              height={56}
              loading="eager"
              fetchPriority="high"
              className="rounded-full shadow-md transition-transform group-hover:scale-105"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
