
import React, { useRef, useEffect, useState } from 'react';

const InteractiveBugattiText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      observer.observe(container);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        observer.disconnect();
      };
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-20 md:py-32 lg:py-40 bg-black overflow-hidden border-t border-white/5"
    >
      {/* Very subtle background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-950/50 to-black" />
      
      <div className="relative z-10 flex items-center justify-center min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh]">
        {/* Hidden text layer - extremely subtle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 
            className={`text-[10vw] md:text-[12vw] lg:text-[15vw] xl:text-[18vw] font-thin text-transparent select-none transition-all duration-1500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              fontFamily: 'Playfair Display, serif',
              background: 'linear-gradient(135deg, rgba(15,15,15,0.6) 0%, rgba(8,8,8,0.8) 50%, rgba(15,15,15,0.6) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.08em',
              fontWeight: '100'
            }}
          >
            BUGATTI
          </h1>
        </div>

        {/* Revealed text layer - premium platinum effect with precise cursor tracking */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            maskImage: `radial-gradient(circle 180px at ${mousePosition.x}px ${mousePosition.y}px, white 0%, white 35%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 180px at ${mousePosition.x}px ${mousePosition.y}px, white 0%, white 35%, transparent 100%)`,
          }}
        >
          <h1 
            className="text-[10vw] md:text-[12vw] lg:text-[15vw] xl:text-[18vw] font-thin select-none"
            style={{
              fontFamily: 'Playfair Display, serif',
              background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 20%, #ffffff 40%, #f0f0f0 60%, #e5e5e5 80%, #f8f8f8 100%)',
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.08em',
              fontWeight: '100',
              textShadow: '0 0 60px rgba(255,255,255,0.2)',
              filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.15))',
              animation: 'shimmer 6s ease-in-out infinite'
            }}
          >
            BUGATTI
          </h1>
        </div>

        {/* Precise cursor light effect */}
        <div 
          className="absolute pointer-events-none rounded-full transition-opacity duration-200"
          style={{
            left: mousePosition.x - 90,
            top: mousePosition.y - 90,
            width: 180,
            height: 180,
            background: `radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)`,
            opacity: isVisible ? 1 : 0
          }}
        />
      </div>

      {/* Minimal side ornaments */}
      <div className="absolute top-1/2 left-4 md:left-8 text-white/10 text-xs tracking-[0.4em] transform -rotate-90 origin-left font-extralight">
        LEGACY
      </div>
      <div className="absolute top-1/2 right-4 md:right-8 text-white/10 text-xs tracking-[0.4em] transform rotate-90 origin-right font-extralight">
        ARTISTRY
      </div>

      {/* Bottom signature line */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default InteractiveBugattiText;
