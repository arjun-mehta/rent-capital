import { Link } from "react-router-dom";
import { Navigation } from "./homepage/navigation";
import { Footer } from "./homepage/footer";
import { AnimationParent, AnimationChild } from "./homepage/animations";
import { Title } from "@/components/Text";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Shield } from "lucide-react";

const ForPropertyManagers: React.FC = () => {

  return (
    <>
      <Navigation />
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center -mt-[69px] pt-[69px]">
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
          <div className="max-w-3xl mx-auto">
            {/* Hero Content */}
            <div className="space-y-5 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-foreground leading-tight">
                  <span className="block">Help your landlords</span>
                  <span className="block">unlock capital and grow</span>
                  <span className="block">your portfolio</span>
                </h1>
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed max-w-xl mx-auto">
                  We advance your landlords up to 95% of their future rent upfront. You earn a 20% share of our fee automatically. No added work required.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20 transition-all"
                >
                  <Link to="/signin">
                    Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
          </div>
        </div>
      </section>

      <div className="min-h-screen flex flex-col" id="details">
        <div className="flex-1 flex flex-col items-center justify-center py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl">
            {/* Why Property Managers Scale Section */}
            <AnimationParent className="mb-20 md:mb-24">
              <AnimationChild>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                  Why property managers scale Rent Capital across their portfolios
                </h2>
              </AnimationChild>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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

            {/* How It Works Section */}
            <AnimationParent className="mb-20 md:mb-24" id="how">
              <AnimationChild>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                  How It Works
                </h2>
              </AnimationChild>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimationChild>
                  <Card className="p-8 border rounded-xl shadow-md">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#6EE7B7] text-white font-bold text-2xl">
                        1
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
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#6EE7B7] text-white font-bold text-2xl">
                        2
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
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#6EE7B7] text-white font-bold text-2xl">
                        3
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
        </div>
      </div>

      {/* Full-width CTA Section */}
      <AnimationParent className="w-full bg-muted/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
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
              <Link to="/signin">
                Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
            >
              <a href="#">
                Book a 15-min demo
              </a>
            </Button>
          </div>
          </AnimationChild>
        </div>
      </AnimationParent>

      <Footer />
    </>
  );
};

export default ForPropertyManagers;

