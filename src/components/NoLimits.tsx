export default function NoLimits() {
  return (
    <section className="relative py-24 lg:py-32 bg-cream bg-grain">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="hairline w-16 text-astronaut-blue" />
          <span className="eyebrow text-astronaut-blue/70">Без ограничения</span>
          <span className="hairline w-16 text-astronaut-blue" />
        </div>

        <p className="font-serif text-section text-astronaut-blue leading-tight max-w-3xl mx-auto">
          Майка, баща, баба, приятели, партньор —{' '}
          <em className="italic text-deep-cerulean">или Травис от „Бруталика&ldquo;</em>.
        </p>

        <p className="mt-8 font-sans text-body-desktop leading-relaxed text-astronaut-blue/75 max-w-2xl mx-auto">
          Изработваме солнички с лика на близки хора, но също и на известни
          личности и любими герои от филми и сериали. Няма твърде странна молба.
        </p>
      </div>
    </section>
  );
}
