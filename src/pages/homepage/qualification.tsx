import { CheckIcon } from "lucide-react";
import { AnimationChild, AnimationParent } from "./animations";
import { FitText } from "./fit-text";

const why = [
  "Hire an editor, designer, or producer to scale production.",
  "Upgrade your setup with professional equipment.",
  "Expand your business with a new content series or premium tier.",
  "Launch & stock merchandise to boost your brand.",
  "Invest in marketing, digital products, or live events to grow faster.",
];

const who = [
  "You upload content at least twice a month on a subscription platform.",
  "You've been earning subscription revenue for at least 12 months.",
  "You generate $20,000+ per month from Patreon, Substack, or similar platforms.",
];

export function Qualification() {
  return (
    <AnimationParent className="w-full max-w-container mx-auto pb-32 px-4">
      <AnimationChild>
        <FitText>Qualification</FitText>
      </AnimationChild>

      <AnimationChild className="flex flex-col sm:flex-row gap-4 sm:-mt-[80px]">
        <div className="w-full flex flex-col justify-start h-fit p-6 fit-container bg-card/70 backdrop-blur-sm rounded-3xl">
          <h2 className="font-thunder mb-8 text-4xl sm:text-7xl leading-none uppercase">
            Ways Creators Use Their Funding
          </h2>
          <ul>
            {why.map((item) => (
              <li
                key={item}
                className="text-balance gap-4 py-2 text-xl flex items-center"
              >
                <span className="flex items-center size-8 sm:size-12 flex-shrink-0 text-foreground font-semibold justify-center leading-none text-center text-4xl rounded-full bg-primary">
                  <CheckIcon className="size-5" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex flex-col justify-start h-fit p-6 fit-container bg-card/70 backdrop-blur-sm rounded-3xl">
          <h2 className="font-thunder mb-8 text-4xl sm:text-7xl leading-none uppercase">
            Who Qualifies? <br /> <span className="opacity-0">.</span>
          </h2>
          <ul>
            {who.map((item) => (
              <li
                key={item}
                className="text-balance gap-4 py-2 text-xl flex items-center"
              >
                <span className="flex items-center size-8 sm:size-12 flex-shrink-0 text-foreground font-semibold justify-center leading-none text-center text-4xl rounded-full bg-primary">
                  <CheckIcon className="size-4 sm:size-5" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </AnimationChild>
    </AnimationParent>
  );
}
