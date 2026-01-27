
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);

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
    if (tiersRef.current) observer.observe(tiersRef.current);
    if (securityRef.current) observer.observe(securityRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (tiersRef.current) observer.unobserve(tiersRef.current);
      if (securityRef.current) observer.unobserve(securityRef.current);
    };
  }, []);

  const pricingTiers = [
    {
      title: "3-Month Advance",
      fee: "6.25%",
      description: "Perfect for short-term projects or seasonal revenue gaps",
      features: [
        "6.25% flat fee on the total advance",
        "Repay over 3 months from earnings",
        "No compound interest or hidden fees",
        "Automatic repayments from platform"
      ],
      cta: "Apply Now",
      highlight: false
    },
    {
      title: "6-Month Advance",
      fee: "8%",
      description: "Ideal for medium-term investments in your content or business",
      features: [
        "8% flat fee on the total advance",
        "Repay over 6 months from earnings",
        "No compound interest or hidden fees",
        "Automatic repayments from platform"
      ],
      cta: "Apply Now",
      highlight: true
    },
    {
      title: "12-Month Advance",
      fee: "10%",
      description: "Best for long-term growth strategies and larger investments",
      features: [
        "10% flat fee on the total advance",
        "Repay over 12 months from earnings",
        "No compound interest or hidden fees",
        "Automatic repayments from platform"
      ],
      cta: "Apply Now",
      highlight: false
    }
  ];

  const securityFeatures = [
    "All payments are deducted directly from your subscription revenue—no stress, no manual payments.",
    "No personal liability—we only collect from your earnings, not personal assets."
  ];

  return (
    <section id="pricing" className="py-24 bg-[#EFE7E3] text-foreground">
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 
            ref={sectionRef} 
            className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-5 opacity-0 text-left text-foreground"
          >
            Pricing
          </h2>
          <p className="text-xl md:text-2xl text-foreground max-w-full opacity-0 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Our transparent pricing model is designed to help you grow without the stress of traditional financing.
          </p>
        </div>

        <div 
          ref={tiersRef} 
          className="grid md:grid-cols-3 gap-8 mb-16 opacity-0"
        >
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={cn(
                "bg-black border border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
                tier.highlight ? "border-2 ring-2 ring-white/50" : ""
              )}
            >
              <CardHeader className="pb-0">
                <CardTitle className="text-2xl font-bold text-white">{tier.title}</CardTitle>
                <p className="text-4xl font-bold mt-2 text-white">
                  {tier.fee} <span className="text-lg font-normal text-white/70">fee</span>
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-white/80 mb-6">{tier.description}</p>
                <ul className="space-y-3">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={cn(
                    "w-full",
                    tier.highlight 
                      ? "bg-white hover:bg-white/90 text-black" 
                      : "bg-black hover:bg-white/10 text-white border border-white"
                  )}
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'})}
                >
                  {tier.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div ref={securityRef} className="bg-black text-white p-8 md:p-12 rounded-xl mb-12 opacity-0 border border-white">
          <h3 className="heading-md mb-8 text-center text-white text-2xl font-bold">Secured Repayment</h3>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-6">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                <p className="text-white">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button 
            className={cn(
              "primary-button group",
              "bg-white hover:bg-white text-black"
            )}
            onClick={() => document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'})}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
