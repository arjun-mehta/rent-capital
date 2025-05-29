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
  CreditCard,
  Calendar,
  ArrowRight,
  Bell,
  Shield,
  CheckCircle2,
  Building,
  Zap,
  ChevronDownIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Logo } from "./homepage/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardEstablished: React.FC = () => {
  const [nextPaymentDays, setNextPaymentDays] = useState(14);
  const { isAuthenticated, isPatreonConnected, user } = useAuth();
  const navigate = useNavigate();

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

  // Mock repayment data for a user who is 3 months into their agreement
  const repaymentData = {
    totalAmount: 2850,
    amountPaid: 1425,
    remainingAmount: 1425,
    progressPercent: 50, // 50% complete
    nextPaymentAmount: 475,
    nextPaymentDate: new Date(
      Date.now() + nextPaymentDays * 24 * 60 * 60 * 1000
    ),
    totalPayments: 6,
    completedPayments: 3,
    remainingPayments: 3,
  };

  // Calculate renewal date (3 months from now)
  const renewalDate = new Date();
  renewalDate.setMonth(renewalDate.getMonth() + 3);

  return (
    <div className="min-h-screen">
      {/* Header bar */}
      <div className=" py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/dashboard-established" className="flex items-center">
                <Logo className="h-8" />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:bg-white rounded-full p-1 pr-3">
                  <Avatar className="size-8">
                    <AvatarImage src={user.name} />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Repayment tracker */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Repayment Progress</CardTitle>
                <CardDescription>
                  You're halfway through your repayment!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      ${repaymentData.amountPaid.toLocaleString()} paid
                    </span>
                    <span className="text-sm text-gray-500">
                      ${repaymentData.totalAmount.toLocaleString()} total
                    </span>
                  </div>
                  <Progress value={repaymentData.progressPercent} />
                  <div className="mt-2 text-center">
                    <span className="text-sm font-medium text-gray-700">
                      {repaymentData.progressPercent}% Complete
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">
                      Total Repayment
                    </div>
                    <div className="text-lg font-semibold">
                      ${repaymentData.totalAmount}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">
                      Paid So Far
                    </div>
                    <div className="text-lg font-semibold">
                      ${repaymentData.amountPaid}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Remaining</div>
                    <div className="text-lg font-semibold">
                      ${repaymentData.remainingAmount}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">
                      Est. Final Month
                    </div>
                    <div className="text-lg font-semibold">
                      {calculateFinalMonth()}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Upcoming Payments
                  </h3>
                  <div className="bg-gray-50 text-primary-foreground rounded-lg p-4 flex items-start space-x-4">
                    <Calendar className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Next payment:</h4>
                      <p className="text-sm">
                        In {nextPaymentDays} days on{" "}
                        {repaymentData.nextPaymentDate.toLocaleDateString()}
                      </p>
                      <p className="text-xs mt-1">
                        Payments are automatically processed through your
                        Patreon account
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
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Payment #3
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(
                            Date.now() - 30 * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">$475.00</div>
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary-foreground rounded-full">
                        Completed
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Payment #2
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(
                            Date.now() - 60 * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">$475.00</div>
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary-foreground rounded-full">
                        Completed
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Payment #1
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(
                            Date.now() - 90 * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">$475.00</div>
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary-foreground rounded-full">
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
              <CardHeader>
                <CardTitle>Upcoming Renewal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/10 rounded-lg p-4 flex items-start space-x-4 mb-4">
                  <Zap className="text-primary-500 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-primary-800">
                      Renewal Available: {renewalDate.toLocaleDateString()}
                    </h4>
                    <p className="text-sm text-primary-700 mb-2">
                      Based on your current revenue trends and repayment health,
                      you are eligible for a new advance - even before your
                      current one is fully complete.
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full bg-primary/10 text-primary-foreground px-0"
                >
                  See Renewal Offers <ChevronRightIcon />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start space-x-3">
                    <Bell className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Payment Reminders
                      </h4>
                      <p className="text-gray-600">
                        We'll send you email reminders 3 days before each
                        scheduled payment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Security</h4>
                      <p className="text-gray-600">
                        Your data is encrypted and secure. We use
                        industry-standard security measures.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Automatic Repayments
                      </h4>
                      <p className="text-gray-600">
                        Payments are automatically processed through your
                        Patreon account each month.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Building className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Support</h4>
                      <p className="text-gray-600">
                        Need help? Contact our support team at
                        support@creatorcapital.com
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEstablished;
