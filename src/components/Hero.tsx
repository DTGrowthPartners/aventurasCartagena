import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { FlipWords } from '@/components/ui/flip-words';

const flipWordsEs = ['Descubre', 'Explora', 'Pasea', 'Vive'];
const flipWordsEn = ['Discover', 'Explore', 'Wander', 'Experience'];
const flipColors = ['#ffffff', '#facc15', '#38bdf8', '#ef4444'];

export function Hero() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden border-0">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/199001-909564581_small.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/40 to-navy/80"
          style={shouldReduceMotion ? {} : { opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center px-4 -mt-20">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-6">
            <span className="animate-pulse-soft">🌴</span>
            <span>Cartagena de Indias, Colombia</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-6">
            <FlipWords
              words={language === 'es' ? flipWordsEs : flipWordsEn}
              colors={flipColors}
              duration={2500}
            />
            <br />
            {t('hero.titleRest')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <motion.a
              href="#experiencias"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-ocean text-primary-foreground font-bold text-lg rounded-full shadow-button hover:shadow-card-hover transition-shadow duration-300"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            >
              {t('hero.cta')}
              <span className="text-xl">→</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-24 left-0 right-0 flex flex-col items-center gap-2 text-primary-foreground/80 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-sm font-medium">{t('hero.scroll')}</span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 -mb-px">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path
            d="M0 50L48 45C96 40 192 30 288 35C384 40 480 60 576 65C672 70 768 60 864 50C960 40 1056 30 1152 35C1248 40 1344 60 1392 70L1440 80V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}
