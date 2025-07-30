import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative min-h-screen bg-neutral-900 py-32"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div 
          className={`text-center mb-20 transition-all duration-1500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-xs tracking-[0.4em] text-white/60 uppercase mb-8">
            Get In Touch
          </div>
          <h2 className="clean-title text-6xl md:text-8xl font-thin text-white mb-6 tracking-tight">
            Contact
          </h2>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div 
            className={`minimal-card p-12 border border-white/10 transition-all duration-1500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-white/80 text-sm font-light mb-4 tracking-wider uppercase">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="minimal-input w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-white/40 focus:border-white/60 focus:outline-none transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-light mb-4 tracking-wider uppercase">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="minimal-input w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-white/40 focus:border-white/60 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-light mb-4 tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="minimal-input w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-white/40 focus:border-white/60 focus:outline-none resize-none transition-colors"
                  placeholder="Tell us about your interest in Bugatti"
                />
              </div>

              <div className="pt-8">
                <Button 
                  type="submit"
                  variant="outline"
                  className="minimal-button w-full py-4 text-sm font-light tracking-wider uppercase border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div 
          className={`text-center mt-16 transition-all duration-1500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ animationDelay: '600ms' }}
        >
          <div className="text-sm text-white/60 mb-2">
            Molsheim, France
          </div>
          <div className="text-xs text-white/40 tracking-wider">
            Château Saint Jean
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;