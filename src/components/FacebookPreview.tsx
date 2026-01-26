import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    FB: any;
  }
}

export function FacebookPreview() {
  const fbContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustWidth = () => {
      if (fbContainerRef.current) {
        const width = window.innerWidth < 768 ? Math.min(window.innerWidth - 40, 320) : 500;
        fbContainerRef.current.setAttribute('data-width', width.toString());
        // Re-parse the XFBML after changing width
        if (window.FB && window.FB.XFBML) {
          window.FB.XFBML.parse();
        }
      }
    };

    // Load Facebook SDK if not already loaded
    if (!window.FB) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.FB.init({
          xfbml: true,
          version: 'v18.0'
        });
        adjustWidth();
      };
    } else {
      // If SDK is already loaded, adjust width and parse
      adjustWidth();
    }

    // Adjust width on window resize
    window.addEventListener('resize', adjustWidth);
    return () => window.removeEventListener('resize', adjustWidth);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Mantente al día con las noticias sobre nuestros planes
            </h2>
            <p className="text-lg text-muted-foreground">
              Síguenos en Facebook para conocer las últimas ofertas, nuevos tours y experiencias exclusivas.
            </p>
          </div>

          {/* Facebook Page Plugin */}
          <div className="flex justify-center overflow-x-hidden">
            <div
              ref={fbContainerRef}
              className="fb-page max-w-full"
              data-href="https://www.facebook.com/p/Aventuras-Cartagena-100078808808542/"
              data-tabs="timeline"
              data-width=""
              data-height="600"
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            >
              <blockquote
                cite="https://www.facebook.com/p/Aventuras-Cartagena-100078808808542/"
                className="fb-xfbml-parse-ignore"
              >
                <a href="https://www.facebook.com/p/Aventuras-Cartagena-100078808808542/">
                  Aventuras Cartagena
                </a>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}