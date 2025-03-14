
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WhoWeHelp: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);
  const qualificationsRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (platformsRef.current) observer.observe(platformsRef.current);
    if (qualificationsRef.current) observer.observe(qualificationsRef.current);
    if (useCasesRef.current) observer.observe(useCasesRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (platformsRef.current) observer.unobserve(platformsRef.current);
      if (qualificationsRef.current) observer.unobserve(qualificationsRef.current);
      if (useCasesRef.current) observer.unobserve(useCasesRef.current);
    };
  }, []);

  const platforms = [
    { name: "Patreon", image: "/lovable-uploads/a115cdfd-da41-4f7d-b3a8-08194ecd9a70.png" },
    { name: "YouTube", image: "/lovable-uploads/48681725-4377-4e0b-acc6-3d9648ef158d.png" },
    { name: "Substack", image: "/lovable-uploads/1b16303a-1ae7-46b9-9573-972b844af9f1.png" },
    { name: "Twitch", image: "/lovable-uploads/ffdad90a-7332-4fbe-add4-1edb2c536b21.png" },
    { name: "Supercast", image: "/lovable-uploads/180032d6-e17b-4ef9-b1b4-735819d6e9a5.png" },
  ];

  const qualifications = [
    "You have consistent subscription revenue from engaged supporters.",
    "You've been earning for at least 6 months on your platform.",
    "You're generating $5,000+ per month in subscription revenue."
  ];

  const useCases = [
    "Hiring an editor, designer, or producer.",
    "Upgrading production equipment.",
    "Launching new content or a premium subscription tier.",
    "Creating & stocking merchandise.",
    "Funding live events, digital products, or marketing campaigns."
  ];

  return (
    <section id="who-we-help" className="py-24 bg-gray-50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="tag bg-black/5 text-black/80 mb-4">
            Eligibility
          </div>
          <h2 ref={sectionRef} className="heading-lg mb-6 opacity-0">
            If You Have Recurring Revenue, We Can Fund You
          </h2>
          <p className="paragraph text-gray-600 mx-auto max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            We specialize in providing financing to creators with predictable, subscription-based income streams.
          </p>
        </div>

        <div ref={platformsRef} className="mb-16 opacity-0">
          <h3 className="heading-md text-center mb-10">
            We fund creators with predictable, subscription-based earnings from:
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {platforms.map((platform, index) => (
              <div 
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-32"
              >
                <img 
                  src={platform.image} 
                  alt={platform.name} 
                  className="h-12 object-contain" 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div ref={qualificationsRef} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm opacity-0">
            <h3 className="heading-md mb-6">Who Qualifies?</h3>
            <ul className="space-y-4">
              {qualifications.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div ref={useCasesRef} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm opacity-0">
            <h3 className="heading-md mb-6">What You Can Use the Funding For:</h3>
            <ul className="space-y-4">
              {useCases.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button 
            className={cn(
              "primary-button group",
              "bg-black hover:bg-black/90"
            )}
            onClick={() => document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'})}
          >
            See If You Qualify
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
