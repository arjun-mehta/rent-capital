import { Button } from "@/components/ui/button";
import { motion, Variants } from "motion/react";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useScrollToElement } from "./scroll";

type PlanDuration = "3" | "6" | "9";

const child: Variants = {
  hidden: { opacity: 0, y: 120 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 100 },
  },
};

// Dynamic fee percentage based on months (same as offers page)
const getFeePercentage = (months: number): number => {
  const feeTable: Record<number, number> = {
    1: 5.00,
    2: 6.00,
    3: 7.00,
    4: 8.00,
    5: 9.00,
    6: 10.00,
    7: 11.00,
    8: 12.00,
    9: 13.00,
    10: 14.00,
    11: 14.50,
    12: 15.00,
  };
  return feeTable[months] || 10.00;
};

export function Calculator() {
  const [monthlyRentalIncome, setMonthlyRentalIncome] = useState(30000);
  const [selectedPlan, setSelectedPlan] = useState<PlanDuration>("6");
  const { scrollToTop } = useScrollToElement();
  const isMobile = useIsMobile();

  // Calculate values based on dynamic fee structure
  const selectedMonths = Number(selectedPlan);
  
  // Total repayment = monthly rental income * number of months
  const totalRepayment = monthlyRentalIncome * selectedMonths;
  
  // Fee calculation: dynamic percentage based on months
  const feePercentage = getFeePercentage(selectedMonths);
  const fee = Math.round(totalRepayment * (feePercentage / 100));
  
  // Advance amount = total repayment - fee
  const advanceAmount = totalRepayment - fee;

  const handleSliderChange = (value: number[]) => {
    // Slider value is monthly rental income in thousands (10-90)
    setMonthlyRentalIncome(value[0] * 1000);
  };

  const handlePlanChange = (value: string) => {
    setSelectedPlan(value as PlanDuration);
  };

  return (
    <div className="w-full px-4 max-w-container mx-auto relative">
      <a id="calculator" className="absolute top-0 left-0" />
      <motion.div
        variants={child}
        className="bg-card p-6 mb-2 rounded-3xl shadow-xs"
      >
        <div>
          <div className="text-sm text-muted-foreground font-normal mb-4">
            Monthly rental income
          </div>
          <div className="space-y-3 md:space-y-4">
            <Slider
              defaultValue={[30]}
              min={10}
              max={90}
              step={10}
              onValueChange={handleSliderChange}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">$10,000</span>
              <span className="text-2xl font-medium text-foreground">
                ${monthlyRentalIncome.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">$90,000</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground font-normal mt-4 mb-4">
            Advance size
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {[
              { value: "3", label: "3 months" },
              { value: "6", label: "6 months" },
              { value: "9", label: "9 months" },
            ].map((plan) => (
              <button
                key={plan.value}
                onClick={() => handlePlanChange(plan.value)}
                className={cn(
                  "py-2.5 md:py-3 px-1 md:px-2 rounded-lg text-center transition-all duration-200",
                  "text-xs md:text-sm font-medium",
                  selectedPlan === plan.value
                    ? "border-2 border-primary text-primary bg-primary/10"
                    : "border border-border text-muted-foreground bg-card hover:border-primary/50 hover:text-primary"
                )}
              >
                {plan.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={child}
        className="bg-card border-2 border-primary text-foreground p-6 rounded-3xl"
      >
        <div className="text-sm font-normal mb-4 text-foreground">Estimated advance amount</div>
        <div className="flex items-center justify-between text-left">
          <div className="text-2xl text-primary font-medium">${advanceAmount.toLocaleString()}</div>
          <Button 
            className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
            onClick={(e) => {
              e.preventDefault();
              const waitlistElement = document.getElementById('waitlist');
              if (waitlistElement) {
                const navHeight = 80; // Approximate nav bar height
                const elementPosition = waitlistElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navHeight;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              } else {
              scrollToTop();
              }
            }}
          >
            Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
