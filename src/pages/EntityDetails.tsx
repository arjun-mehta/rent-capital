import { Title } from "@/components/Text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Info, Upload, CheckCircle2, X, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./homepage/navigation";

const EntityDetails: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [entityType, setEntityType] = useState<"business" | "individual">("business");
  const [legalName, setLegalName] = useState<string>("");
  const [ein, setEin] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Validate form
  useEffect(() => {
    const validLegalName = !!legalName.trim();
    const validAddress = !!address.trim();
    const validPhone = !!phone.trim();
    const validDocument = !!uploadedFile;
    
    // Validate EIN for business or SSN for individual
    let validTaxId = false;
    if (entityType === "business") {
      // EIN format: XX-XXXXXXX or XXXXXXXXX
      validTaxId = /^[0-9]{2}-[0-9]{7}$/.test(ein) || /^[0-9]{9}$/.test(ein);
    } else {
      // SSN format: XXX-XX-XXXX or XXXXXXXXX
      validTaxId = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/.test(ein) || /^[0-9]{9}$/.test(ein);
    }

    setIsFormValid(
      validLegalName && validTaxId && validAddress && validPhone && validDocument && isAuthorized
    );
  }, [legalName, ein, address, phone, uploadedFile, isAuthorized, entityType]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type (PDF, images, etc.)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF, Word document, or image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Simulate file upload - in production, you would upload to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUploadedFile(file);
      setUploadedFileName(file.name);
      
      toast({
        title: "Success!",
        description: "Your ownership document has been uploaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContinue = () => {
    navigate('/business-verification?type=business');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 flex justify-center px-8 md:px-12">
        <Link to="/" className="flex items-center">
          <Logo className="h-8" />
        </Link>
      </header>

      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Title>Ownership Information</Title>
          <p className="text-md text-balance text-muted-foreground max-w-2xl mx-auto">
            Please provide your basic details to proceed with your revenue
            purchase agreement.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-6 mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Ownership Type</Label>
              <ToggleGroup
                type="single"
                value={entityType}
                onValueChange={(value) => {
                  if (value) {
                    setEntityType(value as "business" | "individual");
                    setEin(""); // Clear tax ID when switching entity types
                  }
                }}
                className="justify-start"
              >
                <ToggleGroupItem value="business" aria-label="Business">
                  Business
                </ToggleGroupItem>
                <ToggleGroupItem value="individual" aria-label="Individual">
                  Individual
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="legal-name">
                {entityType === "business" ? "Legal Business Name" : "Legal Name"}
              </Label>
              <Input
                id="legal-name"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                placeholder={entityType === "business" ? "Enter your legal business name" : "Enter your legal name"}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ein">
                {entityType === "business" ? "Tax ID (EIN)" : "Social Security Number (SSN)"}
                <span className="text-xs text-muted-foreground ml-1">
                  {entityType === "business" 
                    ? "Format: XX-XXXXXXX or XXXXXXXXX"
                    : "Format: XXX-XX-XXXX or XXXXXXXXX"}
                </span>
              </Label>
              <Input
                id="ein"
                value={ein}
                onChange={(e) => setEin(e.target.value)}
                placeholder={entityType === "business" ? "XX-XXXXXXX" : "XXX-XX-XXXX"}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                {entityType === "business" ? "Business Address" : "Address"}
              </Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={entityType === "business" ? "Enter your full business address" : "Enter your full address"}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                {entityType === "business" ? "Business Phone Number" : "Phone Number"}
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={entityType === "business" ? "Enter your business phone number" : "Enter your phone number"}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label>
                Ownership Verification Document
                <span className="text-xs text-muted-foreground ml-1">
                  Upload a document that shows owner name and verifies ownership
                </span>
              </Label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
              {uploadedFile ? (
                <div className="border rounded-md p-4 bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground truncate">{uploadedFileName}</span>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Replace
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveFile}
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-20 border-dashed"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 mr-2" />
                      Click to upload document (PDF, Word, or image)
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="authorization"
                  checked={isAuthorized}
                  onCheckedChange={(checked) => setIsAuthorized(checked as boolean)}
                  className="mt-1"
                />
                <Label
                  htmlFor="authorization"
                  className="text-sm text-foreground font-normal cursor-pointer"
                >
                  I authorize Rent Capital to verify my business information and
                  creditworthiness. This may include a soft business credit inquiry, 
                  which will not affect my personal credit.
                </Label>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-muted-foreground text-sm mb-4">
            <Info className="h-4 w-4 mr-2" />
            <p>
              All information is securely stored and used only for verification purposes.
            </p>
          </div>

          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground py-5 px-6 text-base gap-2 min-w-[200px] mb-4"
            onClick={handleContinue}
          >
            Continue to Revenue Purchase Agreement
            <ArrowRight className="size-5" strokeWidth={3} />
          </Button>
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

export default EntityDetails;
