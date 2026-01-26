import { useLanguage } from '@/contexts/LanguageContext';
import { Palmtree, Ship, Anchor, Moon, Compass } from 'lucide-react';

const categories = [
  {
    id: 'islands',
    icon: Palmtree,
    title: { es: 'Islas y Playas', en: 'Islands & Beaches' },
    desc: { es: 'Rosario, Barú, San Bernardo, Tierra Bomba', en: 'Rosario, Barú, San Bernardo, Tierra Bomba' },
    color: 'bg-ocean',
    href: '#islas',
  },
  {
    id: 'yachts',
    icon: Anchor,
    title: { es: 'Yates', en: 'Yachts' },
    desc: { es: 'Lujo en el mar', en: 'Luxury at sea' },
    color: 'bg-coral',
    href: '#yates',
  },
  {
    id: 'nighttour',
    icon: Moon,
    title: { es: 'Tour Nocturno', en: 'Night Tour' },
    desc: { es: 'Chiva y rumba', en: 'Chiva party bus' },
    color: 'bg-sunset',
    href: '#tournocturno',
  },
  {
    id: 'sunsets',
    icon: Ship,
    title: { es: 'Atardeceres', en: 'Sunsets' },
    desc: { es: 'Vistas mágicas', en: 'Magical views' },
    color: 'bg-orange-500',
    href: '#atardeceres',
  },
];

export function Categories() {
  const { t, language } = useLanguage();

  return (
    <section id="experiencias" className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('categories.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t('categories.subtitle')}
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <a
                key={category.id}
                href={category.href}
                className="group relative flex flex-col items-center p-4 md:p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 border border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                </div>

                {/* Title */}
                <h3 className="text-sm md:text-base font-bold text-foreground mb-1 text-center">
                  {language === 'es' ? category.title.es : category.title.en}
                </h3>

                {/* Description */}
                <p className="text-xs text-muted-foreground text-center line-clamp-2">
                  {language === 'es' ? category.desc.es : category.desc.en}
                </p>

                {/* Hover Arrow */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-primary text-lg">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
