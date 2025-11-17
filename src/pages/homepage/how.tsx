import { AnimationChild, AnimationParent } from "./animations";
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
    title: "Auto Repayment",
    description:
      "Repay automatically via future rent deposits.",
  },
];

export function How() {
  return (
    <AnimationParent className="w-full max-w-container px-4 mx-auto py-32 relative">
      <a id="how" className="absolute top-0 left-0" />
      <AnimationChild>
        <h2 className="text-3xl md:text-4xl font-emilio text-center mb-12">
          How It Works
        </h2>
      </AnimationChild>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {items.map((item, index) => (
          <AnimationChild
            key={item.title}
            className="w-full flex sm:flex-row p-6 fit-container bg-card/70 backdrop-blur-sm rounded-3xl"
          >
            <div className="flex flex-col">
              <div className="min-h-[100px]">
                <div className="flex mb-4 items-center size-10 text-primary-foreground font-semibold justify-center leading-none text-center text-lg rounded-full bg-primary">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {item.title}
                </h3>
              </div>
              <p className="text-base w-full text-balance">
                {item.description}
              </p>
            </div>
          </AnimationChild>
        ))}
      </div>
    </AnimationParent>
  );
}
