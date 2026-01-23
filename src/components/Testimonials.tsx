import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    text: 'Excelente atención, un lugar agradable para compartir en familia.',
    textEn: 'Excellent service, a nice place to share with family.',
    author: 'Ashley Arocha',
    location: 'Google Review ⭐',
    rating: 5,
    isGoogle: true,
  },
  {
    id: 2,
    text: 'Contratamos 5 islas con Encanto y atardecer en Catamarán todo maravilloso, cumplieron con todo lo ofrecido, muy recomendados.',
    textEn: 'We booked 5 islands with Encanto and catamaran sunset, everything was wonderful, they delivered everything promised, highly recommended.',
    author: 'Ana Rosa Morales',
    location: 'Google Review ⭐',
    rating: 5,
    isGoogle: true,
  },
  {
    id: 3,
    text: 'Excelente atención, muy recomendados para las actividades en Cartagena.',
    textEn: 'Excellent service, highly recommended for activities in Cartagena.',
    author: 'Luis Cardona',
    location: 'Google Review ⭐',
    rating: 5,
    isGoogle: true,
  },
  {
    id: 4,
    text: 'Tuve una experiencia increíble con Aventura Cartagena. Súper confiables, organizados y atentos con cada detalle. Los precios fantásticos en comparación con otras opciones y sin sacrificar calidad ni servicio… ¡Volvería a elegirlos sin dudarlo!',
    textEn: 'I had an incredible experience with Aventura Cartagena. Super reliable, organized and attentive to every detail. Fantastic prices compared to other options without sacrificing quality or service... I would choose them again without hesitation!',
    author: 'Paula C.',
    location: 'Argentina 🇦🇷',
    rating: 5,
  },
  {
    id: 5,
    text: 'This was my first time in Cartagena, and the tour exceeded my expectations. The staff was friendly and knowledgeable. I felt safe and had so much fun exploring the islands. Absolutely recommended!',
    textEn: 'This was my first time in Cartagena, and the tour exceeded my expectations. The staff was friendly and knowledgeable. I felt safe and had so much fun exploring the islands. Absolutely recommended!',
    author: 'Michael G.',
    location: 'USA 🇺🇸',
    rating: 5,
  },
  {
    id: 6,
    text: 'El tour al Volcán del Totumo fue súper divertido. Todo muy bien organizado desde la recogida hasta el regreso. El guía muy amable y conocedor. 100% recomendado para quienes buscan algo diferente.',
    textEn: 'The Totumo Volcano tour was super fun. Everything very well organized from pickup to return. The guide was very friendly and knowledgeable. 100% recommended for those looking for something different.',
    author: 'Carlos M.',
    location: 'México 🇲🇽',
    rating: 5,
  },
  {
    id: 7,
    text: 'Amazing sunset cruise! The catamaran was beautiful, drinks were flowing, and the views were absolutely stunning. Perfect way to spend an evening in Cartagena.',
    textEn: 'Amazing sunset cruise! The catamaran was beautiful, drinks were flowing, and the views were absolutely stunning. Perfect way to spend an evening in Cartagena.',
    author: 'Sarah L.',
    location: 'Canada 🇨🇦',
    rating: 5,
  },
  {
    id: 8,
    text: 'Pasamos un día espectacular en las Islas del Rosario. El beach club era hermoso, la comida deliciosa y el servicio impecable. Ya estamos planeando volver el próximo año.',
    textEn: 'We spent a spectacular day at Rosario Islands. The beach club was beautiful, the food delicious and the service impeccable. We are already planning to return next year.',
    author: 'María José R.',
    location: 'Chile 🇨🇱',
    rating: 5,
  },
];

export function Testimonials() {
  const { language, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonios" className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('testimonials.title')} 🗣️
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('testimonials.subtitle')} ⭐
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <Quote className="absolute -top-4 -left-2 md:-left-8 w-12 h-12 md:w-16 md:h-16 text-primary/20" />

            {/* Testimonial Content */}
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card border border-border/50">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-opacity duration-500 ${
                    index === activeIndex ? 'block' : 'hidden'
                  }`}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-sand text-sand"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                    "{language === 'es' ? testimonial.text : testimonial.textEn}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-ocean flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground flex items-center gap-2">
                        {testimonial.author}
                        {testimonial.isGoogle && (
                          <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            className="w-4 h-4"
                          />
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Navigation */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-primary'
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
