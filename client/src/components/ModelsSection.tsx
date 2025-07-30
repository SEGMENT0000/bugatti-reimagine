
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ModelsSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const models = [
    {
      name: 'Chiron Super Sport',
      series: 'Hypercar Excellence',
      power: '1,600',
      speed: '490',
      torque: '1,600',
      acceleration: '2.4',
      year: '2021',
      description: 'The absolute pinnacle of automotive performance and luxury craftsmanship.',
      image: 'https://i.pinimg.com/736x/7d/19/30/7d19307ec604445b07fe026eb5e489e9.jpg'
    },
    {
      name: 'Divo',
      series: 'Track Precision',
      power: '1,500',
      speed: '380',
      torque: '1,600',
      acceleration: '2.4',
      year: '2018',
      description: 'Engineered for the racetrack with uncompromising aerodynamic performance.',
      image: 'https://c4.wallpaperflare.com/wallpaper/511/654/491/background-front-view-hypercar-divo-wallpaper-preview.jpg'
    },
    {
      name: 'Centodieci',
      series: 'Heritage Collection',
      power: '1,600',
      speed: '380',
      torque: '1,600',
      acceleration: '2.4',
      year: '2019',
      description: 'A modern interpretation of the legendary EB110, limited to 10 examples.',
      image: 'https://i.pinimg.com/736x/c6/05/09/c605091e86cb8eab74380d1041b946e3.jpg'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="models" 
      className="relative bg-gradient-to-b from-black via-zinc-950 to-black py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/30" />
            <div className="mx-6 text-[10px] sm:text-xs tracking-[0.5em] text-white/50 uppercase font-extralight">
              Automotive Artistry
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/30" />
          </div>
          <h2 className="bugatti-title text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white tracking-[0.1em] leading-none mb-6">
            COLLECTION
          </h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-1 h-1 bg-white/40 rotate-45" />
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="w-1 h-1 bg-white/40 rotate-45" />
          </div>
        </motion.div>

        {/* Models Showcase */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {models.map((model, index) => (
            <motion.div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              style={{ 
                gridTemplateColumns: index % 2 === 1 ? '1fr 1fr' : '1fr 1fr',
                direction: index % 2 === 1 ? 'rtl' : 'ltr'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            >
              {/* Model Image */}
              <div className={`relative group ${index % 2 === 1 ? 'lg:order-2' : ''}`} style={{ direction: 'ltr' }}>
                <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] overflow-hidden bg-black border border-white/10 shadow-2xl">
                  <img 
                    src={model.image}
                    alt={model.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
                  
                  {/* Premium corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20" />
                </div>
              </div>

              {/* Model Details */}
              <div className={`space-y-6 sm:space-y-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`} style={{ direction: 'ltr' }}>
                <div className="relative">
                  {/* Royal accent line */}
                  <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                  
                  <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                    <div className="w-2 h-2 border border-white/30 rotate-45" />
                    <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-[0.3em] font-extralight">
                      {model.series}
                    </div>
                  </div>
                  
                  <h3 className="bugatti-title text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white tracking-[0.05em] mb-3 sm:mb-4 leading-tight">
                    {model.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-6 sm:mb-8">
                    <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-[0.2em] font-light">
                      Anno Domini
                    </div>
                    <div className="text-sm sm:text-base text-white/80 font-light">
                      {model.year}
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed font-extralight max-w-md italic">
                    {model.description}
                  </p>
                </div>

                {/* Performance Stats */}
                <div className="pt-8 sm:pt-10">
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-px bg-white/30" />
                    <div className="mx-3 text-[9px] text-white/50 uppercase tracking-[0.4em] font-extralight">
                      Performance
                    </div>
                    <div className="w-3 h-px bg-white/30" />
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                    <div className="text-center sm:text-left group">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white mb-2 group-hover:text-white/90 transition-colors">
                        {model.power}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-[0.3em] font-extralight">
                        Horsepower
                      </div>
                    </div>
                    <div className="text-center sm:text-left group">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white mb-2 group-hover:text-white/90 transition-colors">
                        {model.speed}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-[0.3em] font-extralight">
                        Top Speed
                      </div>
                    </div>
                    <div className="text-center sm:text-left group">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white mb-2 group-hover:text-white/90 transition-colors">
                        {model.torque}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-[0.3em] font-extralight">
                        Torque
                      </div>
                    </div>
                    <div className="text-center sm:text-left group">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white mb-2 group-hover:text-white/90 transition-colors">
                        {model.acceleration}s
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-[0.3em] font-extralight">
                        0-100 KM/H
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explore Button */}
                <div className="pt-6 sm:pt-8">
                  <button className="group relative inline-flex items-center space-x-4 text-white/70 hover:text-white transition-all duration-500 overflow-hidden">
                    <div className="relative">
                      <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-extralight">
                        Explore Excellence
                      </span>
                      <div className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-px bg-white/20 group-hover:w-10 group-hover:bg-white/50 transition-all duration-500" />
                      <div className="w-1 h-1 bg-white/30 rotate-45 group-hover:bg-white/60 transition-colors duration-300" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Accent */}
        <motion.div 
          className="flex justify-center mt-16 sm:mt-20 lg:mt-24"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="w-1 h-16 sm:h-20 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default ModelsSection;
