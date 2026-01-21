import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Categories } from '@/components/Categories';
import { ToursSection } from '@/components/ToursSection';
import { TransportSection } from '@/components/TransportSection';
import { Testimonials } from '@/components/Testimonials';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';
import { Construction } from 'lucide-react';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Categories />
          <ToursSection />
          <TransportSection />
          <Testimonials />
          <FAQSection />
        </main>
        <Footer />

        {/* Under Construction Badge */}
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-yellow-500/90 text-white text-xs font-medium shadow-lg backdrop-blur-sm animate-bounce">
          <Construction className="w-4 h-4" />
          <span>Sitio en construcción</span>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Index;
