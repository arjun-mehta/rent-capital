
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhoWeHelp from "@/components/WhoWeHelp";
import FAQ from "@/components/FAQ";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import html2canvas from "html2canvas";

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

  // Capture hero section as OpenGraph image
  useEffect(() => {
    // Only execute this in development/preview mode to generate the image
    if (process.env.NODE_ENV === 'development') {
      const captureHeroSection = async () => {
        const heroElement = document.getElementById('hero-section');
        if (heroElement) {
          try {
            console.log('Capturing hero section...');
            const canvas = await html2canvas(heroElement, {
              scale: 2, // Higher resolution
              useCORS: true, // Allow images from other domains
              logging: false,
            });
            
            // Convert to data URL
            const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
            console.log('Hero section captured as OpenGraph image:', imageDataUrl.substring(0, 50) + '...');
            
            // In a real app, you would save this image to your server
            // Here we just log it for demonstration
          } catch (error) {
            console.error('Error capturing hero section:', error);
          }
        }
      };
      
      // Wait for components to render fully
      setTimeout(captureHeroSection, 2000);
    }
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <WhoWeHelp />
        <FAQ />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
