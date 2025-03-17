
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhoWeHelp from "@/components/WhoWeHelp";
import PricingSection from "@/components/PricingSection";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  // This useEffect is no longer needed as we're handling scroll in the Header component
  
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCF7F0]">
      <Header />
      <main className="flex-grow pt-16"> {/* Add padding to top to prevent content from being under the header */}
        <Hero />
        <HowItWorks />
        <WhoWeHelp />
        <PricingSection />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
