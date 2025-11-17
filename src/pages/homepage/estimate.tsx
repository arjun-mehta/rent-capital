import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { AnimationChild, AnimationParent } from "./animations";
import { Calculator } from "./calculator";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const items = [
  "Property renovations and upgrades",
  "Purchase additional rental properties",
  "Pay off high-interest debt",
  "Emergency repairs and maintenance",
  "Down payment for expansion",
  "Property improvements to increase rent",
  "HVAC system upgrades",
  "Roof replacements",
  "Expand your portfolio",
  "Tenant improvements",
  "Capital expenditures",
  "Emergency fund for vacancies",
];

export function Estimate() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrevious = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <AnimationParent className="w-full max-w-container px-4 mx-auto pt-12 relative">
      <a id="calculate" className="absolute top-0 left-0" />
      <div className="flex flex-col items-center sm:flex-row gap-8">
        <div className="w-full flex flex-col gap-4">
          <AnimationChild>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="font-emilio text-balance sm:my-5 text-2xl sm:text-3xl lg:text-4xl text-left min-h-[120px] sm:min-h-[160px] flex items-center justify-start leading-tight tracking-tight"
              >
                {items[index]}
              </motion.div>
            </AnimatePresence>
          </AnimationChild>
        </div>

        <Calculator />
      </div>
    </AnimationParent>
  );
}
