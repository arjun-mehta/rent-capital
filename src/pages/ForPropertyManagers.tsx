import { Navigation } from "./homepage/navigation";
import { Footer } from "./homepage/footer";
import { AnimationParent, AnimationChild } from "./homepage/animations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Shield,
  ChevronDownIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { PropertyManagerCalculator } from "@/components/PropertyManagerCalculator";
import OffersScreenMockup from "@/components/OffersScreenMockup";
import { useState } from "react";

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
  const { toast } = useToast();
  // Waitlist form state and handler - commented out for future use
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [units, setUnits] = useState("");
  // const [monthlyIncome, setMonthlyIncome] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const waitlistWebhook =
  //   import.meta.env.VITE_GOOGLE_SCRIPT_WEBHOOK ??
  //   "https://script.google.com/macros/s/AKfycbzsupByrQ_Ey5r5PC-Z4WFqzkSjZAL1u7Lm3zms1eRnmtuth1ihz6rlDKOnDpos8vct_g/exec";

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!name || !email || !phone || !units || !monthlyIncome) {
  //     toast({
  //       title: "Please fill in all fields",
  //       description: "All fields are required.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     await fetch(waitlistWebhook, {
  //       method: "POST",
  //       mode: "no-cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         number: phone,
  //         units,
  //         monthlyIncome,
  //         submittedAt: new Date().toISOString(),
  //         source: "property-manager",
  //       }),
  //     });

  //     toast({
  //       title: "Thank you!",
  //       description: "We'll be in touch soon.",
  //     });

  //     setName("");
  //     setEmail("");
  //     setPhone("");
  //     setUnits("");
  //     setMonthlyIncome("");
  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       title: "Something went wrong",
  //       description: "Please try again later.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <>
      <Navigation />
      {/* Hero Section */}
      <section className="relative w-full min-h-screen md:h-screen flex items-center justify-center -mt-[69px] md:-mt-[69px] mt-0 pt-[69px] md:pt-[69px] pt-20 pb-0 md:pb-0">
        {/* Background Image - Full Width, starts from top of viewport */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat md:-top-[69px] top-0"
          style={{
            backgroundImage: "url('/assets/homepage/neighbhorhood.png')",
            height: "calc(100% + 69px)",
          }}
        />
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/70 md:-top-[69px] top-0" style={{ height: "calc(100% + 69px)" }} />
        
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-4 md:py-8">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-12 items-center w-full">
            {/* Hero Content - Left Aligned */}
            <div className="space-y-5 pt-8 md:pt-0">
              <div className="space-y-4">
                <p className="text-sm sm:text-base font-medium text-white/80 uppercase tracking-wide">
                  For residential property managers
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-emilio tracking-tight text-white leading-tight">
                  <span className="block">Offer your landlords</span>
                  <span className="block">our money under</span>
                  <span className="block">your brand</span>
                </h1>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
                  Launch a white-labeled rent advance program in 24 hours and earn 2% commission on every dollar advanced.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
                >
                  <a href="mailto:nigel@rentcapital.com">
                    Email Us
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
                >
                  <a href="https://calendly.com/nigel-rentcapital-rj_8/30min" target="_blank" rel="noopener noreferrer">
                    Book a 15-min demo <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* MacBook Mockup */}
            <div className="lg:pl-8 w-full flex items-center justify-center">
              <OffersScreenMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form Section - Commented out for future use */}
      {/* <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-2xl mx-auto">
          <Card className="p-5 sm:p-6 border border-border bg-[#EFE7E3]" id="waitlist">
            <div className="space-y-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-1.5">
                      Join the Waitlist
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1.5">
                      Get early access and priority onboarding for your landlords.
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-primary">
                      Join 300+ property managers already on the waitlist
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="pm-name" className="text-xs text-foreground">
                          Full Name
                        </Label>
                        <Input
                          id="pm-name"
                          type="text"
                          placeholder="John Smith"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-9 text-sm"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="pm-email" className="text-xs text-foreground">
                          Email Address
                        </Label>
                        <Input
                          id="pm-email"
                          type="email"
                          placeholder="john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-9 text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="pm-phone" className="text-xs text-foreground">
                          Phone Number
                        </Label>
                        <Input
                          id="pm-phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="h-9 text-sm"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="pm-units" className="text-xs text-foreground">
                          # of Units Managed
                        </Label>
                        <Input
                          id="pm-units"
                          type="number"
                          placeholder="25"
                          min="1"
                          value={units}
                          onChange={(e) => setUnits(e.target.value)}
                          className="h-9 text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="pm-monthlyIncome" className="text-xs text-foreground">
                          Total Monthly Rental Volume
                      </Label>
                      <Input
                        id="pm-monthlyIncome"
                        type="number"
                        placeholder="15000"
                        min="0"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(e.target.value)}
                        className="h-9 text-sm"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all h-9 text-sm disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Join Waitlist"}
                      {!isSubmitting && <ArrowRight className="ml-2 h-3.5 w-3.5" />}
                    </Button>
                  </form>
            </div>
          </Card>
        </div>
      </section> */}

      {/* Calculator Section */}
      <section className="w-full pt-24 pb-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-emilio">
                Estimate your commission revenue
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Use the calculator to see how much your firm can earn when landlords take advances.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                {[
                  "Commission-based revenue per funded advance.",
                  "No balance sheet risk. You are never the lender.",
                  "Uses live rent roll data with no workflow changes.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-3xl p-4 sm:p-6 border border-border shadow-lg">
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
              <h2 className="text-3xl md:text-4xl font-emilio text-center mb-12">
                <span className="block">Grow your property management business</span>
                <span className="block">with little effort and no risk</span>
              </h2>
            </AnimationChild>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimationChild>
                <Card className="p-8 rounded-xl shadow-md h-full flex flex-col">
                  <div className="flex flex-col space-y-4 flex-grow">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Make more money without more work</h3>
                    <p className="text-muted-foreground flex-grow">
                      Earn recurring revenue on every funded advance without hiring or adding complexity. It layers directly onto your existing business.
                    </p>
                  </div>
                </Card>
              </AnimationChild>
              <AnimationChild>
                <Card className="p-8 rounded-xl shadow-md h-full flex flex-col">
                  <div className="flex flex-col space-y-4 flex-grow">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Help landlords grow and stick with you</h3>
                    <p className="text-muted-foreground flex-grow">
                      Access to capital helps landlords handle repairs, upgrades, and acquisitions faster. Growing landlords stay longer and consolidate more properties with managers they trust.
                    </p>
                  </div>
                </Card>
              </AnimationChild>
              <AnimationChild>
                <Card className="p-8 rounded-xl shadow-md h-full flex flex-col">
                  <div className="flex flex-col space-y-4 flex-grow">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">No risk. Nothing changes.</h3>
                    <p className="text-muted-foreground flex-grow">
                      We manage everything in the background so your workflows and team stay exactly the same.
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
              <h2 className="text-3xl md:text-4xl font-emilio text-center mb-12">
                How It Works
              </h2>
            </AnimationChild>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimationChild>
                <Card className="p-8 rounded-xl shadow-md h-full flex flex-col">
                  <div className="flex flex-col space-y-4 flex-grow">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      <span className="text-primary font-bold text-2xl">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Turn on your branded rent advance program</h3>
                    <p className="text-muted-foreground flex-grow">
                      Add your logo and brand colors. We take care of everything else.
                    </p>
                  </div>
                </Card>
              </AnimationChild>
              <AnimationChild>
                <Card className="p-8 rounded-xl shadow-md h-full flex flex-col">
                  <div className="flex flex-col space-y-4 flex-grow">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      <span className="text-primary font-bold text-2xl">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Invite your landlords</h3>
                    <p className="text-muted-foreground flex-grow">
                      Share a link or invite landlords directly. We handle approvals and funding.
                    </p>
                  </div>
                </Card>
              </AnimationChild>
              <AnimationChild>
                <Card className="p-8 rounded-xl shadow-md h-full flex flex-col">
                  <div className="flex flex-col space-y-4 flex-grow">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      <span className="text-primary font-bold text-2xl">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Earn automatically</h3>
                    <p className="text-muted-foreground flex-grow">
                      Receive 2% of every funded advance, paid automatically.
                    </p>
                  </div>
                </Card>
              </AnimationChild>
            </div>
            <AnimationChild>
              <p className="text-center text-muted-foreground max-w-3xl mx-auto mt-12">
                We take care of everything in the background. Nothing changes for your team.
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
              <h2 className="text-3xl md:text-4xl font-emilio text-center mb-12">
                FAQ
              </h2>
            </AnimationChild>

            <div className="w-full">
              {faqItems.map((item, index) => (
                <AnimationChild key={item.question}>
                  <div
                    className={cn(
                      "flex flex-col rounded-3xl w-full border border-border my-2",
                      "bg-card"
                    )}
                  >
                    <Collapsible className="w-full">
                      <CollapsibleTrigger className="w-full p-4 text-left text-balance px-6 flex items-center justify-between text-xl text-foreground hover:text-foreground/80">
                        <span>{item.question}</span>
                        <div className="flex flex-shrink-0 items-center size-10 text-primary-foreground font-semibold justify-center leading-none text-center text-4xl rounded-full bg-primary">
                          <ChevronDownIcon className="size-6" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4 px-6 text-muted-foreground pt-0 text-lg">
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
              <h2 className="text-3xl md:text-4xl font-emilio mb-4">
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
                  <a href="mailto:nigel@rentcapital.com">
                    Email Us
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                >
                  <a href="https://calendly.com/nigel-rentcapital-rj_8/30min" target="_blank" rel="noopener noreferrer">
                    Book a 15-min demo <ArrowRight className="ml-2 h-4 w-4" />
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

