import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import Confetti from "react-confetti";
import { Logo } from "./homepage/navigation";

const Contract: React.FC = () => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [signature, setSignature] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [documentId] = useState(
    () => `CCA-${Math.floor(Math.random() * 1000000)}`
  );
  const contractRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, isPatreonConnected, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Track window dimensions for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Redirect if not authenticated or Patreon not connected
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else if (!isPatreonConnected) {
      navigate("/connect-patreon");
    }
  }, [isAuthenticated, isPatreonConnected, navigate]);

  // Check if user has scrolled to bottom of contract
  useEffect(() => {
    const handleScroll = () => {
      if (contractRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contractRef.current;
        // Consider "scrolled to bottom" when within 30px of the bottom
        if (scrollHeight - scrollTop - clientHeight < 30) {
          setHasScrolledToBottom(true);
        }
      }
    };

    const contractElement = contractRef.current;
    if (contractElement) {
      contractElement.addEventListener("scroll", handleScroll);
      return () => contractElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleDownload = () => {
    // In a real app, this would download the PDF
    toast({
      title: "Download started",
      description: "The contract is being downloaded as a PDF.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call for contract signing
    setTimeout(() => {
      // Show confetti and celebration modal with a slight delay for better effect
      setShowConfetti(true);
      setTimeout(() => {
        setShowCelebration(true);
      }, 300);

      toast({
        title: "Contract signed!",
        description: "Your contract has been signed successfully.",
      });

      // Remove the automatic navigation
      setIsSubmitting(false);
    }, 1000);
  };

  const handleContinueToDashboard = () => {
    // First hide the confetti and celebration
    setShowConfetti(false);
    setShowCelebration(false);
    // Then navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col ">
      <header className="w-full p-4 flex justify-center px-8 md:px-12">
        <Link to="/" className="flex items-center">
          <Logo className="h-8" />
        </Link>
      </header>

      {/* Confetti overlay */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={500}
          initialVelocityY={15}
          gravity={0.2}
          colors={["#017354", "#64D2B1", "#FFC700", "#FF6B6B", "#5D5FEF"]}
          confettiSource={{
            x: 0,
            y: -50, // Start from above the screen
            w: windowDimensions.width,
            h: 0,
          }}
        />
      )}

      <main className="flex-1 container flex items-center justify-center flex-col mx-auto px-4 py-8 pb-16 max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl text-balance md:text-4xl font-bold text-gray-900 mb-2">
            Revenue Purchase Agreement
          </h1>
          <p className="text-md text-gray-600 text-balance max-w-3xl mx-auto">
            Please review and sign the agreement to receive your funding.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl overflow-hidden mb-12">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Revenue Purchase Agreement
                </h2>
                <p className="text-sm text-gray-500">
                  Document ID: {documentId}
                </p>
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleDownload}
              >
                <Download size={16} /> Download PDF
              </Button>
            </div>

            {/* Contract content */}
            <div
              ref={contractRef}
              className="h-80 overflow-y-auto border border-gray-200 rounded-md p-4 mb-6 bg-gray-50 text-sm"
            >
              <h3 className="font-bold mb-4">REVENUE PURCHASE AGREEMENT</h3>

              <p className="mb-4">
                This Revenue Purchase Agreement ("Agreement") is entered into as
                of {new Date().toLocaleDateString()}, by and between Creator
                Capital Inc., a Delaware corporation ("Company") and{" "}
                {user?.name || "Creator"} ("Creator").
              </p>

              <h4 className="font-bold mt-6 mb-2">1. REVENUE PURCHASE</h4>
              <p className="mb-4">
                Subject to the terms and conditions of this Agreement, Company
                agrees to provide Creator with funds in the amount specified in
                the selected plan ("Purchase Amount") in exchange for the right
                to receive a portion of Creator's future Subscription Revenue
                (as defined below).
              </p>

              <h4 className="font-bold mt-6 mb-2">2. REPAYMENT TERMS</h4>
              <p className="mb-4">
                Creator agrees to pay the Purchase Amount plus the fee according
                to the selected plan's monthly payment schedule. Payments will
                be automatically deducted from Creator's connected Patreon
                account on a monthly basis until the total repayment amount has
                been satisfied.
              </p>

              <h4 className="font-bold mt-6 mb-2">
                3. SUBSCRIPTION REVENUE DEFINED
              </h4>
              <p className="mb-4">
                "Subscription Revenue" means all revenue earned by Creator
                through subscription payments from supporters on Patreon or
                other subscription platforms. This includes all tiers and
                membership levels offered by Creator.
              </p>

              <h4 className="font-bold mt-6 mb-2">4. CREATOR OBLIGATIONS</h4>
              <p className="mb-4">
                Creator agrees to:
                <br />
                (a) Maintain their creator account in good standing;
                <br />
                (b) Continue creating content according to their established
                schedule;
                <br />
                (c) Not take actions specifically designed to reduce
                subscription revenue during the repayment period;
                <br />
                (d) Provide access to subscription revenue data during the
                repayment period.
              </p>

              <h4 className="font-bold mt-6 mb-2">5. DEFAULT</h4>
              <p className="mb-4">
                Creator will be in default if any monthly payment is more than
                15 days late. In the event of default, the entire unpaid balance
                may become immediately due and payable.
              </p>

              <h4 className="font-bold mt-6 mb-2">6. TERM</h4>
              <p className="mb-4">
                This Agreement begins on the date of signing and continues until
                the Purchase Amount plus fee has been repaid in full.
              </p>

              <h4 className="font-bold mt-6 mb-2">7. CONFIDENTIALITY</h4>
              <p className="mb-4">
                The terms of this Agreement are confidential and shall not be
                disclosed except as required by law.
              </p>

              <h4 className="font-bold mt-6 mb-2">8. GOVERNING LAW</h4>
              <p className="mb-4">
                This Agreement is governed by the laws of the State of Delaware.
              </p>

              <h4 className="font-bold mt-6 mb-2">9. ENTIRE AGREEMENT</h4>
              <p className="mb-4">
                This Agreement constitutes the entire understanding between the
                parties concerning the subject matter hereof.
              </p>

              <div className="h-20"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreement"
                  checked={hasAgreed}
                  onCheckedChange={(checked) => setHasAgreed(checked === true)}
                  disabled={!hasScrolledToBottom}
                />
                <label
                  htmlFor="agreement"
                  className={`text-sm ${
                    !hasScrolledToBottom ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  I have read and agree to the terms and conditions outlined in
                  this agreement.
                  {!hasScrolledToBottom && (
                    <span className="block text-amber-600 mt-1">
                      Please scroll to the bottom of the contract first.
                    </span>
                  )}
                </label>
              </div>

              <div>
                <label
                  htmlFor="signature"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Electronic Signature (Type your full name)
                </label>
                <input
                  id="signature"
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Type your full name"
                  disabled={!hasAgreed}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  By typing your name above, you are signing this agreement
                  electronically.
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 gap-2"
                  disabled={!hasAgreed || !signature || isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Sign & Continue"}
                  {!isSubmitting && <ArrowRight size={16} />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Enhanced celebration modal */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fade-in"></div>
          <div className="relative bg-white rounded-xl p-8 shadow-xl animate-bounce-in text-center max-w-md w-full mx-4">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="text-7xl animate-bounce">🎉</div>
                <div className="absolute -right-6 -top-4 text-5xl animate-pulse">
                  ✨
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-primary mt-6 mb-3">
              Congratulations!
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              We're excited to help you level up.
            </p>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-3"
              onClick={handleContinueToDashboard}
            >
              Continue to Dashboard
            </Button>
          </div>
        </div>
      )}
      <div className="py-4 text-center">
        <p className="text-xs text-gray-500">
          © 2025 Creator Capital. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Contract;
