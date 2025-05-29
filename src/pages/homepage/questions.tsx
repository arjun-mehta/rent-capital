import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AnimationChild, AnimationParent } from "./animations";
import { FitText } from "./fit-text";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  {
    question: "What is Creator Capital?",
    anwer:
      "Creator Capital is a financial platform that provides funding to content creators, influencers, and online entrepreneurs to help them grow their businesses. We offer simple, transparent capital advances without taking ownership of your content or business.",
  },
  {
    question: "How does the application process work?",
    anwer:
      "Our application process is simple and straightforward. Fill out the application form with your details and creator statistics. We'll review your application and get back to you within 48 hours. If approved, you'll receive funding within 3-5 business days.",
  },
  {
    question: "What are the eligibility requirements?",
    anwer:
      "To be eligible, you need to be an active content creator with at least 10,000 followers across your platforms, consistent content posting for at least 6 months, and a stable revenue stream from your content creation activities.",
  },
  {
    question: "How do repayments work?",
    anwer:
      "Repayments are made as a percentage of your monthly revenue. This means if you earn less in a month, you pay less, and if you earn more, you pay more. This ensures that repayments scale with your business performance.",
  },
  {
    question: "Do you take ownership of my content or channel?",
    anwer:
      "No, we never take ownership of your content, channels, or business. You maintain 100% control and ownership of everything you create. Our funding is simply an advance on your future earnings.",
  },
  {
    question: "How fast can I get funded?",
    anwer:
      "Once approved, you can receive funds within 3-5 business days. The entire process from application to funding typically takes about a week.",
  },
];

export function Questions() {
  return (
    <AnimationParent className="w-full max-w-container px-4 mx-auto py-32 pt-0 relative">
      <a id="faq" className="absolute top-0 left-0" />
      <AnimationChild>
        <FitText>Questions</FitText>
      </AnimationChild>

      <div className="w-full -mt-10 sm:-mt-20">
        {items.map((item, index) => (
          <AnimationChild key={item.question}>
            <Collapsible
              className={cn(
                "flex flex-col rounded-3xl w-full bg-white my-2",
                index === 0 && "bg-card/70 backdrop-blur-sm"
              )}
            >
              <CollapsibleTrigger className="w-full p-4 text-left text-balance px-6 flex items-center justify-between text-xl">
                <span>{item.question}</span>
                <div className="flex flex-shrink-0 items-center size-10 text-primary-foreground font-semibold justify-center leading-none text-center text-4xl rounded-full bg-primary">
                  <ChevronDownIcon className="size-6" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 px-6 text-balance text-neutral-600 pt-0 text-lg">
                <p>{item.anwer}</p>
              </CollapsibleContent>
            </Collapsible>
          </AnimationChild>
        ))}
      </div>
    </AnimationParent>
  );
}
