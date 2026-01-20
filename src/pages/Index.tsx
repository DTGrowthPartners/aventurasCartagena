import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Categories } from '@/components/Categories';
import { ToursSection } from '@/components/ToursSection';
import { TransportSection } from '@/components/TransportSection';
import { Testimonials } from '@/components/Testimonials';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';

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
      </div>
    </LanguageProvider>
  );
};

export default Index;
