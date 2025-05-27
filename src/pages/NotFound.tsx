import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/Text";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-2 text-center">
        <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
        <Title>Page not found</Title>
        <p className="text-sm text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
