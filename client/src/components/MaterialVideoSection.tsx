
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MaterialVideoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section 
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden"
      style={{ opacity }}
    >
      {/* Main Video Container */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ 
            filter: 'brightness(0.85) contrast(1.1) saturate(1.05)',
            willChange: 'transform'
          }}
        >
          <source 
            src="https://bugatti.imgix.net/6763427bad318605746972ad/tourbillon-modelpage-entry_material_d.mp4?fm=mp4&w=1920&video-codec=av1&video-bitrate=2m" 
            type="video/mp4" 
          />
        </video>
      </motion.div>

      {/* Creative Geometric Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Corner Frames */}
        <motion.div
          className="absolute top-8 left-8 w-16 h-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-full h-0.5 bg-white/30"></div>
          <div className="w-0.5 h-full bg-white/30 absolute top-0 left-0"></div>
        </motion.div>

        <motion.div
          className="absolute top-8 right-8 w-16 h-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <div className="w-full h-0.5 bg-white/30 absolute top-0 right-0"></div>
          <div className="w-0.5 h-full bg-white/30 absolute top-0 right-0"></div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-8 w-16 h-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="w-full h-0.5 bg-white/30 absolute bottom-0 left-0"></div>
          <div className="w-0.5 h-full bg-white/30 absolute bottom-0 left-0"></div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 right-8 w-16 h-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <div className="w-full h-0.5 bg-white/30 absolute bottom-0 right-0"></div>
          <div className="w-0.5 h-full bg-white/30 absolute bottom-0 right-0"></div>
        </motion.div>

        {/* Center Crosshair */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <div className="w-8 h-0.5 bg-white/20 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          <div className="w-0.5 h-8 bg-white/20 absolute top-1/2 left-0 transform -translate-y-1/2"></div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { 
            opacity: [0.3, 0.6, 0.3], 
            y: [0, -10, 0],
            scale: [1, 1.2, 1]
          } : { opacity: 0, y: 20 }}
          transition={{ 
            duration: 3, 
            delay: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-white/25 rounded-full"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { 
            opacity: [0.25, 0.5, 0.25], 
            y: [0, 15, 0],
            scale: [1, 1.3, 1]
          } : { opacity: 0, y: -20 }}
          transition={{ 
            duration: 4, 
            delay: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Subtle Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 0.05 } : { opacity: 0 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        </motion.div>
      </div>

      

      {/* Breathing Light Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"
        animate={isVisible ? {
          opacity: [0.1, 0.3, 0.1]
        } : { opacity: 0.1 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

    </motion.section>
  );
};

export default MaterialVideoSection;
