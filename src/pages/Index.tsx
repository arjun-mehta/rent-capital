
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
  // Static navigation without animations
  const handleSectionScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Header offset
        behavior: 'auto'
      });
    }
  };

  // Add global click handler for anchor links
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
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
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-grow">
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
