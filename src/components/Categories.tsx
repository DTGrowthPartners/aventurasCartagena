import { useLanguage } from '@/contexts/LanguageContext';
import { Palmtree, Landmark, Music, UtensilsCrossed } from 'lucide-react';

const categories = [
  {
    id: 'islands',
    icon: Palmtree,
    titleKey: 'cat.islands',
    descKey: 'cat.islands.desc',
    color: 'bg-ocean',
    href: '#islas',
  },
  {
    id: 'culture',
    icon: Landmark,
    titleKey: 'cat.culture',
    descKey: 'cat.culture.desc',
    color: 'bg-coral',
    href: '#cultura',
  },
  {
    id: 'party',
    icon: Music,
    titleKey: 'cat.party',
    descKey: 'cat.party.desc',
    color: 'bg-sunset',
    href: '#fiesta',
  },
  {
    id: 'gastro',
    icon: UtensilsCrossed,
    titleKey: 'cat.gastro',
    descKey: 'cat.gastro.desc',
    color: 'bg-palm',
    href: '#gastronomia',
  },
];

export function Categories() {
  const { t } = useLanguage();

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <a
                key={category.id}
                href={category.href}
                className="group relative flex flex-col items-center p-6 md:p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 border border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 text-center">
                  {t(category.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground text-center">
                  {t(category.descKey)}
                </p>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-primary text-xl">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
