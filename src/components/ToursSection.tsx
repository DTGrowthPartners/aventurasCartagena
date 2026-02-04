import { useLanguage } from '@/contexts/LanguageContext';
import { TourCard } from '@/components/TourCard';
import { toursData } from '@/data/tours';
import { Palmtree, Landmark, Ship, MapPin, Anchor, Moon, Compass } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const sections = [
  {
    id: 'islas',
    icon: Palmtree,
    titleKey: 'Islas del Rosario',
    titleKeyEn: 'Rosario Islands',
    filter: ['islands'],
  },
  {
    id: 'baru',
    icon: Palmtree,
    titleKey: 'Península de Barú',
    titleKeyEn: 'Barú Peninsula',
    filter: ['baru'],
  },
  {
    id: 'sanbernardo',
    icon: Ship,
    titleKey: 'Archipiélago de San Bernardo',
    titleKeyEn: 'San Bernardo Archipelago',
    filter: ['sanbernardo'],
  },
  {
    id: 'barubeach',
    icon: Palmtree,
    titleKey: 'Playas de Barú',
    titleKeyEn: 'Barú Beaches',
    filter: ['barubeach'],
  },
  {
    id: 'fullday',
    icon: Compass,
    titleKey: 'Full Day Islas',
    titleKeyEn: 'Full Day Islands',
    filter: ['fullday'],
  },
  {
    id: 'tournocturno',
    icon: Moon,
    titleKey: 'Tour Nocturno',
    titleKeyEn: 'Night Tour',
    filter: ['nighttour'],
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
    id: 'tierrabomba',
    icon: MapPin,
    titleKey: 'Tierra Bomba',
    titleKeyEn: 'Tierra Bomba',
    filter: ['tierrabomba'],
  },
  {
    id: 'santamarta',
    icon: MapPin,
    titleKey: 'Santa Marta',
    titleKeyEn: 'Santa Marta',
    filter: ['santamarta'],
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

              {/* Mobile Carousel */}
              <div className="md:hidden">
                <Carousel
                  opts={{
                    align: 'start',
                    loop: false,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2">
                    {tours.map((tour) => (
                      <CarouselItem key={tour.id} className="pl-2 basis-[85%] h-full">
                        <TourCard tour={tour} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>

              {/* Desktop Horizontal Scroll */}
              <div className="hidden md:block">
                <Carousel
                  opts={{
                    align: 'start',
                    loop: false,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2">
                    {tours.map((tour) => (
                      <CarouselItem key={tour.id} className="pl-2 basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full">
                        <TourCard tour={tour} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
