
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="max-w-md text-center">
        <h1 className="heading-xl mb-6 animate-fade-in">404</h1>
        <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button 
          className="primary-button group animate-fade-in"
          style={{ animationDelay: "0.2s" }}
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
