
import React, { useEffect, useRef } from "react";
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
      description: "No lengthy applications or credit checks. The most important thing we need to know is your revenue volume on Patreon, Substack, or comparable platform.",
      delay: "0.1s",
      color: "bg-green-50 text-green-500"
    },
    {
      title: "Receive Cash Advance",
      description: "If approved for an advance, you'll receive an offer based on your projected earnings. Once you accept, funds will be wired to your bank account within days.",
      delay: "0.3s",
      color: "bg-green-50 text-green-500"
    },
    {
      title: "Repay Without Stress",
      description: "We'll automatically receive payments from the subscription platform. No manual transfers. No hidden fees.",
      delay: "0.5s",
      color: "bg-green-50 text-green-500"
    }
  ];

  return (
    <section 
      id="how-it-works" 
      className="py-12 md:py-20 bg-white"
    >
      <div className="section-container py-8 md:py-12">
        <div className="max-w-3xl mb-12">
          <h2 
            ref={sectionRef} 
            className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-5 opacity-0 text-left"
          >
            How It Works
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-full opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Unlock capital without giving up ownership or control
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {steps.map((step, index) => {
            return (
              <div 
                key={index}
                ref={stepsRefs[index]}
                className={cn(
                  "flex flex-col items-start text-left p-8 md:p-10 rounded-xl border border-gray-200",
                  "bg-white shadow-sm hover:shadow-md transition-all duration-300 opacity-0",
                  "transform hover:-translate-y-1"
                )}
                style={{ animationDelay: step.delay, animationFillMode: "forwards" }}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black text-white text-xl font-bold mb-6">
                  {index + 1}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
