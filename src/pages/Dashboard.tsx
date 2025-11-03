import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BadgeCheck,
  Download,
  CreditCard,
  Calendar,
  ArrowRight,
  Bell,
  Shield,
  CheckCircle2,
  Building,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "./homepage/navigation";

const Dashboard: React.FC = () => {
  const [nextPaymentDays, setNextPaymentDays] = useState(14);
  const [bankConnected, setBankConnected] = useState(false);
  const [extensionInstalled, setExtensionInstalled] = useState(false);
  const { isAuthenticated, isPatreonConnected, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if not authenticated or Patreon not connected
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else if (!isPatreonConnected) {
      navigate("/connect-patreon");
    }
  }, [isAuthenticated, isPatreonConnected, navigate]);

  // Countdown for next payment
  useEffect(() => {
    if (nextPaymentDays > 0) {
      const timer = setTimeout(() => {
        setNextPaymentDays((prevDays) => prevDays - 1);
      }, 60000); // Update every minute for demo purposes
      return () => clearTimeout(timer);
    }
  }, [nextPaymentDays]);

  // Mock repayment data
  const repaymentData = {
    totalAmount: 2850,
    amountPaid: 475,
    remainingAmount: 2375,
    progressPercent: Math.round((475 / 2850) * 100),
    nextPaymentAmount: 475,
    nextPaymentDate: new Date(
      Date.now() + nextPaymentDays * 24 * 60 * 60 * 1000
    ),
    totalPayments: 6,
    completedPayments: 1,
    remainingPayments: 5,
  };

  const handleDownloadExtension = () => {
    setExtensionInstalled(true);
    toast({
      title: "Download started",
      description: "The Chrome extension is being downloaded.",
    });
  };

  const handleConnectBank = () => {
    setBankConnected(true);
    toast({
      title: "Bank connection initiated",
      description:
        "You'll be redirected to securely connect your bank account.",
    });
    // Navigate to the established dashboard for demo purposes
    navigate("/dashboard-established");
  };

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header bar */}
      <header className="w-full p-4 flex justify-center px-8 md:px-12">
        <Link to="/" className="flex items-center">
          <Logo className="h-8" />
        </Link>
      </header>

      {/* Main content - Full viewport */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-sm w-full mx-auto">
          <div className="grid grid-cols-1">
            {/* Connect Bank Card */}
            <div className="">
              <div className="p-4">
                <div className="text-primary font-semibold text-lg uppercase tracking-wide">
                  Final Step
                </div>
                <h3 className="text-2xl font-semibold my-2">
                  Connect Bank Account
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Link your bank account securely to receive your funds. Our
                  bank connection process uses industry-standard encryption to
                  protect your information.
                </p>
              </div>

              <div className="p-4">
                <div className="bg-card p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-[#e6f2ee] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900">
                        Secure & Encrypted
                      </h4>
                      <p className="text-sm text-gray-500">
                        Bank-level security protocols
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-primary text-primary-foreground rounded-xl transition-colors duration-200"
                    onClick={handleConnectBank}
                  >
                    Connect Your Bank Account
                  </Button>
                </div>
              </div>
            </div>

            {/* Download Extension Card - Commented out for future use */}
            {/* <div className="">
              <div className="p-4 pb-0">
                <div className="bg-primary text-primary-foreground size-10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className="text-2xl font-semibold mt-4">
                  Download Chrome Extension
                </h3>
              </div>

              <div className="p-4">
                <div className="mb-8">
                  <p className="text-gray-600 leading-relaxed">
                    Our Chrome extension enables seamless payment processing
                    from your Patreon account and provides easy access to your
                    Rent Capital dashboard.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-[#e6f2ee] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900">
                        Simple Installation
                      </h4>
                      <p className="text-sm text-gray-500">
                        Takes less than 30 seconds
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-primary text-primary-foreground py-6 text-lg font-medium rounded-xl transition-colors duration-200"
                    onClick={handleDownloadExtension}
                  >
                    Download Chrome Extension
                  </Button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="py-4 text-center">
        <p className="text-xs text-gray-500">
          © 2025 Rent Capital. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
