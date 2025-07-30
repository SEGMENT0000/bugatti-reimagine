import { useState, useEffect, useRef } from 'react';

const FooterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      ref={sectionRef}
      className="relative bg-black py-24 border-t border-white/10"
    >
      <div className="container mx-auto px-6">
        <div 
          className={`transition-all duration-1500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Main Footer Content */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <img 
                src="/bugatti-logo.svg" 
                alt="Bugatti" 
                className="h-12 w-auto filter brightness-0 invert opacity-80"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed font-light max-w-2xl mx-auto">
              Since 1909, Bugatti has been synonymous with automotive excellence, 
              crafting the world's most extraordinary hypercars with uncompromising artistry.
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"></div>

          {/* Bottom Section */}
          <div className="text-center">
            <div className="text-white/40 text-xs tracking-wider uppercase mb-4">
              © 2024 Bugatti Automobiles S.A.S. • Concept Tribute
            </div>
            <div className="text-white/60 text-sm mb-4">
              Reimagined by{' '}
              <a 
                href="https://portfolioxayush.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors duration-300 underline decoration-white/30 hover:decoration-white/60"
              >
                AYUSH
              </a>
            </div>
          </div>

          {/* Signature Quote */}
          <div 
            className={`text-center mt-16 transition-all duration-2000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ animationDelay: '800ms' }}
          >
            <div className="text-white/30 text-xs italic tracking-wider font-light">
              "Nothing is too beautiful, nothing is too expensive"
            </div>
            <div className="text-white/20 text-xs mt-2 tracking-[0.4em] uppercase">
              — Ettore Bugatti
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;