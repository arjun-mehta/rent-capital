import { motion, Variants } from "motion/react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useState } from "react";

type AdvanceTerm = "3" | "6" | "9" | "12";

const child: Variants = {
  hidden: { opacity: 0, y: 120 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 100 },
  },
};

export function PropertyManagerCalculator() {
  const [monthlyRent, setMonthlyRent] = useState(50000);
  const [selectedTerm, setSelectedTerm] = useState<AdvanceTerm>("6");

  // Calculate commission: Monthly Rent x Term x 2%
  const termMonths = Number(selectedTerm);
  const commission = monthlyRent * termMonths * 0.02;

  const handleSliderChange = (value: number[]) => {
    // Map slider value 10-200 to rent $10,000-$200,000
    setMonthlyRent(value[0] * 1000);
  };

  const handleTermChange = (value: string) => {
    setSelectedTerm(value as AdvanceTerm);
  };

  return (
    <div className="w-full relative">
      <motion.div
        variants={child}
        className="bg-card p-6 mb-2 rounded-3xl shadow-xs"
      >
        <div>
          <div className="text-sm text-muted-foreground font-normal mb-4">
            Monthly Rent You Manage
          </div>
          <div className="space-y-3 md:space-y-4">
            <Slider
              defaultValue={[50]}
              min={10}
              max={200}
              step={1}
              onValueChange={handleSliderChange}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">$10,000</span>
              <span className="text-2xl font-medium">
                ${monthlyRent.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">$200,000</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground font-normal mt-4 mb-4">
            Average Advance Term
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {[
              { value: "3", label: "3 months" },
              { value: "6", label: "6 months" },
              { value: "9", label: "9 months" },
              { value: "12", label: "12 months" },
            ].map((term) => (
              <button
                key={term.value}
                onClick={() => handleTermChange(term.value)}
                className={cn(
                  "py-2.5 md:py-3 px-1 md:px-2 rounded-lg text-center transition-all duration-200",
                  "text-xs md:text-sm font-medium",
                  selectedTerm === term.value
                    ? "border-2 border-[#6EE7B7] text-[#6EE7B7] bg-[#6EE7B7]/10"
                    : "border border-border text-muted-foreground bg-card hover:border-[#6EE7B7]/50 hover:text-[#6EE7B7]"
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
        className="bg-black border-2 border-primary text-foreground p-6 rounded-3xl"
      >
        <div className="text-sm font-normal mb-4">Your Annual Commission Potential</div>
        <div className="text-2xl text-[#6EE7B7] mb-2">
          ${commission.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">
          Based on your current rent portfolio and selected advance term
        </p>
      </motion.div>
    </div>
  );
}

