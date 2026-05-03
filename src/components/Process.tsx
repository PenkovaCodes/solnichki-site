export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Изпращаш снимка',
      description: 'На човека, когото искаш да персонализираш.',
    },
    {
      number: '02',
      title: 'Описваш отличителните белези',
      description:
        'Цвят и дължина на коса, текстура, цвят на очи и всичко, което го прави разпознаваем.',
    },
    {
      number: '03',
      title: 'Избираш облеклото',
      description:
        'Изпращаш снимка на любимо облекло или го описваш подробно. Конкретни цветове, детайли, шарки.',
    },
    {
      number: '04',
      title: 'Останалото е наша работа',
      description: 'Всяка фигурка се изработва ръчно с внимание към всеки детайл.',
    },
  ];

  return (
    <section id="process" className="relative py-28 lg:py-40 bg-cream-light bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 lg:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="hairline w-16 text-astronaut-blue" />
            <span className="eyebrow text-astronaut-blue/70">Как работи</span>
          </div>
          <h2 className="font-serif text-section text-astronaut-blue">
            Процес на <em className="italic text-deep-cerulean">персонализация</em>
          </h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14 lg:gap-y-20">
          {steps.map((step, i) => (
            <li
              key={step.number}
              className="relative pt-8 border-t border-astronaut-blue/15 group"
            >
              <span
                className="absolute -top-px left-0 h-px bg-deep-cerulean transition-all duration-700 ease-out"
                style={{ width: `${(i + 1) * 22}%` }}
                aria-hidden
              />
              <div className="flex items-baseline gap-6">
                <span className="font-serif text-5xl lg:text-6xl text-astronaut-blue/30 leading-none">
                  {step.number}
                </span>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl lg:text-3xl text-astronaut-blue mb-3">
                    {step.title}
                  </h3>
                  <p className="font-sans text-body-desktop text-astronaut-blue/75 max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
