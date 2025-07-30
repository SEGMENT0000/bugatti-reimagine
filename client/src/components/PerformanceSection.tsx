import { useState, useEffect, useRef } from 'react';

const PerformanceSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    power: 0,
    speed: 0,
    acceleration: 0
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateNumbers();
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const animateNumbers = () => {
    const targets = { power: 1600, speed: 490, acceleration: 24 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedNumbers({
        power: Math.floor(targets.power * easeOut),
        speed: Math.floor(targets.speed * easeOut),
        acceleration: Math.floor(targets.acceleration * easeOut) / 10
      });

      if (step >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);
  };

  return (
    <section 
      ref={sectionRef}
      id="performance" 
      className="relative min-h-screen bg-black py-32"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div 
          className={`text-center mb-20 transition-all duration-1500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-xs tracking-[0.4em] text-white/60 uppercase mb-8">
            Engineering Excellence
          </div>
          <h2 className="clean-title text-6xl md:text-8xl font-thin text-white mb-6 tracking-tight">
            Performance
          </h2>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div
            className={`text-center transition-all duration-1500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <div className="text-6xl md:text-7xl font-thin text-white mb-4">
              {animatedNumbers.power}
            </div>
            <div className="text-sm text-white/60 uppercase tracking-[0.3em]">
              Horsepower
            </div>
            <div className="text-xs text-white/40 mt-2">
              W16 Quad-Turbo
            </div>
          </div>

          <div
            className={`text-center transition-all duration-1500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ animationDelay: '600ms' }}
          >
            <div className="text-6xl md:text-7xl font-thin text-white mb-4">
              {animatedNumbers.speed}
            </div>
            <div className="text-sm text-white/60 uppercase tracking-[0.3em]">
              KM/H Top Speed
            </div>
            <div className="text-xs text-white/40 mt-2">
              Speed Record
            </div>
          </div>

          <div
            className={`text-center transition-all duration-1500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ animationDelay: '900ms' }}
          >
            <div className="text-6xl md:text-7xl font-thin text-white mb-4">
              {animatedNumbers.acceleration}
            </div>
            <div className="text-sm text-white/60 uppercase tracking-[0.3em]">
              0-100 KM/H
            </div>
            <div className="text-xs text-white/40 mt-2">
              Acceleration
            </div>
          </div>
        </div>

        {/* Engineering Excellence */}
        <div 
          className={`mt-24 max-w-5xl mx-auto transition-all duration-1500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ animationDelay: '1200ms' }}
        >
          <div className="royal-card p-12">
            <div className="text-center mb-12">
              <h3 className="bugatti-title text-4xl text-white mb-4">
                Engineering Mastery
              </h3>
              <p className="text-white/70 text-lg font-light leading-relaxed max-w-3xl mx-auto">
                Every Bugatti represents the pinnacle of automotive artistry, where precision meets passion in pursuit of perfection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="text-white/90 mb-3 font-light tracking-wider uppercase text-sm">Engine</div>
                <div className="text-white/70 text-lg">8.0L W16 Quad-Turbo</div>
                <div className="text-white/50 text-xs mt-2">16 Cylinders • 4 Turbochargers</div>
              </div>
              <div className="text-center">
                <div className="text-white/90 mb-3 font-light tracking-wider uppercase text-sm">Transmission</div>
                <div className="text-white/70 text-lg">7-Speed DSG</div>
                <div className="text-white/50 text-xs mt-2">Dual-Clutch Technology</div>
              </div>
              <div className="text-center">
                <div className="text-white/90 mb-3 font-light tracking-wider uppercase text-sm">Drive System</div>
                <div className="text-white/70 text-lg">All-Wheel Drive</div>
                <div className="text-white/50 text-xs mt-2">Perfect Traction Control</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;