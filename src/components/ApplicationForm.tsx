import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const ApplicationForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [revenue, setRevenue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!name || !email || !revenue) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, revenue }),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setSubmitted(true);
        toast({
          title: "Success",
          description: "Your application has been submitted!",
        });
        // Clear form fields
        setName("");
        setEmail("");
        setRevenue("");
      } else {
        console.error('Form submission failed');
        toast({
          title: "Error",
          description: "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="application-form" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Apply in Minutes
          </h2>
          
          <p className="text-gray-600 text-lg">
            Fill out the form below to start your application.
          </p>
        </div>
        
        <Card className="max-w-lg mx-auto shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">
              {submitted ? "Application Submitted!" : "Enter Your Details"}
            </CardTitle>
            <CardDescription>
              {submitted ? (
                <div className="flex items-center justify-center text-green-500">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Thank you for applying! We'll be in touch soon.
                </div>
              ) : (
                "Please provide the following information to apply."
              )}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className={submitted ? "hidden" : ""}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your full name" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    placeholder="Enter your email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="revenue">
                    Annual Subscription Revenue ($USD)
                  </Label>
                  <Input 
                    id="revenue" 
                    placeholder="Enter your annual revenue" 
                    type="number" 
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={submitted} onClick={handleSubmit}>
              Submit Application
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default ApplicationForm;
