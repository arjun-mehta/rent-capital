import { motion, MotionProps, Variants } from "motion/react";
import { ComponentProps } from "react";

const parentAppear: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childAppear: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 100 },
  },
};

export function AnimationParent(props: MotionProps & ComponentProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={parentAppear}
      viewport={{ once: true, amount: 0.3 }}
      {...props}
    />
  );
}

export function AnimationChild(props: MotionProps & ComponentProps<"div">) {
  return <motion.div variants={childAppear} {...props} />;
}
