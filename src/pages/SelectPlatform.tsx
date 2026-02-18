import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePlaidLink } from "react-plaid-link";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "./homepage/navigation";
import { Title } from "@/components/Text";
import { Loader2, CheckCircle2, Upload, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectPlatform: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [isLoadingToken, setIsLoadingToken] = useState(true);
  const [isBankConnected, setIsBankConnected] = useState(false);
  const [isLeaseUploaded, setIsLeaseUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPlaidConfigured, setIsPlaidConfigured] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch Plaid link token from backend API
  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        setIsLoadingToken(true);
        
        // Call our backend API endpoint
        const response = await fetch('/api/plaid/create-link-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (parseError) {
            const text = await response.text().catch(() => 'Unknown error');
            throw new Error(`Server error (${response.status}): ${text || 'Failed to create link token'}`);
          }
          
          const errorMessage = errorData.error_message || errorData.error || 'Failed to create link token';
          console.error('Plaid API error:', {
            status: response.status,
            statusText: response.statusText,
            errorData
          });
          throw new Error(errorMessage);
        }

        const data = await response.json();
        
        if (!data.link_token) {
          throw new Error('Invalid response from server: missing link_token');
        }
        
        setLinkToken(data.link_token);
      } catch (error) {
        setIsPlaidConfigured(false);
        console.error('Error fetching link token:', error);
        
        // Show user-friendly error message
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'Failed to initialize bank connection. Please try again.';
        
        toast({
          title: "Bank Connection Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoadingToken(false);
      }
    };

    if (isAuthenticated) {
      fetchLinkToken();
    }
  }, [isAuthenticated, toast]);

  const onSuccess = useCallback(
    async (publicToken: string, metadata: any) => {
      try {
        // Exchange public token for access token via backend API
        const response = await fetch('/api/plaid/exchange-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            public_token: publicToken,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error_message || errorData.error || 'Failed to exchange token');
        }

        const data = await response.json();
        console.log('Access token obtained:', data.access_token);
        
        setIsBankConnected(true);
        
        toast({
          title: "Success!",
          description: `Your bank account (${metadata.institution?.name || 'bank'}) has been connected successfully.`,
        });
      } catch (error) {
        console.error('Error exchanging public token:', error);
        toast({
          title: "Error",
          description: error instanceof Error 
            ? error.message 
            : "Failed to complete bank connection. Please try again.",
          variant: "destructive",
        });
      }
    },
    [navigate, toast]
  );

  const onExit = useCallback((err: any, metadata: any) => {
    if (err) {
      console.error('Plaid Link error:', err);
      toast({
        title: "Connection Cancelled",
        description: err.display_message || "Bank connection was cancelled.",
      });
    }
  }, [toast]);

  const config = {
    token: linkToken,
    onSuccess,
    onExit,
  };

  const { open, ready } = usePlaidLink(config);

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
      
      setUploadedFileName(file.name);
      setIsLeaseUploaded(true);
      
      toast({
        title: "Success!",
        description: "Your lease agreement has been uploaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload lease agreement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFileName(null);
    setIsLeaseUploaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContinue = () => {
    if (isBankConnected && isLeaseUploaded) {
      navigate("/processing");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 flex justify-center px-8 md:px-12">
        <Link to="/" className="flex items-center">
          <Logo className="h-8" />
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <Title>We just need two things</Title>
            <p className="text-md text-balance text-muted-foreground mt-4">
              Connect your bank account and upload your lease agreement to see your offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Bank Account Connection Step */}
            <Card className={cn("p-6 transition-all", isBankConnected && "border-primary border-2")}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 relative">
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto transition-colors",
                    isBankConnected 
                      ? "bg-primary/20" 
                      : "bg-primary/10"
                  )}>
                    {isBankConnected ? (
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    ) : (
                      <svg
                        className="w-7 h-7 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-emilio text-foreground mb-2">
                  Connect Bank Account
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Securely connect your bank account through Plaid.
                </p>
                {isBankConnected ? (
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-center text-primary text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Connected
                    </div>
                    <Button
                      onClick={() => open()}
                      variant="outline"
                      className="w-full h-11 text-base font-medium"
                    >
                      Reconnect
                    </Button>
                  </div>
                ) : (
                  <div className="w-full">
                    <Button
                      onClick={() => open()}
                      disabled={!ready || isLoadingToken || !isPlaidConfigured}
                      className="w-full h-11 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
                    >
                      {isLoadingToken ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Connect Bank Account"
                      )}
                    </Button>
                    {!isPlaidConfigured && (
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Bank connection is not available. Please configure Plaid credentials.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Card>

            {/* Lease Agreement Upload Step */}
            <Card className={cn("p-6 transition-all", isLeaseUploaded && "border-primary border-2")}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto transition-colors",
                    isLeaseUploaded 
                      ? "bg-primary/20" 
                      : "bg-primary/10"
                  )}>
                    {isLeaseUploaded ? (
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    ) : (
                      <FileText className="w-7 h-7 text-primary" />
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-emilio text-foreground mb-2">
                  Upload Lease Agreement
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your signed lease agreement (PDF, Word, or image).
                </p>
                {isLeaseUploaded ? (
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-center text-primary text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Uploaded
                    </div>
                    <div className="text-xs text-muted-foreground truncate w-full px-2 py-1 bg-muted/50 rounded-md">
                      {uploadedFileName}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="flex-1 h-11 text-base font-medium"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Replace
                      </Button>
                      <Button
                        onClick={handleRemoveFile}
                        variant="outline"
                        className="h-11 px-4 text-base font-medium"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full h-11 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "Upload Lease Agreement"
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Continue Button */}
          <div className="mt-8">
            <Button
              onClick={handleContinue}
              disabled={!isBankConnected || !isLeaseUploaded}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
              size="lg"
            >
              See Advance Offers
            </Button>
            {(!isBankConnected || !isLeaseUploaded) && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Please complete both steps to continue
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Rent Capital. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SelectPlatform;
