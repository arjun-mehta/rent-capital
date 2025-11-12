import { AnimationChild, AnimationParent } from "./animations";
import { FitText } from "./fit-text";
import iconDuffleBag from "./icons/duffle-bag.png";
import iconCalendar from "./icons/calendar.png";
import iconNotebook from "./icons/notebook.png";

const items = [
  {
    title: "Connect & Upload",
    description:
      "Connect your account and upload your lease.",
  },
  {
    title: "Receive Your Offer",
    description:
      "Receive your advance offer in minutes.",
  },
  {
    title: "Get Your Funds",
    description:
      "Get up to 95% of rent within 24 hours.",
  },
  {
    title: "Automatic Repayment",
    description:
      "Repay automatically through future rent deposits.",
  },
];

export function How() {
  return (
    <AnimationParent className="w-full max-w-container px-4 mx-auto py-32 relative">
      <a id="how" className="absolute top-0 left-0" />
      <AnimationChild>
        <FitText>How it works</FitText>
      </AnimationChild>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:-mt-[80px]">
        {items.map((item, index) => (
          <AnimationChild
            key={item.title}
            className="w-full flex sm:flex-row p-6 fit-container bg-card/70 backdrop-blur-sm rounded-3xl"
          >
            <div className="flex flex-col">
              <div>
                <div className="flex mb-4 items-center size-10 text-primary-foreground font-semibold justify-center leading-none text-center text-lg rounded-full bg-primary">
                  {index + 1}
                </div>
                <h2 className="font-thunder text-3xl leading-none uppercase">
                  {item.title}
                </h2>
              </div>
              <p className="text-base w-full mt-4 text-balance">
                {item.description}
              </p>
            </div>
          </AnimationChild>
        ))}
      </div>
    </AnimationParent>
  );
}
