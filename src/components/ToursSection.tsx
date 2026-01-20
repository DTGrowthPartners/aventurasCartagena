import { useLanguage } from '@/contexts/LanguageContext';
import { TourCard } from '@/components/TourCard';
import { toursData } from '@/data/tours';
import { Palmtree, Landmark, Ship, MapPin } from 'lucide-react';

const sections = [
  {
    id: 'islas',
    icon: Palmtree,
    titleKey: 'Islas del Rosario',
    titleKeyEn: 'Rosario Islands',
    filter: ['islands', 'baru'],
  },
  {
    id: 'cultura',
    icon: Landmark,
    titleKey: 'City Tours',
    titleKeyEn: 'City Tours',
    filter: ['city'],
  },
  {
    id: 'atardeceres',
    icon: Ship,
    titleKey: 'Atardeceres',
    titleKeyEn: 'Sunsets',
    filter: ['sunset'],
  },
  {
    id: 'aventuras',
    icon: MapPin,
    titleKey: 'Aventuras',
    titleKeyEn: 'Adventures',
    filter: ['outside', 'sanbernardo'],
  },
];

export function ToursSection() {
  const { language, t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('tours.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t('tours.subtitle')}
          </p>
        </div>

        {/* Tour Sections */}
        {sections.map((section) => {
          const Icon = section.icon;
          const tours = toursData.filter((tour) =>
            section.filter.includes(tour.category)
          );

          if (tours.length === 0) return null;

          return (
            <div key={section.id} id={section.id} className="mb-16 last:mb-0">
              {/* Section Title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {language === 'es' ? section.titleKey : section.titleKeyEn}
                </h3>
              </div>

              {/* Tours Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
