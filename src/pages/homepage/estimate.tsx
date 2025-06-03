import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { AnimationChild, AnimationParent } from "./animations";
import { Calculator } from "./calculator";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const items = [
  "Grow subscribers with ads",
  "Finance your next special and get leverage with distributors",
  "Upgrade your production studio",
  "Expand into a multi-creator network",
  "Develop and launch a new product line",
  "Invest in high-end creative gear",
  "Hire more editors to scale output",
  "Secure paid collabs with bigger creators",
  "Go full-time on creating",
  "Hire creative support",
  "Expand your product offerings",
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
                className="font-thunder text-balance sm:my-5 text-5xl sm:text-7xl text-center sm:text-left min-h-[200px] sm:min-h-[320px] flex items-center justify-center leading-none uppercase"
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
