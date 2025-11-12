import { AnimationChild, AnimationParent } from "./animations";
import { FitText } from "./fit-text";

const benefits = [
  {
    title: "Instant liquidity",
    description: "Receive funds within 24 hours of approval.",
  },
  {
    title: "Flexible terms",
    description: "Advance 1–9 months of rent upfront, or up to 12 months after successful repayment.",
  },
  {
    title: "No credit checks",
    description: "Approval based on your lease and tenant payment history.",
  },
  {
    title: "Flat, transparent fee",
    description: "5–15% fixed cost, no interest or hidden charges.",
  },
  {
    title: "No tenant disruption",
    description: "Tenants continue paying rent normally; they're never contacted.",
  },
  {
    title: "Use funds your way",
    description: "Cover repairs, expand your portfolio, or bridge gaps between tenants.",
  },
];

export function Qualification() {
  return (
    <AnimationParent className="w-full max-w-container mx-auto pb-32 px-4 relative">
      <a id="qualification" className="absolute top-0 left-0" />
      <AnimationChild>
        <FitText>Benefits</FitText>
      </AnimationChild>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:-mt-[80px]">
        {benefits.map((benefit, index) => (
          <AnimationChild
            key={benefit.title}
            className="w-full flex sm:flex-row p-6 fit-container bg-card/70 backdrop-blur-sm rounded-3xl"
          >
            <div className="flex flex-col">
              <h2 className="font-thunder text-3xl leading-none uppercase mb-4">
                {benefit.title}
              </h2>
              <p className="text-base w-full text-balance">
                {benefit.description}
              </p>
            </div>
          </AnimationChild>
        ))}
      </div>
    </AnimationParent>
  );
}
