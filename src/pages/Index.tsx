
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhoWeHelp from "@/components/WhoWeHelp";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  // Handle smooth scrolling with proper header offset
  const handleSectionScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Header offset
        behavior: 'smooth'
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
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
