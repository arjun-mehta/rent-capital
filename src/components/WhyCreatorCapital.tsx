
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const WhyCreatorCapital: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

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
    if (statsRef.current) observer.observe(statsRef.current);
    if (tableRef.current) observer.observe(tableRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (statsRef.current) observer.unobserve(statsRef.current);
      if (tableRef.current) observer.unobserve(tableRef.current);
    };
  }, []);

  const stats = [
    {
      value: "Ex-Patreon",
      label: "Founded by executives with creator expertise"
    },
    {
      value: "$50M+",
      label: "Paid out to creators in previous ventures"
    },
    {
      value: "100+",
      label: "Top creators funded through our platform"
    }
  ];

  const comparisonData = [
    {
      feature: "Approval Speed",
      creatorCapital: "As fast as 48 hours",
      traditionalLoans: "Weeks",
      ventureCapital: "Months"
    },
    {
      feature: "No Equity Required",
      creatorCapital: true,
      traditionalLoans: true,
      ventureCapital: false
    },
    {
      feature: "No Personal Collateral",
      creatorCapital: true,
      traditionalLoans: false,
      ventureCapital: false
    },
    {
      feature: "Flexible Repayment",
      creatorCapital: "Payments adjust with earnings",
      traditionalLoans: "Fixed monthly payments",
      ventureCapital: "No repayment, but loss of equity"
    },
    {
      feature: "Higher Advance Limits",
      creatorCapital: "$50K–$3M upfront",
      traditionalLoans: "Lower limits for online businesses",
      ventureCapital: "Varies"
    },
    {
      feature: "No Personal Credit Checks",
      creatorCapital: "No credit score impact",
      traditionalLoans: "Requires credit check",
      ventureCapital: "Not relevant"
    },
    {
      feature: "Built for Subscription Creators",
      creatorCapital: "Patreon, YouTube, Substack, etc.",
      traditionalLoans: "Not creator-friendly",
      ventureCapital: "Not tailored for subscription businesses"
    }
  ];

  const isPositive = (text: string): boolean => {
    const positiveTerms = ['adjust', 'no credit', 'patreon', 'youtube', 'substack', '$50k', 'upfront', 'not relevant'];
    return positiveTerms.some(term => text.toLowerCase().includes(term.toLowerCase()));
  };

  const isNegative = (text: string): boolean => {
    const negativeTerms = ['fixed', 'lower limits', 'requires', 'not creator', 'not tailored', 'loss of equity'];
    return negativeTerms.some(term => text.toLowerCase().includes(term.toLowerCase()));
  };

  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="tag bg-black/5 text-black/80 mb-4">
            Our Difference
          </div>
          <h2 ref={sectionRef} className="heading-lg mb-6 opacity-0">
            Built by Creators, for Creators
          </h2>
          <p className="paragraph text-gray-600 mx-auto max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            We understand your business because we've been there. Our team has extensive experience in the creator economy.
          </p>
        </div>

        <div 
          ref={statsRef} 
          className="grid md:grid-cols-3 gap-8 mb-20 opacity-0"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 hover:bg-gray-50 rounded-lg transition-colors duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div ref={tableRef} className="opacity-0">
          <h3 className="heading-md text-center mb-8">
            How We're Different
          </h3>
          
          <div className="overflow-x-auto">
            <Table className="w-full border-collapse">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left p-4 border-b-2 border-gray-100">Feature</TableHead>
                  <TableHead className="p-4 border-b-2 border-gray-100 bg-black text-white rounded-tl-lg text-center">
                    <span className="font-poppins font-semibold">Creator Capital</span>
                  </TableHead>
                  <TableHead className="p-4 border-b-2 border-gray-100 text-center">Traditional Loans</TableHead>
                  <TableHead className="p-4 border-b-2 border-gray-100 text-center">Venture Capital</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-gray-50">
                    <TableCell className="p-4 border-b border-gray-100 font-medium">{row.feature}</TableCell>
                    <TableCell className="p-4 border-b border-gray-100 text-center bg-gray-50">
                      {typeof row.creatorCapital === 'boolean' ? (
                        row.creatorCapital ? 
                          <Check className="w-5 h-5 text-black mx-auto" /> : 
                          <X className="w-5 h-5 text-gray-400 mx-auto" />
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Check className="w-5 h-5 text-black flex-shrink-0" />
                          <span className="font-medium">{row.creatorCapital}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="p-4 border-b border-gray-100 text-center">
                      {typeof row.traditionalLoans === 'boolean' ? (
                        row.traditionalLoans ? 
                          <Check className="w-5 h-5 text-black mx-auto" /> : 
                          <X className="w-5 h-5 text-gray-400 mx-auto" />
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          {isPositive(row.traditionalLoans) ? (
                            <Check className="w-5 h-5 text-black flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <span>{row.traditionalLoans}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="p-4 border-b border-gray-100 text-center">
                      {typeof row.ventureCapital === 'boolean' ? (
                        row.ventureCapital ? 
                          <Check className="w-5 h-5 text-black mx-auto" /> : 
                          <X className="w-5 h-5 text-gray-400 mx-auto" />
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          {isPositive(row.ventureCapital) ? (
                            <Check className="w-5 h-5 text-black flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <span>{row.ventureCapital}</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-center mt-12">
            <Button 
              className={cn(
                "primary-button group",
                "bg-black hover:bg-black/90"
              )}
              onClick={() => document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'})}
            >
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCreatorCapital;
