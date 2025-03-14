
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
  // Direct link navigation without smooth scrolling
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Static positioning without animation
        window.scrollTo(0, element.offsetTop - 80);
      }
    }
  };

  // Add click handler to document for all anchor links
  React.useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleNavigation as unknown as EventListener);
    });

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleNavigation as unknown as EventListener);
      });
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
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
