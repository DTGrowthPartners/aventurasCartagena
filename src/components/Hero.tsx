import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-0">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/ChatGPT Image 20 ene 2026, 05_10_48 p.m..png')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/30 to-navy/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center px-4 -mt-20">
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-6">
            <span className="animate-pulse-soft">🌴</span>
            <span>Cartagena de Indias, Colombia</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-6">
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTA Button */}
          <a
            href="#experiencias"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-ocean text-primary-foreground font-bold text-lg rounded-full shadow-button hover:shadow-card-hover transition-all duration-300 hover:scale-105"
          >
            {t('hero.cta')}
            <span className="text-xl">→</span>
          </a>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-0 right-0 flex flex-col items-center gap-2 text-primary-foreground/80 animate-float z-10">
        <span className="text-sm font-medium">{t('hero.scroll')}</span>
        <ChevronDown className="w-6 h-6" />
      </div>

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
