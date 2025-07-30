import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setScrollY(scrolled);

      // Fade out hero as user scrolls
      const opacity = Math.max(1 - scrolled / 500, 0);
      setHeroOpacity(opacity);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ opacity: heroOpacity }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          style={{
            transform: `translateY(${parallaxOffset}px) scale(1.15)`,
            width: '115%',
            height: '115%',
            marginLeft: '-7.5%',
            marginTop: '-7.5%'
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source 
              src="https://bugatti.imgix.net/677db9af00446b3d45384493/mistral-worldrecord-cut-2k.mp4?fm=mp4&w=1920&video-codec=av1&video-bitrate=2m" 
              type="video/mp4" 
            />
          </video>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(ellipse at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(0,0,0,0.3) 0%, 
            rgba(0,0,0,0.8) 100%)`
        }}
      />

      {/* Premium Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center px-8"
        >
          {/* Logo */}
          <motion.div 
            className="mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <img 
              src="/bugatti-logo.svg" 
              alt="Bugatti" 
              className="w-32 h-auto mx-auto filter brightness-0 invert"
            />
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-6xl md:text-8xl font-thin tracking-wider mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            BUGATTI
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl font-light tracking-widest mb-8 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            EXCELLENCE THROUGH PERFORMANCE
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-8 text-white/30 text-sm tracking-widest transform -rotate-90 origin-left">
        CRAFTSMANSHIP
      </div>
      <div className="absolute bottom-1/4 right-8 text-white/30 text-sm tracking-widest transform rotate-90 origin-right">
        INNOVATION
      </div>
    </section>
  );
}