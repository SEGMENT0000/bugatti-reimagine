import { useState, useEffect, useRef } from 'react';

const HeritageSection = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const timelineEvents = [
    {
      year: '1909',
      title: 'The Birth of Excellence',
      description: 'Ettore Bugatti founded the company with a vision to create the most beautiful and fastest automobiles in the world.',
      image: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=600&h=400&fit=crop'
    },
    {
      year: '1924',
      title: 'Type 35 Racing Legend',
      description: 'The Type 35 becomes the most successful racing car of all time, winning over 1,000 races.',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop'
    },
    {
      year: '1991',
      title: 'Revival Under Volkswagen',
      description: 'Volkswagen Group acquires Bugatti and begins the journey to recreate automotive legends.',
      image: 'https://images.unsplash.com/photo-1617886322486-e2bf4d1335b9?w=600&h=400&fit=crop'
    },
    {
      year: '2005',
      title: 'Veyron Revolution',
      description: 'The Veyron 16.4 redefines what\'s possible in automotive engineering with 1,001 horsepower.',
      image: 'https://images.unsplash.com/photo-1546768292-fb12f6c92568?w=600&h=400&fit=crop'
    },
    {
      year: '2016',
      title: 'Chiron Era Begins',
      description: 'The Chiron pushes boundaries further with 1,500 horsepower and revolutionary design.',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="heritage" 
      className="relative min-h-screen bg-gradient-to-b from-carbon-black via-navy-deep to-carbon-black py-32 overflow-hidden"
    >
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div 
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-silver-metallic/20 to-transparent rounded-full blur-3xl"
          style={{
            transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)`
          }}
        />
        <div 
          className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"
          style={{
            transform: `translateY(${scrollY * -0.15}px) rotate(${scrollY * -0.05}deg)`
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-20 transition-all duration-2000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="text-sm tracking-[0.6em] text-silver-metallic/80 uppercase mb-6">
            Since 1909
          </div>
          <h2 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tight leading-none">
            <span 
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              HERITAGE
            </span>
          </h2>
          <p className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
            More than a century of automotive artistry, innovation, and the relentless 
            pursuit of perfection that defines the Bugatti legacy.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`group mb-20 transition-all duration-1500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{
                animationDelay: `${index * 300}ms`,
                transform: `translateY(${scrollY * 0.02}px)`
              }}
            >
              <div className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                {/* Year Badge */}
                <div className="flex-shrink-0">
                  <div className="glass-panel px-8 py-4 text-center group-hover:scale-110 transition-all duration-500">
                    <div 
                      className="text-4xl font-black text-white mb-2"
                      style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {event.year}
                    </div>
                    <div className="w-16 h-0.5 bg-gradient-metallic mx-auto" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="glass-panel p-8 lg:p-12 rounded-2xl group-hover:scale-105 transition-all duration-700">
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-silver-metallic transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed mb-6">
                      {event.description}
                    </p>
                    <div className="flex items-center text-silver-metallic text-sm">
                      <div className="w-2 h-2 bg-silver-metallic rounded-full mr-3" />
                      <span>Milestone in Bugatti History</span>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-80 h-60 rounded-2xl overflow-hidden group-hover:scale-105 transition-all duration-700">
                    <img 
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legacy Stats */}
        <div 
          className={`glass-panel p-12 rounded-3xl max-w-5xl mx-auto mt-20 transition-all duration-2000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ animationDelay: '2000ms' }}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              Legacy in Numbers
            </h3>
            <p className="text-white/80 text-lg">
              Over a century of automotive excellence and innovation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '115+', label: 'Years of Excellence' },
              { value: '1000+', label: 'Racing Victories' },
              { value: '500+', label: 'Vehicles Produced' },
              { value: '4', label: 'World Speed Records' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div 
                  className="text-4xl font-black text-white mb-2 group-hover:text-silver-metallic transition-colors duration-500"
                  style={{
                    textShadow: '0 0 30px rgba(255,255,255,0.3)',
                    fontFamily: 'monospace'
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;