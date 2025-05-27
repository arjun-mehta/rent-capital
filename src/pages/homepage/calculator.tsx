import { Button } from "@/components/ui/button";
import { motion, Variants } from "motion/react";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type PlanDuration = "3" | "6" | "12";

const child: Variants = {
  hidden: { opacity: 0, y: 120 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 100 },
  },
};

export function Calculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000);
  const [selectedPlan, setSelectedPlan] = useState<PlanDuration>("12");
  const isMobile = useIsMobile();

  // Calculate values based on plan duration with different multipliers
  const annualRevenue = monthlyRevenue * 12;

  // Apply different multipliers based on plan duration
  let advanceMultiplier = 0.85; // Default for 12 months
  if (selectedPlan === "3") {
    advanceMultiplier = 0.925; // Updated from 0.95 to 0.925 (92.5%)
  } else if (selectedPlan === "6") {
    advanceMultiplier = 0.9;
  }

  // Calculate advance amount based on selected plan duration and its specific multiplier without rounding
  const advanceAmount =
    monthlyRevenue * Number(selectedPlan) * advanceMultiplier;

  const handleSliderChange = (value: number[]) => {
    // Update to map slider value 10-100 to revenue $10,000-$100,000
    setMonthlyRevenue(value[0] * 1000);
  };

  const handlePlanChange = (value: string) => {
    setSelectedPlan(value as PlanDuration);
  };

  return (
    <div className="w-full max-w-container mx-auto grid gap-2 grid-cols-3">
      <motion.div
        variants={child}
        className="bg-card p-4 rounded-3xl shadow-xs"
      >
        <div className="text-sm text-muted-foreground font-normal mb-8">
          Monthly subscription revenue
        </div>
        <div className="space-y-3 md:space-y-4">
          <Slider
            defaultValue={[10]}
            min={10}
            max={100}
            step={1}
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">$10,000</span>
            <span className="text-base font-medium">
              ${monthlyRevenue.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">$100,000</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={child}
        className="bg-card p-4 rounded-3xl shadow-xs"
      >
        <div className="text-sm text-muted-foreground font-normal mb-8">
          Advance size
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {[
            { value: "3", label: "3 months" },
            { value: "6", label: "6 months" },
            { value: "12", label: "12 months" },
          ].map((plan) => (
            <button
              key={plan.value}
              onClick={() => handlePlanChange(plan.value)}
              className={cn(
                "py-2.5 md:py-3 px-1 md:px-2 rounded-lg text-center transition-all duration-200",
                "text-xs md:text-sm font-medium",
                selectedPlan === plan.value
                  ? "border border-[#017354] text-[#017354] bg-white"
                  : "border border-gray-200 text-gray-700 bg-white hover:border-[#017354]/50"
              )}
            >
              {plan.label}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={child}
        className="bg-primary text-foreground p-4 rounded-3xl"
      >
        <div className="text-sm font-normal mb-8">Estimated advance amount</div>
        <div className="flex items-center justify-between text-left">
          <div className="text-2xl">${advanceAmount.toLocaleString()}</div>
          <Button className="w-fit" variant="secondary" asChild>
            <Link to="/signin">
              Apply Now <ArrowRight strokeWidth={2.5} />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
