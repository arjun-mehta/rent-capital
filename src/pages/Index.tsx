
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

  // Generate static OpenGraph image for production
  useEffect(() => {
    // Only execute this in development mode to generate the image
    if (process.env.NODE_ENV === 'development') {
      const generateOgImage = async () => {
        console.log('Preparing to generate OpenGraph image...');
        // Wait for the hero section to be fully rendered
        setTimeout(async () => {
          const heroElement = document.getElementById('hero-section');
          if (heroElement) {
            try {
              console.log('Generating OpenGraph image...');
              const canvas = await html2canvas(heroElement, {
                scale: 2, // Higher resolution
                useCORS: true, // Allow images from other domains
                backgroundColor: '#FCF7F0',
                width: 1200, // Standard OG image width
                height: 630, // Standard OG image height
              });
              
              // Save as PNG for better quality
              const imageDataUrl = canvas.toDataURL('image/png', 1.0);
              console.log('OpenGraph image generated successfully');
              
              // Create a downloadable link for developers to save the image
              const link = document.createElement('a');
              link.download = 'og-image.png';
              link.href = imageDataUrl;
              link.click();
              
              console.log('You can now save this image to public/og-image.png for social sharing');
            } catch (error) {
              console.error('Error generating OpenGraph image:', error);
            }
          } else {
            console.error('Hero section element not found');
          }
        }, 3000); // Longer delay to ensure everything is rendered
      };
      
      generateOgImage();
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
