
import { useState, useEffect, useRef, useCallback } from 'react';

const ScrollVideoSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>();

  const updateVideoTime = useCallback((progress: number) => {
    if (videoRef.current && videoRef.current.duration) {
      const targetTime = progress * videoRef.current.duration;
      // Only update if the difference is significant to reduce unnecessary updates
      if (Math.abs(videoRef.current.currentTime - targetTime) > 0.1) {
        videoRef.current.currentTime = targetTime;
      }
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      if (!sectionRef.current) {
        rafRef.current = undefined;
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress within the section
      const scrollTop = -rect.top;
      const scrollRange = sectionHeight - windowHeight;
      
      if (scrollTop >= 0 && scrollTop <= scrollRange) {
        const progress = Math.max(0, Math.min(1, scrollTop / scrollRange));
        setScrollProgress(progress);
        updateVideoTime(progress);
      }
      
      rafRef.current = undefined;
    });
  }, [updateVideoTime]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[150vh] bg-black overflow-hidden"
    >
      {/* Sticky video container */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center">
        <div 
          className={`relative w-full h-full transition-opacity duration-700 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Video element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
            style={{
              filter: `brightness(${0.8 + scrollProgress * 0.2})`,
              transform: `scale(${1 + scrollProgress * 0.05})`
            }}
          >
            <source 
              src="https://bugatti.imgix.net/6763385aed6f98152f573b1b/tourbillon-modelpage-02-scrollvideo-desktop.mp4" 
              type="video/mp4" 
            />
          </video>

          {/* Subtle gradient overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"
            style={{
              opacity: 0.4 - scrollProgress * 0.1
            }}
          />

          {/* Content overlay */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translateY(${scrollProgress * 30}px)`,
              opacity: Math.max(1 - scrollProgress * 1.5, 0)
            }}
          >
            <div className="text-center">
              <h2 
                className="text-5xl md:text-7xl font-light text-white mb-4 tracking-[0.1em]"
                style={{
                  transform: `scale(${1 + scrollProgress * 0.1})`
                }}
              >
                TOURBILLON
              </h2>
              <div 
                className="text-base md:text-lg text-white/60 uppercase tracking-[0.3em]"
                style={{
                  transform: `translateY(${scrollProgress * 15}px)`,
                  opacity: Math.max(1 - scrollProgress * 2, 0)
                }}
              >
                The Art of Engineering
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default ScrollVideoSection;
