
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const exampleRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
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
    if (exampleRef.current) observer.observe(exampleRef.current);
    if (pricingRef.current) observer.observe(pricingRef.current);
    if (securityRef.current) observer.observe(securityRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (exampleRef.current) observer.unobserve(exampleRef.current);
      if (pricingRef.current) observer.unobserve(pricingRef.current);
      if (securityRef.current) observer.unobserve(securityRef.current);
    };
  }, []);

  const securityFeatures = [
    "All payments are deducted directly from your subscription revenue—no stress, no manual payments.",
    "No personal liability—we only collect from your earnings, not personal assets."
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="tag bg-black/5 text-black/80 mb-4">
            Pricing & Terms
          </div>
          <h2 ref={sectionRef} className="heading-lg mb-6 opacity-0">
            Fair, Flexible, and Built for Growth
          </h2>
          <p className="paragraph text-gray-600 mx-auto max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Our transparent pricing model is designed to help you grow without the stress of traditional financing.
          </p>
        </div>

        <div ref={exampleRef} className="grid md:grid-cols-2 gap-12 mb-16 opacity-0">
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="heading-md mb-6">How Much Can You Get?</h3>
            <p className="text-gray-700 mb-6">
              Receive 75-90% of your projected membership revenue upfront.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="text-lg font-medium mb-2">Example:</div>
              <p className="text-gray-700">
                If you earn <span className="font-semibold">$10,000/month</span>, you could get <span className="font-semibold">$85,000</span> today.
              </p>
            </div>
            
            <p className="text-gray-600 text-sm">
              The exact amount depends on factors like your revenue history, growth rate, and platform stability.
            </p>
          </div>

          <div ref={pricingRef} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm opacity-0">
            <h3 className="heading-md mb-6">Simple & Transparent Pricing</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-medium">12-month advance</span>
                <span className="font-semibold">1.18x Factor Rate</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-medium">6-month advance</span>
                <span className="font-semibold">1.11x Factor Rate</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg my-6">
              <div className="text-lg font-medium mb-2">Example:</div>
              <p className="text-gray-700">
                Borrow $10,000, repay $11,800 over 12 months—no hidden fees.
              </p>
            </div>
            
            <p className="text-gray-600 text-sm">
              Unlike loans, our advances use a simple factor rate instead of compound interest—you'll always know exactly how much you're paying back.
            </p>
          </div>
        </div>

        <div ref={securityRef} className="bg-black text-white p-8 md:p-12 rounded-xl mb-12 opacity-0">
          <h3 className="heading-md mb-8 text-center text-white">Secured Repayment</h3>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-6">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button 
            className={cn(
              "primary-button group",
              "bg-black hover:bg-black/90"
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
