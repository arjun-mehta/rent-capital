import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth";
import { ContractContent } from "@/pages/Contract";
import { PulsingBorder } from "@paper-design/shaders-react";
import {
  BadgeInfoIcon,
  Bell,
  Building,
  Calendar,
  CheckCircle2,
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  CreditCard,
  Shield,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../public/assets/homepage/avatar.png";
import imageStack from "../../public/assets/homepage/stack.png";
import { Logo } from "./homepage/navigation";

const DashboardEstablished: React.FC = () => {
  const [nextPaymentDays, setNextPaymentDays] = useState(14);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAutoRenew, setIsAutoRenew] = useState(false);

  // Add calculation for estimated final month
  const calculateFinalMonth = () => {
    const today = new Date();
    const finalDate = new Date(today);
    finalDate.setMonth(today.getMonth() + repaymentData.remainingPayments);
    return finalDate.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Countdown for next payment
  useEffect(() => {
    if (nextPaymentDays > 0) {
      const timer = setTimeout(() => {
        setNextPaymentDays((prevDays) => prevDays - 1);
      }, 60000); // Update every minute for demo purposes
      return () => clearTimeout(timer);
    }
  }, [nextPaymentDays]);

  // Mock repayment data for a user who is 3 months into their agreement
  // Monthly rent payment: $8,300
  const monthlyPayment = 8300;
  const totalPayments = 6;
  const completedPayments = 3;
  const remainingPayments = totalPayments - completedPayments;
  
  const repaymentData = {
    totalAmount: monthlyPayment * totalPayments, // $49,800
    amountPaid: monthlyPayment * completedPayments, // $24,900
    remainingAmount: monthlyPayment * remainingPayments, // $24,900
    progressPercent: Math.round((completedPayments / totalPayments) * 100), // 50%
    nextPaymentAmount: monthlyPayment, // $8,300
    nextPaymentDate: new Date(
      Date.now() + nextPaymentDays * 24 * 60 * 60 * 1000
    ),
    totalPayments: totalPayments,
    completedPayments: completedPayments,
    remainingPayments: remainingPayments,
  };

  // Calculate renewal date (3 months from now)
  const renewalDate = new Date();
  renewalDate.setMonth(renewalDate.getMonth() + 3);

  return (
    <div className="min-h-screen">
      {/* Header bar */}
      <div className="py-4 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/dashboard-established" className="flex items-center">
                <Logo className="h-8" />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 bg-card hover:bg-muted shadow-xs transition-colors rounded-full p-1 pr-3">
                  <Avatar className="size-8">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <ChevronDownIcon className="size-4" strokeWidth={3} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/">Homepage</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/">Sign Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 mb-10">
        <div className="grid grid-cols-[1fr_320px] gap-5">
          {/* Left column - Repayment tracker */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle className="grow">
                    Repayment Progress
                  </CardTitle>
                  <div className="text-2xl text-right font-semibold leading-none tracking-tight">
                    {repaymentData.progressPercent}%
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CardDescription className="flex items-center grow gap-1">
                    <BadgeInfoIcon className="w-4 h-4" />
                    Based on your rental income history
                  </CardDescription>
                  <div className="text-sm text-muted-foreground text-right">
                    {repaymentData.completedPayments} of {repaymentData.totalPayments} payments
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <Progress value={repaymentData.progressPercent} />

                  <ul className="flex justify-between text-lg font-semibold text-foreground mt-4">
                    <li className="w-[46px] opacity-20">0%</li>
                    <li className="w-[46px] text-center opacity-40">25%</li>
                    <li className="w-[46px] text-center opacity-60">50%</li>
                    <li className="w-[46px] text-center opacity-80">75%</li>
                    <li className="w-[46px] text-center">100%</li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">
                      Total Repayment
                    </div>
                    <div className="text-lg font-semibold">
                      ${repaymentData.totalAmount.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">
                      Paid So Far
                    </div>
                    <div className="text-lg font-semibold">
                      ${repaymentData.amountPaid.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Remaining</div>
                    <div className="text-lg font-semibold">
                      ${repaymentData.remainingAmount.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">
                      Final Month
                    </div>
                    <div className="text-lg font-semibold">
                      {calculateFinalMonth()}
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-medium text-foreground mb-4">
                    Upcoming Payments
                  </h3>
                  <div className="bg-muted rounded-lg p-4 flex items-start space-x-4">
                    <Calendar className="h-5 w-5 mt-0.5 flex-shrink-0 text-foreground" />
                    <div>
                      <h4 className="font-medium text-foreground">Next payment:</h4>
                      <p className="text-sm text-foreground">
                        In {nextPaymentDays} days on{" "}
                        {repaymentData.nextPaymentDate.toLocaleDateString()}
                      </p>
                      <p className="text-xs mt-1 text-muted-foreground">
                        Payments are automatically ACH-debited from your bank account each month
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Your past repayments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">
                          Payment #3
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(
                            Date.now() - 30 * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">
                        ${monthlyPayment.toLocaleString()}.00
                      </div>
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                        Completed
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">
                          Payment #2
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(
                            Date.now() - 60 * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">
                        ${monthlyPayment.toLocaleString()}.00
                      </div>
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                        Completed
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">
                          Payment #1
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(
                            Date.now() - 90 * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">
                        ${monthlyPayment.toLocaleString()}.00
                      </div>
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex pb-2 items-center justify-between w-full flex-row">
                {/* <div className="flex items-center justify-center mb-4 flex-shrink-0 bg-white rounded-full size-10">
                  <Zap className="text-primary-500 h-5 w-5 flex-shrink-0" />
                </div> */}
                <CardTitle className="text-lg w-full">
                  Eligible for Renewal
                </CardTitle>
                {/* <span className="!mt-0 text-sm font-normal">
                  {renewalDate.toLocaleDateString()}
                </span> */}
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                Based on your tenant’s payment history, you’re eligible to receive 12 months of rent upfront once they renew with a new fixed-term lease.</CardDescription>
                <Button
                  size="sm"
                  type="button"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Upload New Lease <ChevronRightIcon />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex pb-2 items-center justify-between w-full flex-row">
                <CardTitle className="text-lg w-full">
                  New Property Advance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Have another rental property? Get an advance on a new fixed-term lease for a property you own.
                </CardDescription>
                <Button
                  size="sm"
                  type="button"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => navigate("/select-platform")}
                >
                  Start New Advance <ChevronRightIcon />
                </Button>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader className="flex pb-2 items-center justify-between w-full flex-row">
                <CardTitle className="text-lg w-full">
                  Auto-Renew Advances
                </CardTitle>
                <Switch
                  className="!mt-0"
                  checked={isAutoRenew}
                  onCheckedChange={(value) => {
                    if (!value) {
                      setIsAutoRenew(false);
                    }

                    setIsOpen(value);
                  }}
                />
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every 3 or 6 months, additional advances are deposited
                  automatically based on your rental income.{" "}
                  <Link to="#" className="underline underline-offset-2">
                    Cancel anytime
                  </Link>
                  .
                </CardDescription>
              </CardContent>
            </Card> */}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg w-full">
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start space-x-3">
                    <Bell className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">
                        Payment Reminders
                      </h4>
                      <p className="text-muted-foreground">
                        We'll send you email reminders 3 days before each
                        scheduled payment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Security</h4>
                      <p className="text-muted-foreground">
                        Your data is encrypted and secure. We use
                        industry-standard security measures.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">
                        Automatic Repayments
                      </h4>
                      <p className="text-muted-foreground">
                        Payments are automatically ACH-debited from your bank account each month.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Building className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Support</h4>
                      <p className="text-muted-foreground">
                        Need help? Contact our support team at
                        support@rentcapital.com
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
                <ContractContent
                  height="80svh"
                  setIsOpen={setIsOpen}
                  navigateTo="/dashboard-established"
                  onComplete={() => setIsAutoRenew(true)}
                  notes={
                    <>
                      <div className="space-y-4 text-sm mt-6">
                        <div className="flex items-start space-x-2 text-muted-foreground">
                          <CheckCircle2Icon
                            className="size-6 text-primary flex-shrink-0"
                            strokeWidth={1.5}
                          />
                          <p className="text-base text-balance">
                            Repayments are automatically ACH-debited from your bank account each month.
                          </p>
                        </div>

                        <div className="flex items-start space-x-2 text-muted-foreground">
                          <CheckCircle2Icon
                            className="size-6 text-primary flex-shrink-0"
                            strokeWidth={1.5}
                          />
                          <p className="text-base text-balance">
                            We never access or handle any funds other than rent payments by this tenant.
                          </p>
                        </div>
                      </div>
                    </>
                  }
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEstablished;
