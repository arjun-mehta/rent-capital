
import React, { useEffect, useRef } from "react";
import { ArrowRight, CheckCircle, FileText, CreditCard } from "lucide-react";
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
      title: "Get Qualified",
      description: "Apply in minutes by sharing your subscription revenue details.",
      icon: FileText,
      delay: "0.1s"
    },
    {
      title: "Get Funded",
      description: "Receive 75–90% of your projected membership revenue upfront as a cash advance.",
      icon: CreditCard,
      delay: "0.3s"
    },
    {
      title: "Repay Automatically",
      description: "We collect a portion of your monthly revenue until the advance is fully repaid.",
      icon: CheckCircle,
      delay: "0.5s"
    }
  ];

  const benefits = [
    "Fast & Flexible: Apply in minutes, receive funding in days.",
    "No Equity, No Debt: Keep full ownership of your content and business.",
    "Predictable Repayment: Payments come directly from your platform revenue—no manual transfers.",
    "More Growth, Less Stress: Get capital without waiting months for earnings to accumulate."
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="tag bg-black/5 text-black/80 mb-4 opacity-0 animate-fade-in">
            Simple Process
          </div>
          <h2 ref={sectionRef} className="heading-lg mb-6 opacity-0">
            Unlock Growth Capital in 3 Easy Steps
          </h2>
          <p className="paragraph text-gray-600 mx-auto max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Our financing model is designed to be simple, intuitive, and de-risked for creators just like you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                ref={stepsRefs[index]}
                className="flex flex-col items-center text-center p-8 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 opacity-0"
                style={{ animationDelay: step.delay, animationFillMode: "forwards" }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/5 mb-6">
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-gray-600 bg-gray-100 mb-4">
                  Step {index + 1}
                </span>
                <h3 className="heading-sm mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mt-16">
          <h3 className="heading-md mb-8 text-center opacity-0 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Key Benefits
          </h3>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-3 opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: "forwards" }}
              >
                <CheckCircle className="w-6 h-6 text-black flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-10">
            <Button 
              className={cn(
                "primary-button group",
                "bg-black hover:bg-black/90"
              )}
              onClick={() => document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'})}
            >
              Apply for Funding
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
