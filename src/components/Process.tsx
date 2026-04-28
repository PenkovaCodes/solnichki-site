export default function Process() {
  const steps = [
    {
      number: '01.',
      title: 'Изпращаш снимка',
      description: 'На човека, когото искаш да персонализираш',
    },
    {
      number: '02.',
      title: 'Описваш отличителните белези',
      description: 'Цвят и дължина на коса, текстура, цвят на очи и всичко, което го прави разпознаваем',
    },
    {
      number: '03.',
      title: 'Избираш облеклото',
      description: 'Изпращаш снимка на любимо облекло или го описваш подробно с конкретни цветове и детайли',
    },
    {
      number: '04.',
      title: 'Ние се грижим за останалото',
      description: 'Всяка фигурка се изработва ръчно с внимание към всеки детайл',
    },
  ];

  return (
    <section id="process" className="py-20 lg:py-32 bg-flax/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-section text-center text-astronaut-blue mb-16 lg:mb-24">
          Процес на персонализация
        </h2>

        <div className="space-y-12 lg:space-y-16">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6 lg:gap-10 items-start">
              {/* Large number */}
              <span className="font-serif text-5xl lg:text-6xl text-deep-cerulean/30 flex-shrink-0 leading-none">
                {step.number}
              </span>

              {/* Text content */}
              <div className="pt-3">
                <h3 className="font-serif text-2xl lg:text-3xl text-astronaut-blue mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-body-desktop text-astronaut-blue/70">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
