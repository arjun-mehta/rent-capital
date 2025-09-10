import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-3 w-full ring-1 ring-gray-200 border-2 border-white rounded-full progress-gradient",
      className
    )}
    {...props}
  >
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      className="size-8 absolute bg-white/70 cursor-grab backdrop-blur-sm backdrop-saturate-200 rounded-full shadow-lg border-[0.5px]"
      style={{ left: `calc(${value || 0}% - 16px)`, top: -13 }}
    />

    <div
      className="absolute -translate-y-full -top-5 flex items-center justify-center py-5 w-[80px] rounded-2xl shadow-lg border-[0.5px]"
      style={{ left: `calc(${value || 0}% - 40px)` }}
    >
      <span className="text-xl font-bold">
        {value}
        <span className="text-sm text-gray-500 font-normal">%</span>
      </span>
    </div>
  </ProgressPrimitive.Root>
));
ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
