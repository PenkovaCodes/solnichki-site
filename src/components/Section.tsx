interface SectionProps {
  id?: string;
  title?: string;
  background?: 'white' | 'cream' | 'deep-cerulean';
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, title, background = 'white', children, className = '' }: SectionProps) {
  const bgStyles = {
    white: 'bg-white',
    cream: 'bg-flax/10',
    'deep-cerulean': 'bg-deep-cerulean text-white',
  };

  const textColor = background === 'deep-cerulean' ? 'text-white' : 'text-astronaut-blue';

  return (
    <section id={id} className={`py-20 lg:py-32 ${bgStyles[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className={`font-serif text-section mb-12 lg:mb-16 text-center ${textColor}`}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
