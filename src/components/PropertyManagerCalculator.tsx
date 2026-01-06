import { motion, Variants } from "motion/react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useState } from "react";

type AdvanceTerm = "1" | "3" | "6" | "9";

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

export function PropertyManagerCalculator() {
  const [monthlyRent, setMonthlyRent] = useState(50000);
  const [selectedTerm, setSelectedTerm] = useState<AdvanceTerm>("6");

  // Calculate commission on advance amount (after fees)
  const termMonths = Number(selectedTerm);
  
  // Total repayment = monthly rent * term months
  const totalRepayment = monthlyRent * termMonths;
  
  // Fee calculation: dynamic percentage based on months
  const feePercentage = getFeePercentage(termMonths);
  const fee = Math.round(totalRepayment * (feePercentage / 100));
  
  // Advance amount = total repayment - fee
  const advanceAmount = totalRepayment - fee;
  
  // Commission = 2% of advance amount
  const commission = Math.round(advanceAmount * 0.02);

  const handleSliderChange = (value: number[]) => {
    // Map slider value 10-1000 to rent $10,000-$1,000,000
    setMonthlyRent(value[0] * 1000);
  };

  const handleTermChange = (value: string) => {
    setSelectedTerm(value as AdvanceTerm);
  };

  return (
    <div className="w-full relative">
      <motion.div
        variants={child}
        className="bg-[#EFE7E3] p-6 mb-2 rounded-3xl shadow-xs"
      >
        <div>
          <div className="text-sm text-muted-foreground font-normal mb-4">
            Monthly Rent You Manage
          </div>
          <div className="space-y-3 md:space-y-4">
            <Slider
              defaultValue={[50]}
              min={10}
              max={1000}
              step={1}
              onValueChange={handleSliderChange}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">$10,000</span>
              <span className="text-2xl font-medium text-foreground">
                ${monthlyRent.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">$1,000,000</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground font-normal mt-4 mb-4">
            Average Advance Term
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {[
              { value: "1", label: "1 month" },
              { value: "3", label: "3 months" },
              { value: "6", label: "6 months" },
              { value: "9", label: "9 months" },
            ].map((term) => (
              <button
                key={term.value}
                onClick={() => handleTermChange(term.value)}
                className={cn(
                  "py-2.5 md:py-3 px-1 md:px-2 rounded-lg text-center transition-all duration-200",
                  "text-xs md:text-sm font-medium",
                  selectedTerm === term.value
                    ? "border-2 border-primary text-primary bg-primary/10"
                    : "border border-border text-muted-foreground bg-card hover:border-primary/50 hover:text-primary"
                )}
              >
                {term.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={child}
        className="bg-[#EFE7E3] text-foreground p-6 rounded-3xl"
      >
        <div className="text-sm font-normal mb-4 text-foreground">Your Annual Commission Potential</div>
        <div className="text-2xl text-primary mb-2">
          ${commission.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">
          Based on your current rent portfolio and selected advance term
        </p>
      </motion.div>
    </div>
  );
}

