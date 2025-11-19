import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollToElement } from "./scroll";

export function Header() {
  const { toast } = useToast();
  const { scrollToTop } = useScrollToElement();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [units, setUnits] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Apps Script Web App URL
  const waitlistWebhook =
    import.meta.env.VITE_GOOGLE_SCRIPT_WEBHOOK ??
    "https://script.google.com/macros/s/AKfycbx7v770dncGBLhMGA6nuyo119E-nyVkRihygEZDCP9xelQD6ctkwD2WkDdT7-_t3mnAsw/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !units || !monthlyIncome) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Google Apps Script web apps don't support CORS properly, so we use no-cors mode
      // The data will still be saved even though we can't read the response
      await fetch(waitlistWebhook, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script web apps
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          number: phone,
          units,
          monthlyIncome,
          submittedAt: new Date().toISOString(),
        }),
      });

      // With no-cors, we can't read the response, but assume success
      // The data should be saved to the Google Sheet

      toast({
        title: "Thank you!",
        description: "We'll be in touch soon.",
      });

      setName("");
      setEmail("");
      setPhone("");
      setUnits("");
      setMonthlyIncome("");
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    "Instant access to your future rent income",
    "No credit checks or personal guarantees",
    "Repay automatically as tenants pay",
  ];

  return (
    <section className="relative w-full min-h-screen md:h-screen flex items-center justify-center -mt-[69px] md:-mt-[69px] mt-0 pt-[69px] md:pt-[69px] pt-20 pb-8 md:pb-0">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-12 md:py-8">
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-12 items-center w-full">
        {/* Left Side - Hero Content */}
        <div className="space-y-5 pt-8 md:pt-0">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-emilio tracking-tight text-white leading-tight">
              <span className="block">Get your future rent</span>
              <span className="block">income upfront</span>
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
               Access 1 to 9 months of future rent instantly to expand your portfolio, upgrade existing properties, or stabilize cash flow.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="space-y-3 pt-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-white">{benefit}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-2 sm:gap-3 pt-2">
            <Button
              size="lg"
              className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
              onClick={(e) => {
                e.preventDefault();
                const waitlistElement = document.getElementById('waitlist');
                if (waitlistElement) {
                  const navHeight = 80; // Approximate nav bar height
                  const elementPosition = waitlistElement.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - navHeight;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                } else {
                  scrollToTop();
                }
              }}
            >
              Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
            >
              <a href="#how">
                Learn More
              </a>
            </Button>
          </div>
        </div>

        {/* Right Side - Waitlist Form */}
        <div className="lg:pl-8 max-w-lg" id="waitlist">
          <Card className="p-5 sm:p-6 border border-border bg-[#EFE7E3]">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-1.5">
                  Join the Waitlist
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1.5">
                  Get early access and priority processing when we launch.
                </p>
                <p className="text-xs sm:text-sm font-medium text-primary">
                  Join 700+ landlords already on the waitlist
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs text-foreground">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-9 text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs text-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
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
                    <Label htmlFor="phone" className="text-xs text-foreground">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-9 text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="units" className="text-xs text-foreground">
                      # of Units
                    </Label>
                    <Input
                      id="units"
                      type="number"
                      placeholder="5"
                      min="1"
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                      className="h-9 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="monthlyIncome" className="text-xs text-foreground">
                    Total Monthly Rental Income
                  </Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    placeholder="15000"
                    min="0"
                    step="100"
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
        </div>
      </div>
    </section>
  );
}
