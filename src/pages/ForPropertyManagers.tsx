import { Navigation } from "./homepage/navigation";
import { Footer } from "./homepage/footer";
import { AnimationParent, AnimationChild } from "./homepage/animations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Shield, ChevronDownIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { PropertyManagerCalculator } from "@/components/PropertyManagerCalculator";

const faqItems = [
  {
    question: "How does a landlord qualify for an advance?",
    anwer:
      "The lease must show at least three months of consistent rent deposits from the current tenant. Based on that payment history, Rent Capital can advance 1–9 months of future rent upfront.",
  },
  {
    question: "Who is eligible to use Rent Capital?",
    anwer:
      "Any landlord with valid lease agreements, consistent rent history, and a U.S. business bank account — from single-unit owners to larger portfolios.",
  },
  {
    question: "How quickly are landlords funded?",
    anwer:
      "Once approved, landlords typically receive funds within 24 hours.",
  },
  {
    question: "Can my landlords qualify for longer advances?",
    anwer:
      "Yes. Once a landlord completes a successful advance with on-time tenant deposits, Rent Capital can waive the three-month rent history requirement and offer advances of up to 12 months on future leases.",
  },
  {
    question: "How does Rent Capital make money?",
    anwer:
      "We charge landlords a small, transparent fee based on the term of the advance. You earn 2% of every dollar advanced to your landlords.",
  },
  {
    question: "Does this affect tenants or rent collection?",
    anwer:
      "No. Tenants pay rent as usual. Repayments are automatically pulled from the landlord's account when rent is received — we never touch trust or operating accounts.",
  },
  {
    question: "Can I see which landlords were funded?",
    anwer:
      "Yes. Your dashboard shows real-time status for every landlord you've referred: invited, approved, funded, and commission paid.",
  },
  {
    question: "How and when do I get paid?",
    anwer:
      "You earn 2% of each funded advance, paid automatically via ACH.",
  },
  {
    question: "What happens if a landlord or tenant defaults?",
    anwer:
      "Rent Capital absorbs that risk. Our structure is a purchase of receivables, not a loan. Neither you nor the landlord are personally liable for tenant nonpayment.",
  },
  {
    question: "Is there any setup cost or commitment?",
    anwer:
      "No. Partnering is free, takes minutes, and requires no system changes. You can start inviting landlords immediately.",
  },
  {
    question: "Can landlords qualify if they have a mortgage or other debt?",
    anwer:
      "Yes. Because we purchase future rent receivables, not the property itself, existing debt doesn't affect eligibility.",
  },
  {
    question: "Can property managers advance rent for their own units?",
    anwer:
      "Yes. PMs who own properties can apply directly as landlords through their own entities.",
  },
  {
    question: "Do property managers get their fees advanced?",
    anwer:
      "No. Rent Capital advances the landlord's share of rent, not management fees. You continue earning your standard management fees monthly.",
  },
];

const ForPropertyManagers: React.FC = () => {

  return (
    <>
      <Navigation />
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center -mt-[69px] pt-[69px] pb-16">
        {/* Background Image - Full Width, starts from top of viewport */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1757137910873-504d97aa80de?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2938')",
          }}
        />
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-background/40" />
        
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-12 items-center w-full">
            {/* Hero Content - Left Aligned */}
            <div className="space-y-5">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-foreground leading-tight">
                  <span className="block">Help your landlords</span>
                  <span className="block">unlock capital and</span>
                  <span className="block">grow your portfolio</span>
                </h1>
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed max-w-xl">
                  Earn 2% on every funded advance — a recurring revenue stream that requires no setup or additional work.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20 transition-all"
                >
                  <a href="mailto:nigel@rentcapital.us">
                    Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20"
                >
                  <a href="#how">
                    How it Works
                  </a>
                </Button>
              </div>
            </div>

            {/* Calculator - Right Side */}
            <div className="lg:pl-8 max-w-lg">
              <PropertyManagerCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Why Property Managers Scale Section */}
      <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimationParent>
            <AnimationChild>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why property managers scale Rent Capital across their portfolios
              </h2>
            </AnimationChild>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimationChild>
                <Card className="p-8 border rounded-xl shadow-md">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#6EE7B7]/10">
                      <TrendingUp className="h-8 w-8 text-[#6EE7B7]" />
                    </div>
                    <h3 className="text-xl font-semibold">Add a new revenue stream</h3>
                    <p className="text-muted-foreground">
                      Earn recurring commissions on every funded advance without changing workflows, staffing, or systems.
                    </p>
                  </div>
                </Card>
              </AnimationChild>
              <AnimationChild>
                <Card className="p-8 border rounded-xl shadow-md">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#6EE7B7]/10">
                      <Users className="h-8 w-8 text-[#6EE7B7]" />
                    </div>
                    <h3 className="text-xl font-semibold">Increase portfolio revenue</h3>
                    <p className="text-muted-foreground">
                      Owners with liquidity reinvest, upgrade units, and stay longer—reducing churn and expanding managed assets.
                    </p>
                  </div>
                </Card>
              </AnimationChild>
              <AnimationChild>
                <Card className="p-8 border rounded-xl shadow-md">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#6EE7B7]/10">
                      <Shield className="h-8 w-8 text-[#6EE7B7]" />
                    </div>
                    <h3 className="text-xl font-semibold">Improve operational stability</h3>
                    <p className="text-muted-foreground">
                      Landlords with cash on hand handle repairs, turns, and vacancies faster, cutting delays and support load on your team.
                    </p>
                  </div>
                </Card>
              </AnimationChild>
            </div>
          </AnimationParent>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8" id="how">
        <div className="max-w-6xl mx-auto">
          <AnimationParent>
            <AnimationChild>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                How It Works
              </h2>
            </AnimationChild>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimationChild>
                <Card className="p-8 border rounded-xl shadow-md">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#6EE7B7]/10">
                      <span className="text-[#6EE7B7] font-bold text-2xl">1</span>
                    </div>
                    <h3 className="text-xl font-semibold">Pre-qualify landlords</h3>
                    <p className="text-muted-foreground">
                      Upload landlord and rent roll data to instantly generate pre-qualified advance offers based on lease terms, rent history, and payment performance.
                    </p>
                  </div>
                </Card>
              </AnimationChild>
              <AnimationChild>
                <Card className="p-8 border rounded-xl shadow-md">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#6EE7B7]/10">
                      <span className="text-[#6EE7B7] font-bold text-2xl">2</span>
                    </div>
                    <h3 className="text-xl font-semibold">Landlord selects offer</h3>
                    <p className="text-muted-foreground">
                      We notify your owners to review their pre-qualified advance options, create an account, and sign electronically. Funding completes within 24 hours.
                    </p>
                  </div>
                </Card>
              </AnimationChild>
              <AnimationChild>
                <Card className="p-8 border rounded-xl shadow-md">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#6EE7B7]/10">
                      <span className="text-[#6EE7B7] font-bold text-2xl">3</span>
                    </div>
                    <h3 className="text-xl font-semibold">You earn automatically</h3>
                    <p className="text-muted-foreground">
                      You earn 2% of every dollar advanced to your landlords, paid out automatically to your connected bank account for each funded deal.
                    </p>
                  </div>
                </Card>
              </AnimationChild>
            </div>
            <AnimationChild>
              <p className="text-center text-muted-foreground max-w-3xl mx-auto mt-12">
                Repayments run automatically via ACH when rent hits the landlord's account. Tenants are unaffected; no changes to your trust or operating accounts.
              </p>
            </AnimationChild>
          </AnimationParent>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-container mx-auto relative">
          <a id="faq" className="absolute top-0 left-0" />
          <AnimationParent>
            <AnimationChild>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                FAQ
              </h2>
            </AnimationChild>

            <div className="w-full">
              {faqItems.map((item, index) => (
                <AnimationChild key={item.question}>
                  <div
                    className={cn(
                      "flex flex-col rounded-3xl w-full border border-border my-2",
                      index === 0 ? "bg-[hsl(0,0%,6%)]/70 backdrop-blur-sm" : "bg-[hsl(0,0%,6%)]"
                    )}
                  >
                    <Collapsible className="w-full">
                      <CollapsibleTrigger className="w-full p-4 text-left text-balance px-6 flex items-center justify-between text-xl text-foreground hover:text-foreground/80">
                        <span>{item.question}</span>
                        <div className="flex flex-shrink-0 items-center size-10 text-primary-foreground font-semibold justify-center leading-none text-center text-4xl rounded-full bg-primary">
                          <ChevronDownIcon className="size-6" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4 px-6 text-balance text-muted-foreground pt-0 text-lg">
                        <p>{item.anwer}</p>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </AnimationChild>
              ))}
            </div>
          </AnimationParent>
        </div>
      </section>

      {/* Full-width CTA Section */}
      <section className="w-full bg-muted/50 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <AnimationParent>
            <AnimationChild>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Bring instant liquidity to your landlords
              </h2>
            </AnimationChild>
            <AnimationChild>
              <p className="text-lg text-muted-foreground mb-8">
                Join our partner program and start earning on funded advances.
              </p>
            </AnimationChild>
            <AnimationChild>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <a href="mailto:nigel@rentcapital.us">
                    Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                >
                  <a href="https://calendly.com/nigel-rentcapital/30min" target="_blank" rel="noopener noreferrer">
                    Book a 15-min demo
                  </a>
                </Button>
              </div>
            </AnimationChild>
          </AnimationParent>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ForPropertyManagers;

