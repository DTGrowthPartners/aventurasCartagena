import { useState } from 'react';
import { MessageCircle, Clock, Check, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface Tour {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  duration: string;
  durationEn: string;
  priceUSD: number;
  priceCOP: number;
  includes: string[];
  includesEn: string[];
  category: 'islands' | 'baru' | 'tierrabomba' | 'sanbernardo' | 'city' | 'sunset' | 'outside' | 'yachts' | 'nighttour' | 'santamarta';
  whatsappMessage: string;
}

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const { language, t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const name = language === 'es' ? tour.name : tour.nameEn;
  const description = language === 'es' ? tour.description : tour.descriptionEn;
  const duration = language === 'es' ? tour.duration : tour.durationEn;
  const includes = language === 'es' ? tour.includes : tour.includesEn;

  const isLongDescription = description.length > 80 || description.includes('\n');
  const isYacht = tour.category === 'yachts';

  const formatCOP = (price: number) => {
    const formatted = new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
    return `COP $${formatted}`;
  };

  const whatsappUrl = `https://wa.me/573042455362?text=${encodeURIComponent(tour.whatsappMessage)}`;

  return (
    <>
      <div className="group flex flex-col bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50">
        {/* Image */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src={tour.image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />

          {/* Price Badge */}
          {!isYacht && (
            <div className="absolute bottom-4 left-4 flex flex-col">
              <span className="text-xs text-primary-foreground/80">{t('from')}</span>
              <span className="text-2xl font-bold text-primary-foreground">
                ${tour.priceUSD} <span className="text-sm font-normal">USD</span>
              </span>
              <span className="text-xs text-primary-foreground/80">
                ~{formatCOP(tour.priceCOP)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">
            {name}
          </h3>

          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>

          {/* Description */}
          <div className="mb-4 flex-1">
            <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-2">
              {description}
            </p>
            {isLongDescription && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1 text-xs text-palm hover:text-palm/80 font-medium mt-1 transition-colors"
              >
                {language === 'es' ? 'Ver más' : 'See more'}
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Includes */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2 block">
              {t('tours.includes')}:
            </span>
            <div className="flex flex-wrap gap-2">
              {includes.slice(0, 3).map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                >
                  <Check className="w-3 h-3 text-palm" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-palm hover:bg-palm/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <MessageCircle className="w-5 h-5" />
            {t('tours.book')}
          </a>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold pr-8">{name}</DialogTitle>
          </DialogHeader>

          {/* Modal Image */}
          <div className="relative h-48 md:h-64 rounded-xl overflow-hidden -mx-2">
            <img
              src={tour.image}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            {!isYacht && (
              <div className="absolute bottom-4 left-4 flex flex-col">
                <span className="text-2xl font-bold text-primary-foreground">
                  ${tour.priceUSD} <span className="text-sm font-normal">USD</span>
                </span>
                <span className="text-sm text-primary-foreground/80">
                  ~{formatCOP(tour.priceCOP)}
                </span>
              </div>
            )}
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">
              {language === 'es' ? 'Descripción' : 'Description'}
            </h4>
            <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
              {description}
            </p>
          </div>

          {/* All Includes */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">
              {t('tours.includes')}:
            </h4>
            <div className="flex flex-wrap gap-2">
              {includes.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 text-sm bg-muted text-muted-foreground px-3 py-1.5 rounded-full"
                >
                  <Check className="w-4 h-4 text-palm" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* WhatsApp Button in Modal */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-palm hover:bg-palm/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] mt-2"
          >
            <MessageCircle className="w-5 h-5" />
            {t('tours.book')}
          </a>
        </DialogContent>
      </Dialog>
    </>
  );
}
