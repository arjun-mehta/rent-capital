import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { Logo } from "./homepage/navigation";
import { Title } from "@/components/Text";

const Processing: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Simulate progress and redirect after 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 2; // Use whole number increment
      });
    }, 140); // Adjusted timing to maintain ~7 seconds total

    // Redirect to offers page after 7 seconds
    const redirectTimer = setTimeout(() => {
      navigate("/offers");
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  // List of processing steps
  const processingSteps = [
    { step: "Verifying bank account connection", complete: progress >= 20 },
    { step: "Analyzing lease agreement", complete: progress >= 40 },
    { step: "Processing tenant payment history", complete: progress >= 60 },
    { step: "Calculating rental income", complete: progress >= 80 },
    { step: "Preparing your advance offer", complete: progress >= 100 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 flex justify-center px-8 md:px-12">
        <Link to="/" className="flex items-center">
          <Logo className="h-8" />
        </Link>
      </header>

      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Title>Processing your account</Title>
          <p className="mt-2 text-center text-balance text-sm text-muted-foreground">
            We're analyzing your lease agreement and rental income to prepare your advance offer
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="text-sm font-medium text-foreground">
                  Processing steps:
                </h3>
                <ul className="space-y-3">
                  {processingSteps.map((step, index) => (
                    <li key={index} className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-5 w-5 rounded-full ${
                          step.complete
                            ? "bg-primary"
                            : "border border-border"
                        } mr-3 flex items-center justify-center`}
                      >
                        {step.complete && (
                          <svg
                            className="h-3 w-3 text-primary-foreground"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          step.complete ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-xs text-balance text-muted-foreground mt-6">
              This process typically takes a few moments. Please don't close
              this window.
            </p>
          </div>
        </div>
      </div>
      <div className="py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © 2025 Rent Capital. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Processing;
