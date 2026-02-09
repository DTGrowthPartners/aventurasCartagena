import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TourCard } from '@/components/TourCard';
import { toursData } from '@/data/tours';
import { Palmtree, Landmark, Ship, MapPin, Moon, Compass, Sun, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

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
    titleKey: 'San Bernardo',
    titleKeyEn: 'San Bernardo',
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
    icon: Sun,
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
];

// Filter out empty sections
const activeSections = sections.filter((section) =>
  toursData.some((tour) => section.filter.includes(tour.category))
);

export function ToursSection() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(activeSections[0]?.id || 'islas');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Listen for tab selection from Categories
  useEffect(() => {
    const handleSelectTab = (e: Event) => {
      const tabId = (e as CustomEvent).detail;
      if (activeSections.some((s) => s.id === tabId)) {
        setActiveTab(tabId);
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ left: 0 });
        }
        setTimeout(() => {
          if (tabsRef.current) {
            const tabEl = tabsRef.current.querySelector(`[data-tab="${tabId}"]`);
            tabEl?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        }, 50);
      }
    };
    window.addEventListener('selectTourTab', handleSelectTab);
    return () => window.removeEventListener('selectTourTab', handleSelectTab);
  }, []);

  const activeIndex = activeSections.findIndex((s) => s.id === activeTab);
  const activeSection = activeSections[activeIndex] || activeSections[0];
  const tours = toursData.filter((tour) =>
    activeSection.filter.includes(tour.category)
  );

  const nextSection = activeSections[(activeIndex + 1) % activeSections.length];

  const goToNextDestination = () => {
    setActiveTab(nextSection.id);
    // Scroll cards back to start
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0 });
    }
    // Scroll the next tab into view
    setTimeout(() => {
      if (tabsRef.current) {
        const nextTabEl = tabsRef.current.querySelector(`[data-tab="${nextSection.id}"]`);
        nextTabEl?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }, 50);
  };

  const scrollCards = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.firstElementChild?.clientWidth || 300;
    const scrollAmount = direction === 'left' ? -cardWidth - 12 : cardWidth + 12;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="tours" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        {/* Section Header */}
        <Reveal>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('tours.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t('tours.subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Category Tabs - Horizontal scrollable */}
        <Reveal delay={0.1}>
          <div className="relative mb-8">
            <div
              ref={tabsRef}
              className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory justify-center"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {activeSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeTab === section.id;
                return (
                  <button
                    key={section.id}
                    data-tab={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap snap-start transition-colors duration-200 ${
                      isActive
                        ? 'text-primary-foreground'
                        : 'bg-background text-muted-foreground hover:bg-muted border border-border/50'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" />
                      {language === 'es' ? section.titleKey : section.titleKeyEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Tours Content with AnimatePresence */}
        <div className="relative">
          {/* Desktop scroll arrows */}
          <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => scrollCards('left')}
              className="p-2 rounded-full bg-background/90 backdrop-blur-sm shadow-lg border border-border/50 hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          </div>
          <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => scrollCards('right')}
              className="p-2 rounded-full bg-background/90 backdrop-blur-sm shadow-lg border border-border/50 hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Horizontal scroll container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-3 md:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {tours.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] snap-start"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
                  >
                    <TourCard tour={tour} />
                  </motion.div>
                ))}

                {/* Next Destination card - mobile only */}
                <div className="md:hidden flex-shrink-0 w-[200px] snap-start flex items-center justify-center">
                  <button
                    onClick={goToNextDestination}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-primary/10 border-2 border-dashed border-primary/30 hover:bg-primary/20 transition-colors w-full h-[280px] justify-center"
                  >
                    {(() => { const NextIcon = nextSection.icon; return <NextIcon className="w-8 h-8 text-primary" />; })()}
                    <span className="text-sm font-bold text-foreground text-center">
                      {language === 'es' ? 'Siguiente Destino' : 'Next Destination'}
                    </span>
                    <span className="text-xs text-muted-foreground text-center">
                      {language === 'es' ? nextSection.titleKey : nextSection.titleKeyEn}
                    </span>
                    <ChevronRight className="w-6 h-6 text-primary" />
                  </button>
                </div>
              </div>

              {/* Tour count indicator */}
              <div className="text-center mt-4">
                <span className="text-sm text-muted-foreground">
                  {tours.length} {language === 'es' ? 'planes disponibles' : 'plans available'}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
