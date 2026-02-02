import { useState, useEffect } from 'react';
import { Facebook, Instagram, X, ChevronLeft, ChevronRight, Globe, Star } from 'lucide-react';
import { trackPageView, trackContact, trackLead } from '@/lib/metaConversionsAPI';

// WhatsApp official logo SVG component
const WhatsAppIcon = ({ className = "w-6 h-6", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill={style?.color || 'currentColor'} className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const galleryImages = [
  '/images/Av1.jpg',
  '/images/Av2.jpg',
  '/images/Av3.jpg',
  '/images/Av4.jpg',
  '/images/AV5.jpg',
  '/images/AV6.jpg',
  '/images/Av7.jpg',
  '/images/Av8.jpg',
  '/images/Av9.jpg',
];

const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/p/Aventuras-Cartagena-100078808808542/', icon: Facebook, color: '#1877f2' },
  { name: 'Instagram', url: 'https://www.instagram.com/aventuras_cartagenaa', icon: Instagram, color: '#e4405f' },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@aventurascartagena',
    color: '#000000',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
  },
  { name: 'WhatsApp', url: 'https://api.whatsapp.com/send/?phone=573042455362&text=Hola!%20Vengo%20de%20la%20p%C3%A1gina%20de%20links%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.', icon: WhatsAppIcon, color: '#25d366' },
  { name: 'Sitio Web', url: '/', icon: Globe, color: '#1f2937' },
];

const serviceImages = [
  '/images/Islas.avif',       // Tours y Pasadías
  '/images/Atardecer.jpg',    // Atardeceres
  '/images/Tour Nocturno.jpg', // Tour Nocturno
  '/images/Chiva.jpg',        // Chivas
  '/images/Yate.jpg',         // Yates
];

const reviews = [
  {
    name: 'Ashley Arocha',
    rating: 5,
    time: '2 semanas',
    text: 'Excelente atención, un lugar agradable para compartir en familia.',
  },
  {
    name: 'Ana Rosa Morales',
    rating: 5,
    time: '4 meses',
    text: 'Contratamos 5 islas con Encanto y atardecer en Catamarán todo maravilloso, cumplieron con todo lo ofrecido, muy recomendados.',
  },
  {
    name: 'Luis Cardona',
    rating: 5,
    time: '2 semanas',
    text: 'Excelente atención, muy recomendados para las actividades en Cartagena.',
  },
];

const translations = {
  es: {
    subtitle: 'Tu aventura caribeña comienza aquí',
    galleryTitle: 'MOMENTOS INOLVIDABLES',
    reviewsTitle: 'LO QUE DICEN NUESTROS CLIENTES',
    poweredBy: 'Hecho con tecnología de',
    chatWith: 'Escríbenos',
    requestWhatsApp: 'Solicitar en WhatsApp',
    servicesList: [
      { title: 'Tours y Pasadías', message: 'Tours y Pasadías', desc: 'Islas paradisíacas' },
      { title: 'Atardeceres', message: 'Atardeceres', desc: 'Vistas mágicas' },
      { title: 'Tour Nocturno', message: 'Tour Nocturno', desc: 'La ciudad de noche' },
      { title: 'Chivas', message: 'Servicio de Chivas', desc: 'Fiesta sobre ruedas' },
      { title: 'Yates', message: 'Servicio de Yates', desc: 'Lujo en el mar' },
    ],
  },
  en: {
    subtitle: 'Your Caribbean adventure starts here',
    galleryTitle: 'UNFORGETTABLE MOMENTS',
    reviewsTitle: 'WHAT OUR CLIENTS SAY',
    poweredBy: 'Powered by',
    chatWith: 'Chat with us',
    requestWhatsApp: 'Request on WhatsApp',
    servicesList: [
      { title: 'Tours & Trips', message: 'Tours & Day Trips', desc: 'Paradise islands' },
      { title: 'Sunsets', message: 'Sunsets', desc: 'Magical views' },
      { title: 'Night Tour', message: 'Night Tour', desc: 'City at night' },
      { title: 'Chivas', message: 'Chiva Party Bus', desc: 'Party on wheels' },
      { title: 'Yachts', message: 'Yacht Service', desc: 'Luxury at sea' },
    ],
  },
};

export default function Links() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [headerOpacity, setHeaderOpacity] = useState(1);

  const t = translations[language];

  // Track PageView on mount
  useEffect(() => {
    trackPageView();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalOpen) {
        if (e.key === 'Escape') setModalOpen(false);
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 50;
      const fadeEnd = 200;

      if (scrollY <= fadeStart) {
        setHeaderOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setHeaderOpacity(0);
      } else {
        const opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setHeaderOpacity(opacity);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const changeImage = (direction: number) => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return galleryImages.length - 1;
      if (newIndex >= galleryImages.length) return 0;
      return newIndex;
    });
  };

  const handleWhatsApp = (message: string) => {
    // Track contact and lead
    trackContact();
    trackLead(message);

    const encoded = encodeURIComponent(`Hola! Vengo de la página de links y estoy interesado en *${message}*`);
    window.open(`https://api.whatsapp.com/send/?phone=573042455362&text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen text-gray-800 overflow-x-hidden relative">
      {/* Background - warm beach gradient */}
      <div
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(180deg, #87CEEB 0%, #FFE4B5 30%, #FFECD2 60%, #FCB69F 100%)',
        }}
      />

      {/* Decorative sun */}
      <div
        className="fixed top-10 right-10 w-32 h-32 rounded-full opacity-60 blur-sm"
        style={{
          background: 'radial-gradient(circle, #FFD700 0%, #FFA500 50%, transparent 70%)',
        }}
      />

      {/* Subtle wave pattern at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-40 opacity-20">
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill="#0099ff"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Language toggle */}
      <button
        onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
        className="fixed top-4 right-4 z-[100] flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300 hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, #f97316, #fb923c)',
          boxShadow: '0 4px 14px -2px rgba(249, 115, 22, 0.4)',
        }}
      >
        <span className="text-xl">{language === 'es' ? '🇪🇸' : '🇬🇧'}</span>
        <span className="text-sm font-bold text-white">
          {language === 'es' ? 'ES' : 'EN'}
        </span>
      </button>

      {/* Header Image - Cartagena skyline */}
      <div
        className="relative z-10 w-full h-96 md:h-[32rem] overflow-hidden transition-opacity duration-300"
        style={{ opacity: headerOpacity }}
      >
        <img
          src="/images/ChatGPT Image 20 ene 2026, 05_10_48 p.m..png"
          alt="Cartagena"
          className="w-full h-full object-cover md:object-[center_30%]"
          style={{ objectPosition: 'center 50%' }}
        />
        {/* Gradient overlay at bottom for transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to top, rgba(255,228,181,1) 0%, rgba(255,228,181,0.6) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen px-6 pb-10">

        {/* Header */}
        <div className="max-w-md mx-auto text-center mb-10">
          {/* Logo */}
          <div className="mb-6 -mt-72">
            <img
              src="/images/Aventura Recortado.png"
              alt="Aventuras Cartagena"
              className="w-52 md:w-72 h-auto mr-auto ml-[calc(50%-8px)] -translate-x-1/2 drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 0 5px black)' }}
            />
          </div>

          {/* Subtitle */}
          <p className="text-lg text-white font-medium" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            {t.subtitle} <span className="inline-block animate-bounce">🌴</span>
          </p>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-4 mb-10">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl hover:bg-white/90 transition-all duration-300"
            >
              <social.icon className="w-6 h-6" style={{ color: social.color }} />
            </a>
          ))}
        </div>

        {/* Services - Large cards with images */}
        <div className="max-w-sm sm:max-w-2xl mx-auto mb-10 mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.servicesList.map((service, i) => (
              <button
                key={`${language}-${i}`}
                onClick={() => handleWhatsApp(service.message)}
                className="service-card group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Image container */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={serviceImages[i]}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/20 transition-all duration-300" />
                </div>

                {/* Footer with title and subtitle - transparent showing page background */}
                <div
                  className="px-3 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                  style={{
                    background: 'rgba(255, 255, 255, 0.35)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="text-left">
                    <h3 className="text-gray-800 font-bold text-sm leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-orange-500 text-xs font-medium mt-0.5">
                      {service.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#25d366] px-2 py-1 rounded-full flex-shrink-0">
                    <span className="text-xs font-medium text-white sm:hidden">{t.requestWhatsApp}</span>
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Title */}
        <div className="text-center mb-6">
          <p className="text-xs tracking-[0.3em] text-gray-500 font-semibold uppercase">
            {t.galleryTitle}
          </p>
        </div>

        {/* Gallery - Infinite Marquee */}
        <div className="w-full mb-10 overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content">
              {/* First set of images */}
              {galleryImages.map((image, index) => (
                <button
                  key={`first-${index}`}
                  onClick={() => openModal(index)}
                  className="marquee-item relative aspect-square overflow-hidden rounded-xl shadow-md group hover:shadow-xl transition-all duration-300 flex-shrink-0"
                >
                  <img
                    src={image}
                    alt={`Momento ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </button>
              ))}
              {/* Duplicate set for seamless loop */}
              {galleryImages.map((image, index) => (
                <button
                  key={`second-${index}`}
                  onClick={() => openModal(index)}
                  className="marquee-item relative aspect-square overflow-hidden rounded-xl shadow-md group hover:shadow-xl transition-all duration-300 flex-shrink-0"
                >
                  <img
                    src={image}
                    alt={`Momento ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-lg mx-auto mb-10">
          {/* Reviews Title */}
          <div className="text-center mb-6">
            <p className="text-xs tracking-[0.3em] text-gray-500 font-semibold uppercase">
              {t.reviewsTitle}
            </p>
          </div>

          {/* Video */}
          <div className="mb-6 flex justify-center">
            <video
              src="/images/AventuraVId.mp4"
              controls
              preload="metadata"
              className="rounded-2xl shadow-lg max-h-[450px] w-auto"
            />
          </div>

          {/* Google Reviews - Slider */}
          <div className="reviews-slider-container overflow-hidden">
            <div className="reviews-slider flex gap-4">
              {/* First set */}
              {reviews.map((review, index) => (
                <div
                  key={`first-${index}`}
                  className="review-slide flex-shrink-0 w-[280px] rounded-2xl p-4 shadow-md"
                  style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                      style={{
                        background: 'linear-gradient(135deg, #f97316, #fb923c)',
                      }}
                    >
                      {review.name.charAt(0)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800 text-sm truncate">
                          {review.name}
                        </h4>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {review.time}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <img
                          src="https://www.google.com/favicon.ico"
                          alt="Google"
                          className="w-3.5 h-3.5 ml-1.5"
                        />
                      </div>

                      {/* Review text */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {reviews.map((review, index) => (
                <div
                  key={`second-${index}`}
                  className="review-slide flex-shrink-0 w-[280px] rounded-2xl p-4 shadow-md"
                  style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                      style={{
                        background: 'linear-gradient(135deg, #f97316, #fb923c)',
                      }}
                    >
                      {review.name.charAt(0)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800 text-sm truncate">
                          {review.name}
                        </h4>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {review.time}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <img
                          src="https://www.google.com/favicon.ico"
                          alt="Google"
                          className="w-3.5 h-3.5 ml-1.5"
                        />
                      </div>

                      {/* Review text */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="max-w-md mx-auto mb-10">
          <a
            href="https://api.whatsapp.com/send/?phone=573042455362&text=Hola!%20Vengo%20de%20la%20p%C3%A1gina%20de%20links%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackContact();
              trackLead('Links Page - General');
            }}
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#25d366]/90 backdrop-blur-sm text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-[#25d366] transition-all duration-300"
          >
            <WhatsAppIcon className="w-6 h-6" />
            <span className="text-lg">{t.chatWith}</span>
          </a>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-sm text-gray-500">
            {t.poweredBy}{' '}
            <a
              href="https://dtgrowthpartners.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              DT Growth Partners
            </a>
          </p>
        </footer>
      </div>

      {/* Gallery Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-[210]"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2 rounded-full bg-white/10 text-white text-sm z-10">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>

          {/* Main image */}
          <div
            className="relative w-full h-full flex items-center justify-center px-4 md:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[currentImageIndex]}
              alt="Galería"
              className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>

          {/* Mobile navigation */}
          <div className="absolute bottom-0 left-0 right-0 md:hidden flex items-center justify-center gap-4 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <button
              onClick={(e) => { e.stopPropagation(); changeImage(-1); }}
              className="flex-1 max-w-[140px] h-12 rounded-full bg-white/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
              <span className="text-sm text-white font-medium">Anterior</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); changeImage(1); }}
              className="flex-1 max-w-[140px] h-12 rounded-full bg-white/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span className="text-sm text-white font-medium">Siguiente</span>
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Desktop navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); changeImage(-1); }}
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); changeImage(1); }}
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Progress dots - desktop */}
          <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-2">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentImageIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        .service-card {
          animation: slide-up 0.5s ease-out backwards;
        }
        .service-card:nth-child(1) { animation-delay: 0s; }
        .service-card:nth-child(2) { animation-delay: 0.05s; }
        .service-card:nth-child(3) { animation-delay: 0.1s; }
        .service-card:nth-child(4) { animation-delay: 0.15s; }
        .service-card:nth-child(5) { animation-delay: 0.2s; }
        .service-card:nth-child(6) { animation-delay: 0.25s; }
        .service-card:nth-child(7) { animation-delay: 0.3s; }
        /* Reviews slider */
        .reviews-slider-container {
          width: 100%;
        }
        .reviews-slider {
          animation: reviews-marquee 20s linear infinite;
        }
        .reviews-slider:hover {
          animation-play-state: paused;
        }
        @keyframes reviews-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Marquee / Infinite carousel styles */
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }
        .marquee-content {
          display: flex;
          gap: 0.75rem;
          animation: marquee 12s linear infinite;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
        .marquee-item {
          width: 120px;
          height: 120px;
        }
        @media (min-width: 640px) {
          .marquee-item {
            width: 150px;
            height: 150px;
          }
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
