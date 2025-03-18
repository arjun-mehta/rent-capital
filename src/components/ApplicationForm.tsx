
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const ApplicationForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("");
  const [revenue, setRevenue] = useState("");
  const [subscriptionUrl, setSubscriptionUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!name || !email || !platform || !revenue) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
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
        body: JSON.stringify({ 
          name, 
          email, 
          platform, 
          revenue, 
          subscriptionUrl 
        }),
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
        setPlatform("");
        setRevenue("");
        setSubscriptionUrl("");
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
          <h2 className="text-3xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Apply in Minutes
          </h2>
          
          <p className="text-gray-600 text-lg">
            Fill out this short form to get the ball rolling. We'll review your information and get back to you within 48 hours.
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
                    placeholder="Your name" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    placeholder="you@example.com" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform(s) Used</Label>
                  <Select onValueChange={setPlatform} value={platform}>
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patreon">Patreon</SelectItem>
                      <SelectItem value="substack">Substack</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="twitch">Twitch</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="revenue">
                    Monthly Recurring Revenue ($)
                  </Label>
                  <Input 
                    id="revenue" 
                    placeholder="5,000" 
                    type="text" 
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subscription-url">
                    Link to Subscription Page
                  </Label>
                  <Input 
                    id="subscription-url" 
                    placeholder="https://" 
                    type="url" 
                    value={subscriptionUrl}
                    onChange={(e) => setSubscriptionUrl(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              disabled={submitted} 
              onClick={handleSubmit}
              className="w-full bg-green-700 hover:bg-green-800"
            >
              Submit Application
            </Button>
            {!submitted && (
              <p className="text-sm text-gray-500 text-center">
                By submitting this form, you agree to our Terms of Service and Privacy Policy. 
                We'll never share your information with third parties.
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default ApplicationForm;
