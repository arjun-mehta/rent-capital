import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { Logo } from "./homepage/navigation";
import { Title } from "@/components/Text";

const Processing: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const { isAuthenticated, isPatreonConnected } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if not authenticated or Patreon not connected
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else if (!isPatreonConnected) {
      navigate("/connect-patreon");
    }
  }, [isAuthenticated, isPatreonConnected, navigate]);

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
    { step: "Connecting to Patreon", complete: progress >= 20 },
    { step: "Fetching subscription data", complete: progress >= 40 },
    { step: "Analyzing revenue streams", complete: progress >= 60 },
    { step: "Calculating funding options", complete: progress >= 80 },
    { step: "Preparing your offer", complete: progress >= 100 },
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
          <p className="mt-2 text-center text-balance text-sm text-gray-600">
            We're analyzing your subscription data to prepare your funding offer
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="text-sm font-medium text-gray-900">
                  Processing steps:
                </h3>
                <ul className="space-y-3">
                  {processingSteps.map((step, index) => (
                    <li key={index} className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-5 w-5 rounded-full ${
                          step.complete
                            ? "bg-primary"
                            : "border border-gray-300"
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
                          step.complete ? "text-gray-900" : "text-gray-500"
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
            <p className="text-xs text-balance text-gray-500 mt-6">
              This process typically takes a few moments. Please don't close
              this window.
            </p>
          </div>
        </div>
      </div>
      <div className="py-4 text-center">
        <p className="text-xs text-gray-500">
          © 2025 Creator Capital. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Processing;
