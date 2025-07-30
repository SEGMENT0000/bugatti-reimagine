import { useState, useEffect } from 'react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className="absolute top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Bugatti Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/bugatti-logo.svg" 
              alt="Bugatti Logo" 
              className="w-8 h-8 md:w-10 md:h-10 object-contain filter brightness-0 invert"
            />
            <div className="text-xl md:text-2xl font-bold text-white tracking-wider">
              BUGATTI
            </div>
          </div>

          
          <div className="hidden md:flex items-center space-x-12">
            <button 
              onClick={() => scrollToSection('models')}
              className="text-sm text-white/70 hover:text-white transition-colors duration-300 uppercase tracking-wider font-light"
            >
              Models
            </button>
            <button 
              onClick={() => scrollToSection('performance')}
              className="text-sm text-white/70 hover:text-white transition-colors duration-300 uppercase tracking-wider font-light"
            >
              Performance
            </button>

          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button className="text-white/70 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;