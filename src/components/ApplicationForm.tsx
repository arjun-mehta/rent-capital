
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    platform: "",
    revenue: "",
    link: ""
  });
  const [loading, setLoading] = useState(false);

  const platforms = [
    { value: "patreon", label: "Patreon", image: "/lovable-uploads/2eaf1022-49a3-438a-b943-6537f0bead7e.png" },
    { value: "youtube", label: "YouTube", image: "/lovable-uploads/8d03313e-767e-4c31-bca6-07b5e0c8fa02.png" },
    { value: "substack", label: "Substack", image: "/lovable-uploads/df18836f-8cd4-462f-84b0-d917f20195ef.png" },
    { value: "twitch", label: "Twitch", image: "/lovable-uploads/0468e60c-31d5-4d94-b04f-62446d6a00fc.png" },
    { value: "supercast", label: "Supercast", image: "/lovable-uploads/c065b0eb-11e5-4a1b-9b11-a51fda9242d3.png" },
    { value: "other", label: "Other", image: "" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      platform: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Application submitted successfully! We'll be in touch soon.");
      setFormData({
        name: "",
        email: "",
        platform: "",
        revenue: "",
        link: ""
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <section id="application-form" className="py-24 bg-white">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="tag bg-black/5 text-black/80 mb-4">
            Apply Now
          </div>
          <h2 className="heading-lg mb-6">
            Start Your Application in Minutes
          </h2>
          <p className="paragraph text-gray-600 mx-auto max-w-2xl">
            Fill out this short form to get the ball rolling. We'll review your information and get back to you within 48 hours.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-gray-100 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="h-12 mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    required
                    className="h-12 mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="platform">Platform(s) Used</Label>
                  <Select 
                    value={formData.platform} 
                    onValueChange={handleSelectChange}
                    required
                  >
                    <SelectTrigger className="h-12 mt-1">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform) => (
                        <SelectItem key={platform.value} value={platform.value}>
                          <div className="flex items-center gap-2">
                            {platform.image && (
                              <img 
                                src={platform.image} 
                                alt={platform.label} 
                                className="h-5 w-auto object-contain"
                              />
                            )}
                            <span>{platform.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="revenue">Monthly Recurring Revenue ($)</Label>
                  <Input
                    id="revenue"
                    name="revenue"
                    type="text"
                    value={formData.revenue}
                    onChange={handleInputChange}
                    placeholder="5,000"
                    required
                    className="h-12 mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="link">Link to Subscription Page</Label>
                  <Input
                    id="link"
                    name="link"
                    type="url"
                    value={formData.link}
                    onChange={handleInputChange}
                    placeholder="https://"
                    required
                    className="h-12 mt-1"
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className={cn(
                    "primary-button group w-full",
                    "bg-black hover:bg-black/90 h-14"
                  )}
                  disabled={loading}
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting this form, you agree to our Terms of Service and Privacy Policy.
                We'll never share your information with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
