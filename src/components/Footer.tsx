import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Instagram, Facebook, Mail, Phone } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌴</span>
              <span className="text-2xl font-bold">Aventura Cartagena</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              {t('footer.tagline')} 🏝️
            </p>
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-palm hover:bg-palm/90 text-primary-foreground font-semibold rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('footer.contact')}</h4>
            <div className="space-y-3">
              <a
                href="tel:+573001234567"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-5 h-5" />
                +57 300 123 4567
              </a>
              <a
                href="mailto:info@aventuracartagena.com"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@aventuracartagena.com
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('footer.follow')}</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2024 Aventura Cartagena. {t('footer.rights')}.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
          >
            {t('backtotop')} ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
