import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

const translations: Translations = {
  // Header
  'nav.experiences': { es: 'Experiencias', en: 'Experiences' },
  'nav.islands': { es: 'Islas', en: 'Islands' },
  'nav.culture': { es: 'Cultura', en: 'Culture' },
  'nav.testimonials': { es: 'Testimonios', en: 'Testimonials' },
  'nav.faq': { es: 'FAQ', en: 'FAQ' },
  
  // Hero
  'hero.title': { es: 'Descubre Cartagena como nunca antes', en: 'Discover Cartagena like never before' },
  'hero.subtitle': { es: 'Vive experiencias únicas en el Caribe colombiano. Playas paradisíacas, historia colonial y aventuras inolvidables te esperan.', en: 'Live unique experiences in the Colombian Caribbean. Paradise beaches, colonial history and unforgettable adventures await you.' },
  'hero.cta': { es: 'Explorar experiencias', en: 'Explore experiences' },
  'hero.scroll': { es: 'Desliza para descubrir', en: 'Scroll to discover' },
  
  // Categories
  'categories.title': { es: 'Experiencias Destacadas', en: 'Featured Experiences' },
  'categories.subtitle': { es: 'Elige tu aventura perfecta', en: 'Choose your perfect adventure' },
  'cat.islands': { es: 'Islas', en: 'Islands' },
  'cat.islands.desc': { es: 'Playas paradisíacas y snorkel', en: 'Paradise beaches & snorkel' },
  'cat.culture': { es: 'Cultura', en: 'Culture' },
  'cat.culture.desc': { es: 'Historia y tours coloniales', en: 'History & colonial tours' },
  'cat.party': { es: 'Fiesta', en: 'Party' },
  'cat.party.desc': { es: 'Chivas y vida nocturna', en: 'Chivas & nightlife' },
  'cat.gastro': { es: 'Gastronomía', en: 'Gastronomy' },
  'cat.gastro.desc': { es: 'Sabores del Caribe', en: 'Caribbean flavors' },
  
  // Tours
  'tours.title': { es: 'Tours y Pasadías', en: 'Tours & Day Passes' },
  'tours.subtitle': { es: 'Experiencias seleccionadas para ti', en: 'Curated experiences for you' },
  'tours.duration': { es: 'Duración', en: 'Duration' },
  'tours.fullday': { es: 'Día completo', en: 'Full day' },
  'tours.halfday': { es: 'Medio día', en: 'Half day' },
  'tours.hours': { es: 'horas', en: 'hours' },
  'tours.book': { es: 'Reservar vía WhatsApp', en: 'Book via WhatsApp' },
  'tours.includes': { es: 'Incluye', en: 'Includes' },
  'tours.viewall': { es: 'Ver todos los tours', en: 'View all tours' },
  
  // Transport
  'transport.title': { es: 'Servicio de Transporte', en: 'Transportation Service' },
  'transport.desc': { es: 'Te recogemos en el aeropuerto, hotel o donde estés, y te llevamos a tus destinos y tours con total comodidad y puntualidad.', en: 'We pick you up at the airport, hotel or wherever you are, and take you to your destinations and tours with total comfort and punctuality.' },
  'transport.cta': { es: 'Cotizar Traslado', en: 'Quote Transfer' },
  
  // Testimonials
  'testimonials.title': { es: 'Lo que dicen nuestros viajeros', en: 'What our travelers say' },
  'testimonials.subtitle': { es: 'Más de 1000 reseñas positivas', en: 'Over 1000 positive reviews' },
  
  // FAQ
  'faq.title': { es: 'Preguntas Frecuentes', en: 'Frequently Asked Questions' },
  'faq.subtitle': { es: 'Todo lo que necesitas saber', en: 'Everything you need to know' },
  
  // Footer
  'footer.tagline': { es: 'Tu próxima aventura comienza aquí', en: 'Your next adventure starts here' },
  'footer.contact': { es: 'Contacto', en: 'Contact' },
  'footer.follow': { es: 'Síguenos', en: 'Follow us' },
  'footer.rights': { es: 'Todos los derechos reservados', en: 'All rights reserved' },
  
  // General
  'from': { es: 'Desde', en: 'From' },
  'person': { es: 'persona', en: 'person' },
  'backtotop': { es: 'Volver arriba', en: 'Back to top' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
