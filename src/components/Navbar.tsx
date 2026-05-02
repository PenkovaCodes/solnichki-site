'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Wordmark from './Wordmark';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#products', label: 'Опции' },
    { href: '#what-is', label: 'За бранда' },
    { href: '#past-orders', label: 'Поръчки' },
    { href: '#process', label: 'Процес' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/85 backdrop-blur-md shadow-[0_1px_0_rgba(4,68,101,0.08)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center" aria-label="Солнички — начало">
            <Wordmark size="sm" variant="solid" className="text-astronaut-blue" />
          </Link>

          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="eyebrow text-astronaut-blue hover:text-deep-cerulean transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/checkout"
              className="px-5 py-2.5 bg-astronaut-blue text-cream-light eyebrow hover:bg-deep-cerulean transition-colors"
            >
              Поръчай
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6 text-astronaut-blue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-6 border-t border-astronaut-blue/15 pt-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 eyebrow text-astronaut-blue hover:text-deep-cerulean"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/checkout"
              className="mt-4 inline-block px-5 py-2.5 bg-astronaut-blue text-cream-light eyebrow"
              onClick={() => setMobileMenuOpen(false)}
            >
              Поръчай
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
