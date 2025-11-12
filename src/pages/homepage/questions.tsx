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
    question: "What is Rent Capital?",
    anwer:
      "Rent Capital provides upfront cash in exchange for a fixed amount of your future rental income. It is not a loan or line of credit.",
  },
  {
    question: "How does it work?",
    anwer:
      "Connect your bank account and upload your lease. We review your rent history and offer an advance of 1–9 months of future rent. Once you accept, funds are sent within 24 hours and repayment happens automatically as new rent is received.",
  },
  {
    question: "How much can I get?",
    anwer:
      "You can receive up to 95% of your future rent upfront. The flat fee ranges from 5–15%, depending on the advance duration.",
  },
  {
    question: "Can I access longer advances?",
    anwer:
      "Yes. Landlords with a successful repayment history and no late payments or tenant defaults can qualify for advances of up to 12 months.",
  },
  {
    question: "How do repayments work?",
    anwer:
      "When your tenant pays rent, Rent Capital collects 100% of that rent until the total advance amount plus the flat fee is repaid. After repayment, you resume receiving rent as usual.",
  },
  {
    question: "Do I need good credit?",
    anwer:
      "Approval is based on rent history, lease terms, and tenant payment performance, not personal credit.",
  },
  {
    question: "Can I qualify if I have a mortgage or other debt?",
    anwer:
      "Yes. Rent Capital purchases future rent receivables, not the property itself, so existing debt does not affect eligibility.",
  },
  {
    question: "Is this a loan?",
    anwer:
      "No. It is a purchase of future receivables. You are not taking on debt, and there is no credit impact.",
  },
  {
    question: "What if my tenant misses rent?",
    anwer:
      "If a tenant misses rent, repayment simply pauses until new rent is received. You are never personally liable for tenant nonpayment.",
  },
  {
    question: "How long does funding take?",
    anwer:
      "Once your lease and rent history are verified, funds are typically deposited within 24 hours.",
  },
  {
    question: "Are there any upfront costs?",
    anwer:
      "No. Applying is free and takes only a few minutes. You pay a flat fee that is repaid gradually through rent collections over the duration of your advance.",
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
            <div
              className={cn(
                "flex flex-col rounded-3xl w-full border border-border my-2",
                index === 0 ? "bg-[hsl(0,0%,6%)]/70 backdrop-blur-sm" : "bg-[hsl(0,0%,6%)]"
              )}
            >
              <Collapsible className="w-full">
                <CollapsibleTrigger className="w-full p-4 text-left text-balance px-6 flex items-center justify-between text-xl text-foreground hover:text-foreground/80">
                  <span>{item.question}</span>
                  <div className="flex flex-shrink-0 items-center size-10 text-primary-foreground font-semibold justify-center leading-none text-center text-4xl rounded-full bg-primary">
                    <ChevronDownIcon className="size-6" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 px-6 text-balance text-muted-foreground pt-0 text-lg">
                  <p>{item.anwer}</p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </AnimationChild>
        ))}
      </div>
    </AnimationParent>
  );
}
