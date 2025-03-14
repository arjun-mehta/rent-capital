
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhoWeHelp from "@/components/WhoWeHelp";
import WhyCreatorCapital from "@/components/WhyCreatorCapital";
import PricingSection from "@/components/PricingSection";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  // Static link handling without animations or smooth scrolling
  const handleSectionScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Use static positioning with no animation
      const yOffset = -80; // Header offset
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'auto'});
    }
  };

  // Add global click handler for anchor links
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Find the closest anchor tag if the target isn't an anchor
      const anchor = target.tagName === 'A' ? target as HTMLAnchorElement : target.closest('a');
      
      if (anchor && anchor instanceof HTMLAnchorElement && anchor.hash) {
        e.preventDefault();
        const sectionId = anchor.hash.substring(1);
        handleSectionScroll(sectionId);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full" style={{overflow: 'auto', position: 'static'}}>
      <Header />
      <main className="flex-grow relative" style={{overflow: 'auto', position: 'static'}}>
        <Hero />
        <HowItWorks />
        <WhoWeHelp />
        <WhyCreatorCapital />
        <PricingSection />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
