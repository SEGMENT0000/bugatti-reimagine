import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ModelsSection from '@/components/ModelsSection';
import ScrollVideoSection from '@/components/ScrollVideoSection';
import MaterialVideoSection from '@/components/MaterialVideoSection';
import PerformanceSection from '@/components/PerformanceSection';
import FooterSection from '@/components/FooterSection';
import ProtectionOverlay from '@/components/ProtectionOverlay';
import InteractiveBugattiText from "@/components/InteractiveBugattiText";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <HeroSection />
      <ModelsSection />
      <ScrollVideoSection />
      <MaterialVideoSection />
      <PerformanceSection />
      <FooterSection />
      <InteractiveBugattiText />
      <ProtectionOverlay />
    </div>
  );
};

export default Index;