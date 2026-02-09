import { useEffect, useState, useRef } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Categories } from '@/components/Categories';
import { ToursSection } from '@/components/ToursSection';
import { TransportSection } from '@/components/TransportSection';
import { FacebookPreview } from '@/components/FacebookPreview';
import { Testimonials } from '@/components/Testimonials';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';
import { trackPageView } from '@/lib/metaConversionsAPI';

const Index = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track PageView on mount
  useEffect(() => {
    trackPageView();
  }, []);

  // Auto-play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Categories />
          <ToursSection />
          <TransportSection />
          <FacebookPreview />
          <Testimonials />
          <FAQSection />
        </main>
        <Footer />

        {/* Floating video - bottom left */}
        {showVideo && (
          <div className="fixed bottom-4 left-4 z-50">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-3 -right-3 z-20 w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg border border-white/30"
            >
              ✕
            </button>
            <div className="relative shadow-2xl rounded-xl overflow-hidden border-2 border-white/20 bg-black">
              <video
                ref={videoRef}
                src="/images/VideoAventuras.mp4"
                muted
                loop
                playsInline
                className="w-32 h-56 sm:w-48 sm:h-80 object-cover"
              />
              {/* Custom controls */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
                <button
                  onClick={() => {
                    if (!videoRef.current) return;
                    if (isPlaying) { videoRef.current.pause(); } else { videoRef.current.play(); }
                    setIsPlaying(!isPlaying);
                  }}
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><polygon points="5,3 19,12 5,21" /></svg>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (!videoRef.current) return;
                    videoRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }}
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  {isMuted ? (
                    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><path d="M11 5L6 9H2v6h4l5 4V5zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H2v6h4l5 4v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3z"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><path d="M3 9v6h4l5 4V5L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LanguageProvider>
  );
};

export default Index;
