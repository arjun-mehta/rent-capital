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
      "Rent Capital provides upfront payments to subscription-based creators in exchange for the right to collect a fixed amount of future revenue. This is not a loan, but a purchase of future receivables, repaid through a share of your platform earnings. No interest. No impact to your credit score. No personal guarantees.",
  },
  {
    question: "Who qualifies for funding?",
    anwer: (
      <>
        We work with creators who:
        <ul className="list-disc list-inside my-2">
          <li>Earn recurring revenue on platforms like Patreon or Substack</li>
          <li>Have at least 12 months of consistent subscription income</li>
          <li>
            Are U.S.-based and operate as a registered business (LLC or higher)
          </li>
        </ul>
        We don’t currently support sole proprietors or creators without
        recurring revenue.
      </>
    ),
  },
  {
    question: "How does it work?",
    anwer:
      "Connect your subscription account and verify your business. Most creators see a preliminary offer within minutes, based on revenue data. All offers are subject to final review, and we may request additional information or decline funding after further evaluation. If approved and signed, funds are typically deposited in your bank account within 2–3 business days.",
  },
  {
    question: "How much can I get?",
    anwer:
      "Funding amounts are based on factors like your subscription revenue, account performance, and overall business health. Once connected, you’ll see a personalized offer with clear terms and a fixed repayment amount before you commit.",
  },
  {
    question: "How are repayments structured?",
    anwer:
      "During the advance period, we’re in the flow of funds — your platform payouts are redirected to a secure account we manage. A fixed percentage is applied toward repayment, and the remainder is distributed to you monthly. If earnings dip, repayments adjust automatically. No interest, no late fees, no penalties.",
  },
  {
    question: "Is this a loan?",
    anwer:
      "No — it’s a cash advance, not a loan. We purchase a fixed portion of your future subscription revenue, repaid through a predetermined share of your monthly earnings. There’s no debt, no credit impact, and no personal guarantees.",
  },
  {
    question: "Do I still control my account?",
    anwer:
      "You maintain full access to manage your content and community. To secure repayment, we manage subscription platform login credentials and payout settings during the funding period. While sensitive areas like payment details are locked, your ability to use the platform remains unaffected.",
  },
  {
    question: "Is my data secure?",
    anwer:
      "Yes. We use encrypted integrations and read-only APIs (e.g. Patreon OAuth) to access only the data needed for underwriting and repayment. Your information is never sold or shared.",
  },
  {
    question: "Can I repay early?",
    anwer:
      "Yes. You can repay the advance at any time with no penalties. The total repayment amount is fixed once your offer is accepted.",
  },
  {
    question: "What happens after I repay?",
    anwer:
      "Once your balance is repaid in full, payouts are redirected back to your original account and our access ends. You may receive a renewal offer before your current advance is complete, or reapply for additional funding at any time.",
  },
  {
    question: "Does Rent Capital take equity or ownership in my business? ",
    anwer:
      "No — we don’t take any equity, ownership, or creative control. This is not an investment or licensing deal. You retain full ownership of your business and your content.",
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
