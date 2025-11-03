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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch Plaid link token
  // WARNING: This is for DEMO purposes only. In production, link tokens MUST be created on the backend.
  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        setIsLoadingToken(true);
        
        const clientId = import.meta.env.VITE_PLAID_CLIENT_ID;
        const secret = import.meta.env.VITE_PLAID_SECRET_KEY;
        const env = import.meta.env.VITE_PLAID_ENV || 'sandbox';
        
        if (!clientId || !secret) {
          throw new Error('Plaid credentials not configured');
        }

        // Create link token using CORS proxy for demo (DEMO ONLY - not secure for production)
        const plaidUrl = env === 'production' 
          ? 'https://production.plaid.com' 
          : 'https://sandbox.plaid.com';
        
        // Using a CORS proxy for demo purposes only
        // In production, this MUST be done on your backend server
        const corsProxy = 'https://corsproxy.io/?';
        const targetUrl = `${plaidUrl}/link/token/create`;
        
        const response = await fetch(`${corsProxy}${encodeURIComponent(targetUrl)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: clientId,
            secret: secret,
            client_name: 'Rent Capital',
            products: ['auth', 'transactions'],
            country_codes: ['US'],
            language: 'en',
            user: {
              client_user_id: `user_${Date.now()}`, // Temporary user ID for demo
            },
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error_message || 'Failed to create link token');
        }

        const data = await response.json();
        setLinkToken(data.link_token);
      } catch (error) {
        console.error('Error fetching link token:', error);
        toast({
          title: "Error",
          description: error instanceof Error 
            ? error.message 
            : "Failed to initialize bank connection. Please try again.",
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
        // WARNING: For demo only - in production, token exchange MUST happen on backend
        const clientId = import.meta.env.VITE_PLAID_CLIENT_ID;
        const secret = import.meta.env.VITE_PLAID_SECRET_KEY;
        const env = import.meta.env.VITE_PLAID_ENV || 'sandbox';
        
        if (!clientId || !secret) {
          throw new Error('Plaid credentials not configured');
        }

        const plaidUrl = env === 'production' 
          ? 'https://production.plaid.com' 
          : 'https://sandbox.plaid.com';

        // Exchange public token for access token using CORS proxy (DEMO ONLY)
        const corsProxy = 'https://corsproxy.io/?';
        const targetUrl = `${plaidUrl}/item/public_token/exchange`;
        
        const response = await fetch(`${corsProxy}${encodeURIComponent(targetUrl)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: clientId,
            secret: secret,
            public_token: publicToken,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error_message || 'Failed to exchange token');
        }

        const data = await response.json();
        console.log('Access token obtained (demo only):', data.access_token);
        
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
      navigate("/offers");
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
            <p className="text-md text-balance text-gray-600 mt-4">
              Connect your bank account and upload your lease agreement to see your offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Bank Account Connection Step */}
            <Card className={cn("p-6 transition-all", isBankConnected && "border-green-500 border-2")}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 relative">
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto transition-colors",
                    isBankConnected 
                      ? "bg-green-100" 
                      : "bg-gradient-to-br from-blue-500 to-purple-600"
                  )}>
                    {isBankConnected ? (
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    ) : (
                      <svg
                        className="w-7 h-7 text-white"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Connect Bank Account
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Securely connect your bank account through Plaid.
                </p>
                {isBankConnected ? (
                  <div className="w-full">
                    <div className="flex items-center justify-center text-green-600 text-sm mb-2">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Connected
                    </div>
                    <Button
                      onClick={() => open()}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      Reconnect
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => open()}
                    disabled={!ready || isLoadingToken}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                  >
                    {isLoadingToken ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Connect Bank Account"
                    )}
                  </Button>
                )}
              </div>
            </Card>

            {/* Lease Agreement Upload Step */}
            <Card className={cn("p-6 transition-all", isLeaseUploaded && "border-green-500 border-2")}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto transition-colors",
                    isLeaseUploaded 
                      ? "bg-green-100" 
                      : "bg-gradient-to-br from-blue-500 to-purple-600"
                  )}>
                    {isLeaseUploaded ? (
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    ) : (
                      <FileText className="w-7 h-7 text-white" />
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Upload Lease Agreement
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload your signed lease agreement (PDF, Word, or image).
                </p>
                {isLeaseUploaded ? (
                  <div className="w-full">
                    <div className="flex items-center justify-center text-green-600 text-sm mb-2">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Uploaded
                    </div>
                    <div className="text-xs text-gray-600 mb-3 truncate w-full px-2">
                      {uploadedFileName}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="flex-1"
                        size="sm"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Replace
                      </Button>
                      <Button
                        onClick={handleRemoveFile}
                        variant="outline"
                        size="sm"
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
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="lg"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Lease Agreement
                        </>
                      )}
                    </Button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-3">
                  Max file size: 10MB
                </p>
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
              <p className="text-xs text-gray-500 text-center mt-2">
                Please complete both steps to continue
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="py-4 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Creator Capital. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SelectPlatform;
