import { useLanguage } from '@/contexts/LanguageContext';
import { Palmtree, Ship, Moon, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

const categories = [
  {
    id: 'islands',
    icon: Palmtree,
    title: { es: 'Islas y Playas', en: 'Islands & Beaches' },
    desc: { es: 'Rosario, Barú, San Bernardo, Tierra Bomba', en: 'Rosario, Barú, San Bernardo, Tierra Bomba' },
    color: 'bg-ocean',
    tabId: 'islas',
  },
  {
    id: 'nighttour',
    icon: Moon,
    title: { es: 'Tour Nocturno', en: 'Night Tour' },
    desc: { es: 'Chiva y rumba', en: 'Chiva party bus' },
    color: 'bg-sunset',
    tabId: 'tournocturno',
  },
  {
    id: 'sunsets',
    icon: Ship,
    title: { es: 'Atardeceres', en: 'Sunsets' },
    desc: { es: 'Vistas mágicas', en: 'Magical views' },
    color: 'bg-orange-500',
    tabId: 'atardeceres',
  },
  {
    id: 'santamarta',
    icon: MapPin,
    title: { es: 'Santa Marta', en: 'Santa Marta' },
    desc: { es: 'Ciudad colonial y Tayrona', en: 'Colonial city and Tayrona' },
    color: 'bg-purple-500',
    tabId: 'cultura',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export function Categories() {
  const { t, language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experiencias" className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <Reveal>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('categories.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t('categories.subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('selectTourTab', { detail: category.tabId }));
                  document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative flex flex-col items-center p-4 md:p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border/50"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${category.color} flex items-center justify-center mb-3`}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                </motion.div>

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
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
