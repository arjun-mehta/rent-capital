import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import Confetti from "react-confetti";
import { Logo } from "./homepage/navigation";
import { Title } from "@/components/Text";

const Contract: React.FC = () => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(true);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [signature, setSignature] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [pdfError, setPdfError] = useState(false);
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
    // Create a download link for the local PDF
    const link = document.createElement("a");
    link.href = "/forms/contract.pdf";
    link.download = "contract.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

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
    <div className="h-screen relative flex flex-col">
      <header className="w-full p-4 flex justify-center px-8 md:px-12">
        <Link to="/" className="flex items-center">
          <Logo className="h-8" />
        </Link>
      </header>

      <main className="flex-1 h-[calc(100svh-112px)] container flex items-center justify-center flex-col mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white w-full flex-1 grid grid-cols-[1fr_400px] items-start shadow-md rounded-xl overflow-hidden">
          <div
            ref={contractRef}
            className="overflow-y-auto size-full flex flex-col bg-gray-50 text-sm border-r"
          >
            <object
              data="/forms/contract.pdf"
              type="application/pdf"
              className="w-full h-full"
              onLoad={() => setPdfLoaded(true)}
              onError={() => setPdfError(true)}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 p-4">
                <div className="text-center max-w-md">
                  <div className="text-amber-600 text-4xl mb-4">⚠️</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Unable to display the PDF
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your browser may not support embedded PDFs. You can download
                    the form or view it on the IRS website.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button
                      onClick={handleDownload}
                      className="flex items-center gap-2"
                    >
                      <Download size={16} /> Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </object>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 w-full h-full flex flex-col justify-between max-w-[400px]"
          >
            <div className="flex-1">
              <div className="items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Revenue Purchase Agreement
                  </h2>
                  <p className="text-sm text-gray-500">
                    Document ID: {documentId}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2 w-full"
                onClick={handleDownload}
              >
                <Download size={16} /> Download PDF
              </Button>
            </div>

            <div className="flex items-start space-x-3">
              <div className="py-1">
                <Checkbox
                  className="size-6 rounded-lg"
                  id="agreement"
                  checked={hasAgreed}
                  onCheckedChange={(checked) => setHasAgreed(checked === true)}
                  disabled={!hasScrolledToBottom}
                />
              </div>
              <label
                htmlFor="agreement"
                className={`text-sm text-balance ${
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

            <div className="my-4">
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
                placeholder="Full name"
                disabled={!hasAgreed}
                required
              />
              {/* <p className="mt-1 text-xs text-gray-500">
                  By typing your name above, you are signing this agreement
                  electronically.
                </p> */}
            </div>

            <footer className="flex mt-4 flex-col gap-2 sm:flex-row">
              <Button
                type="submit"
                className="bg-primary w-full hover:bg-primary/90 text-primary-foreground px-6 py-2 gap-2"
                disabled={!hasAgreed || !signature || isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Sign & Continue"}
                {!isSubmitting && <ArrowRight size={16} />}
              </Button>
            </footer>
          </form>
        </div>
      </main>

      <div className="py-4 text-center">
        <p className="text-xs text-gray-500">
          © 2025 Creator Capital. All rights reserved.
        </p>
      </div>

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
            <Title>Congratulations!</Title>
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
    </div>
  );
};

export default Contract;
