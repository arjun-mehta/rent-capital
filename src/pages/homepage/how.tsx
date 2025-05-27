import { AnimationChild, AnimationParent } from "./animations";
import { FitText } from "./fit-text";
import iconDuffleBag from "./icons/duffle-bag.png";
import iconCalendar from "./icons/calendar.png";
import iconNotebook from "./icons/notebook.png";

const items = [
  {
    title: "Apply in Minutes",
    description:
      "No lengthy applications or credit checks. The most important thing we need to know is your revenue on Patreon, Substack, or comparable platform.",
    image: iconCalendar,
  },
  {
    title: "Receive Cash Advance",
    description:
      "If approved for an advance, you'll receive an offer based on your projected earnings. Once you accept, funds will be wired to your bank account within days.",
    image: iconNotebook,
  },
  {
    title: "Repay Without Stress",
    description:
      "We'll automatically receive payments from the subscription platform. No manual transfers. No hidden fees.",
    image: iconDuffleBag,
  },
];

export function How() {
  return (
    <AnimationParent className="w-full max-w-container mx-auto py-32">
      <AnimationChild>
        <FitText>How it works</FitText>
      </AnimationChild>
      <AnimationChild className="flex flex-col gap-4 -mt-[80px]">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="w-full flex p-6 fit-container bg-card/70 backdrop-blur-sm min-h-[420px] rounded-3xl"
          >
            <div className="flex flex-col justify-between">
              <div className="flex items-center size-16 text-background font-semibold justify-center leading-none text-center text-4xl rounded-full bg-foreground">
                {index + 1}
              </div>
              <div>
                <h2 className="font-thunder text-7xl leading-none uppercase">
                  {item.title}
                </h2>
                <p className="text-xl w-full text-balance">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="size-[420px] flex-shrink-0 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="size-[280px] object-cover"
              />
            </div>
          </div>
        ))}
      </AnimationChild>
    </AnimationParent>
  );
}
