
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string | JSX.Element;
};

const faqItems: FAQItem[] = [
  {
    question: "What is Creator Capital?",
    answer: "Creator Capital is a financial platform that provides funding to content creators, influencers, and online entrepreneurs to help them grow their businesses. We offer simple, transparent capital advances without taking ownership of your content or business."
  },
  {
    question: "How does the application process work?",
    answer: "Our application process is simple and straightforward. Fill out the application form with your details and creator statistics. We'll review your application and get back to you within 48 hours. If approved, you'll receive funding within 3-5 business days."
  },
  {
    question: "What are the eligibility requirements?",
    answer: "To be eligible, you need to be an active content creator with at least 10,000 followers across your platforms, consistent content posting for at least 6 months, and a stable revenue stream from your content creation activities."
  },
  {
    question: "How do repayments work?",
    answer: "Repayments are made as a percentage of your monthly revenue. This means if you earn less in a month, you pay less, and if you earn more, you pay more. This ensures that repayments scale with your business performance."
  },
  {
    question: "Do you take ownership of my content or channel?",
    answer: "No, we never take ownership of your content, channels, or business. You maintain 100% control and ownership of everything you create. Our funding is simply an advance on your future earnings."
  },
  {
    question: "How fast can I get funded?",
    answer: "Once approved, you can receive funds within 3-5 business days. The entire process from application to funding typically takes about a week."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="section-container bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
          <p className="paragraph text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Creator Capital and how we can help you grow your creator business.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
              <AccordionTrigger className="py-5 text-lg font-medium text-left hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
