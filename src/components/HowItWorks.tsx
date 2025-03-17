
import React, { useEffect, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRefs = Array(3).fill(0).map(() => useRef<HTMLDivElement>(null));

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
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
    stepsRefs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      stepsRefs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const steps = [
    {
      title: "Apply in Minutes",
      description: "Share your revenue details & get an offer fast.",
      delay: "0.1s",
      color: "bg-green-50 text-green-500"
    },
    {
      title: "Get Upfront Cash",
      description: "Receive $50K–$3M upfront based on your earnings.",
      delay: "0.3s",
      color: "bg-green-50 text-green-500"
    },
    {
      title: "Repay Without Stress",
      description: "Payments come from your platform revenue, automatically.",
      delay: "0.5s",
      color: "bg-green-50 text-green-500"
    }
  ];

  const benefits = [
    "Fast & Flexible: Apply in minutes, receive funding in days.",
    "No Equity, No Debt: Keep full ownership of your content and business.",
    "Predictable Repayment: Payments come directly from your platform revenue—no manual transfers.",
    "More Growth, Less Stress: Get capital without waiting months for earnings to accumulate."
  ];

  return (
    <section id="how-it-works" className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="section-container pt-0 pb-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 ref={sectionRef} className="heading-lg mb-6 opacity-0">
            How It Works
          </h2>
          <p className="paragraph text-gray-600 mx-auto max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Our financing is simple, fast, and designed for creators.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {steps.map((step, index) => {
            return (
              <div 
                key={index}
                ref={stepsRefs[index]}
                className={cn(
                  "flex flex-col items-center text-center p-8 rounded-xl border border-gray-200",
                  "bg-white shadow-sm hover:shadow-md transition-all duration-300 opacity-0",
                  "transform hover:-translate-y-1"
                )}
                style={{ animationDelay: step.delay, animationFillMode: "forwards" }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white text-xl font-bold mb-6">
                  {index + 1}
                </div>
                <h3 className="heading-sm mb-3 font-bold">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mx-auto max-w-4xl">
          <h3 className="text-xl font-semibold mb-4 text-center">Key Benefits</h3>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-3 mb-10">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-3 opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: "forwards" }}
              >
                <div className="p-1 rounded-full flex-shrink-0 bg-green-50">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-gray-700 text-sm md:text-base">{benefit}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Button 
              className="bg-[#017354] text-white px-8 py-6 rounded-md font-medium flex items-center gap-2 hover:bg-[#017354]/90 transition-colors"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'})}
            >
              Apply for Funding
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
