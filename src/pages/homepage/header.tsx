import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [units, setUnits] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Thank you!",
        description: "We'll be in touch soon with your advance offer.",
      });
      setName("");
      setEmail("");
      setPhone("");
      setUnits("");
      setMonthlyIncome("");
    }, 1000);
  };

  const benefits = [
    "Get up to 12 months of rent upfront",
    "No personal guarantees required",
    "Repayment based on rental income",
  ];

  return (
    <section className="relative w-full h-screen flex items-center justify-center -mt-[69px] pt-[69px]">
      {/* Background Image - Full Width, starts from top of viewport */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://rentcapital.us/assets/hero-bg-HC0_oLit.jpg')",
        }}
      />
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-background/75" />
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-12 items-center w-full">
        {/* Left Side - Hero Content */}
        <div className="space-y-5">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-foreground leading-tight">
              <span className="block">Instant cash</span>
              <span className="block">for landlords</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/90 leading-relaxed max-w-xl">
              Rent Capital advances you 90% of your upcoming rental income in exchange for a small flat 10% fee. No loans, no credit checks — just fast, flexible capital for landlords.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="space-y-3 pt-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-foreground">{benefit}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a href="#waitlist">
                Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
            >
              <a href="#how">
                Learn More
              </a>
            </Button>
          </div>
        </div>

        {/* Right Side - Waitlist Form */}
        <div className="lg:pl-8 max-w-lg" id="waitlist">
          <Card className="p-5 sm:p-6 border border-border">
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
                    Total Monthly Income
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
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-9 text-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Join Waitlist"}
                  {!isSubmitting && <ArrowRight className="ml-2 h-3.5 w-3.5" />}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center">
                By joining, you agree to receive updates from Rent Capital. We respect your privacy.
              </p>
            </div>
          </Card>
        </div>
        </div>
      </div>
    </section>
  );
}
