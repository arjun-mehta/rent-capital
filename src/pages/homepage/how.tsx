import { AnimationChild, AnimationParent } from "./animations";
import { FitText } from "./fit-text";
import iconDuffleBag from "./icons/duffle-bag.png";
import iconCalendar from "./icons/calendar.png";
import iconNotebook from "./icons/notebook.png";

const items = [
  {
    title: "Apply in Minutes",
    description:
      "No long forms or credit checks. Just connect your account and share your revenue from Patreon, Substack, or a similar platform.",
  },
  {
    title: "Select Your Offer",
    description:
      "Pick the funding amount that works for you. Your fee is based on the amount you choose, no hidden terms.",
  },
  {
    title: "Receive Your Funds",
    description:
      "Once approved, your funds are sent directly to your bank account within a few business days.",
  },
  {
    title: "Pay as You Earn",
    description:
      "Repay automatically through a fixed share of your monthly income until the full amount is covered.",
  },
];

export function How() {
  return (
    <AnimationParent className="w-full max-w-container px-4 mx-auto py-32">
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
