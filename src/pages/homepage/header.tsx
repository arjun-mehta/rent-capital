import { motion, Variants } from "motion/react";
import iconCameraVideo from "./icons/camera-video.png";
import iconDuffleBag from "./icons/duffle-bag.png";
import iconCalendar from "./icons/calendar.png";
import iconMic from "./icons/mic.png";
import iconCameraPhoto from "./icons/camera-photo.png";
import iconNotebook from "./icons/notebook.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { Calculator } from "./calculator";

const AnimtedButton = motion(Button);

const icons = [
  {
    src: iconCameraVideo,
    position: {
      top: 0,
      left: 0,
    },
  },
  {
    src: iconMic,
    position: {
      top: 0,
      right: 0,
    },
  },
  {
    src: iconCalendar,
    position: {
      top: "50%",
      left: "-100px",
      marginTop: "-100px",
    },
  },
  {
    src: iconCameraPhoto,
    position: {
      top: "50%",
      right: "-100px",
      marginTop: "-100px",
    },
  },
  {
    src: iconDuffleBag,
    position: {
      bottom: 0,
      left: 0,
    },
  },
  {
    src: iconNotebook,
    position: {
      bottom: 0,
      right: 0,
    },
  },
];

const parent: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const child: Variants = {
  hidden: { opacity: 0, y: 120 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 100 },
  },
};

const childButton: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 100 },
  },
};

const parentIcons: Variants = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const childIcons: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 100 },
  },
};

export function Header() {
  return (
    <motion.header variants={parentIcons} initial="hidden" animate="visible">
      <div className="max-w-screen-xl my-8 w-fit mx-auto flex justify-between flex-col items-center p-40 py-24 relative">
        {icons.map((icon) => (
          <motion.img
            variants={childIcons}
            key={icon.src}
            src={icon.src}
            style={{ ...icon.position }}
            className="size-[200px] absolute"
          />
        ))}
        <motion.div variants={parent} initial="hidden" animate="visible">
          <h1 className="text-[150px] mx-auto leading-[110px] text-foreground text-center font-thunder uppercase font-extrabold">
            <span className="block overflow-hidden pt-4">
              <motion.span variants={child} className="block">
                Your annual
              </motion.span>
            </span>
            <span className="block overflow-hidden pt-4">
              <motion.span variants={child} className="block">
                subscription
              </motion.span>
            </span>
            <span className="block overflow-hidden pt-4">
              <motion.span variants={child} className="block">
                revenue upfront
              </motion.span>
            </span>
          </h1>
          <AnimtedButton
            variants={childButton}
            asChild
            size="lg"
            className="flex mt-4 mx-auto w-fit"
          >
            <Link to="/apply">
              Apply Now <ArrowRightIcon strokeWidth={2.5} />
            </Link>
          </AnimtedButton>
        </motion.div>
      </div>
      <Calculator />
    </motion.header>
  );
}
