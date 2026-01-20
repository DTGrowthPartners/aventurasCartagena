import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Car, Plane, MapPin } from 'lucide-react';

export function TransportSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-gradient-ocean text-primary-foreground">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icons */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
              <Plane className="w-7 h-7" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
              <Car className="w-7 h-7" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
              <MapPin className="w-7 h-7" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('transport.title')}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('transport.desc')}
          </p>

          {/* CTA */}
          <a
            href="https://wa.me/573001234567?text=Hola!%20Quiero%20cotizar%20un%20traslado"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-foreground text-primary font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            {t('transport.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
