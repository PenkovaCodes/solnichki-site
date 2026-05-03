export default function Mission() {
  return (
    <section
      id="mission"
      className="relative py-28 lg:py-40 bg-astronaut-blue text-cream-light overflow-hidden"
    >
      {/* Subtle warm spotlight */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(60% 70% at 50% 30%, rgba(227,207,125,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="hairline w-16 text-cream-light" />
          <span className="eyebrow text-cream-light/70">Нашата мисия</span>
          <span className="hairline w-16 text-cream-light" />
        </div>

        <p className="font-serif text-section leading-tight mb-10">
          Да превърнем <em className="italic text-flax">обикновената маса</em> в нещо лично и неповторимо.
        </p>

        <p className="text-body-desktop leading-relaxed text-cream-light/85 max-w-2xl mx-auto">
          Вярваме, че домът отразява личността на своя стопанин. Всяка
          солничка, която създаваме, носи история, емоция и характер.
        </p>

        <div className="mt-12 inline-block border-t border-cream-light/25 pt-8">
          <p className="font-serif italic text-2xl text-flax leading-snug">
            Нещо, което само ти от всички на света притежаваш.
            <br />
            Нещо, което те отличава.
          </p>
        </div>
      </div>
    </section>
  );
}
