import { circIn, motion, type Variants } from "motion/react";
import iconCameraVideo from "./icons/camera-video.png";
import iconDuffleBag from "./icons/duffle-bag.png";
import iconCalendar from "./icons/calendar.png";
import iconMic from "./icons/mic.png";
import iconCameraPhoto from "./icons/camera-photo.png";
import iconNotebook from "./icons/notebook.png";
import iconLightbulb from "./icons/lightbulb.png";
import iconRocket from "./icons/rocket.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { Calculator } from "./calculator";

import iconPatreon from "./icons/patreon.svg";
import iconYouTube from "./icons/youtube.svg";
import iconSupercast from "./icons/supercast.svg";
import iconTwitch from "./icons/twitch.svg";
import iconApplePodcasts from "./icons/apple-podcasts.svg";
import iconSubstack from "./icons/substack.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useScrollToElement } from "./scroll";

const logos = [
  {
    src: iconPatreon,
    name: "Patreon",
  },
  {
    src: iconYouTube,
    name: "YouTube",
  },
  {
    src: iconSupercast,
    name: "Supercast",
  },
  {
    src: iconTwitch,
    name: "Twitch",
  },
  {
    src: iconApplePodcasts,
    name: "Apple Podcasts",
  },
  {
    src: iconSubstack,
    name: "Substack",
  },
];

const AnimtedButton = motion.create(Button);

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
    src: iconRocket,
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
    src: iconLightbulb,
    position: {
      bottom: 0,
      right: 0,
    },
  },
];

const parent: (delay?: number) => Variants = (delay: number = 0) => ({
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

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
  const { scrollToElement } = useScrollToElement();

  return (
    <motion.header
      variants={parentIcons}
      initial="hidden"
      animate="visible"
      className="px-4 sm:px-0"
    >
      <div className="max-w-screen-xl overflow-x-hidden sm:overflow-x-visible mt-8 sm:w-fit mx-auto flex justify-between flex-col items-center px-20 py-24 sm:py-44 relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {icons.map((icon) => (
            <motion.img
              variants={childIcons}
              key={icon.src}
              src={icon.src}
              style={{ ...icon.position }}
              className="md:size-[200px] size-[120px] sm:size-[150px] absolute"
            />
          ))}
        </div>
        <motion.div
          variants={parent()}
          initial="hidden"
          animate="visible"
          className="z-10"
        >
          <h1 className="xl:text-[150px] text-balance md:text-[100px] leading-[0.8] text-[60px] mx-auto  text-foreground text-center font-thunder uppercase font-extrabold">
            <span className="block overflow-hidden pt-4">
              <motion.span variants={child} className="block whitespace-nowrap">
                Get your future
              </motion.span>
            </span>
            <span className="block overflow-hidden pt-4">
              <motion.span variants={child} className="block whitespace-nowrap">
                revenue now
              </motion.span>
            </span>
          </h1>
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-2 absolute bottom-0 sm:bottom-20 left-1/2 -translate-x-1/2">
            <AnimtedButton
              variants={childButton}
              size="lg"
              className="hidden sm:flex"
              variant="secondary"
              onClick={() =>
                scrollToElement("calculator", {
                  behavior: "smooth",
                  block: "center",
                  inline: "center",
                })
              }
            >
              Estimate Your Advance
            </AnimtedButton>
            <AnimtedButton
              variants={childButton}
              asChild
              size="lg"
              className="flex"
            >
              <Link to="/signin">
                Apply Now <ArrowRightIcon strokeWidth={2.5} />
              </Link>
            </AnimtedButton>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={parent(0.4)}
        initial="hidden"
        animate="visible"
        className="my-10"
      >
        <motion.p variants={child} className="text-balance text-center">
          We fund creators with subscription-based earnings from:
        </motion.p>
        <div className="flex flex-wrap px-4 items-center justify-between mt-8 sm:justify-center">
          {logos.map((logo) => (
            <Tooltip key={logo.name} delayDuration={0}>
              <TooltipTrigger className="cursor-default" asChild>
                <div className="h-[40px] sm:px-5 opacity-50 transition-opacity data-[state=delayed-open]:opacity-100 data-[state=instant-open]:opacity-100">
                  <motion.img
                    variants={child}
                    src={logo.src}
                    alt="logo"
                    className="block size-[32px] sm:size-[40px] object-contain"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">{logo.name}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
