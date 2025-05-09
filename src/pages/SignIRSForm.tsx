import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, FileCheck, ExternalLink, Upload, FileX, Check } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

const SignIRSForm: React.FC = () => {
  const [date, setDate] = useState("");
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated, isPatreonConnected, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Using the locally stored PDF
  const IRS_FORM_URL = "/forms/f4506t.pdf";
  // Backup URL in case local file doesn't load
  const IRS_WEBSITE_URL = "https://www.irs.gov/pub/irs-pdf/f4506t.pdf";

  // Set current date as default
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    setDate(formattedDate);
  }, []);

  // Redirect if not authenticated or Patreon not connected
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else if (!isPatreonConnected) {
      navigate("/connect-patreon");
    }
  }, [isAuthenticated, isPatreonConnected, navigate]);

  const handleDownload = () => {
    // Create a download link for the local PDF
    const link = document.createElement('a');
    link.href = IRS_FORM_URL;
    link.download = "IRS_Form_4506T.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "The IRS Form 4506-T is being downloaded as a PDF.",
    });
  };

  const openInNewTab = () => {
    window.open(IRS_WEBSITE_URL, '_blank');
  };

  const handleContinue = () => {
    navigate("/business-verification");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    
    const file = event.target.files[0];
    
    // Validate file type and size
    if (!file.type.includes('pdf')) {
      setUploadError("Only PDF files are accepted.");
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setUploadError("File size must be less than 10MB.");
      return;
    }
    
    setUploadedFile(file);
    
    // Show success message
    toast({
      title: "File uploaded successfully",
      description: "Your signed IRS Form 4506-T has been uploaded.",
    });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return size + ' bytes';
    else if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    else return (size / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF7F0]">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-6">
          <div className="mb-2">
            <span className="text-xl font-poppins font-semibold tracking-tight">Creator Capital</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Sign IRS Form 4506-T
          </h1>
          <p className="text-md text-gray-600 max-w-3xl mx-auto whitespace-nowrap">
            We need your authorization to verify your income. Please review the IRS Form 4506-T below.
          </p>
        </div>

        <div ref={formRef} className="bg-white p-6 rounded-lg border mb-8">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center">
              <FileCheck className="h-6 w-6 text-[#017354] mr-2" />
              <h2 className="text-xl font-semibold">IRS Form 4506-T</h2>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={openInNewTab}
              >
                <ExternalLink size={16} /> View on IRS Website
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleDownload}
              >
                <Download size={16} /> Download PDF
              </Button>
              <Button 
                className="bg-[#017354] hover:bg-[#017354]/90 text-white flex items-center gap-2"
                onClick={triggerFileInput}
              >
                <Upload size={16} /> Upload Signed Form
              </Button>
            </div>
          </div>
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf"
          />
          
          {uploadedFile && (
            <div className="mb-4">
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <div className="flex items-start justify-between">
                  <div className="flex">
                    <div className="p-2 bg-green-100 rounded-md mr-3">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Signed form uploaded</p>
                      <p className="text-sm text-green-700">{uploadedFile.name} ({formatFileSize(uploadedFile.size)})</p>
                    </div>
                  </div>
                  <button 
                    onClick={removeUploadedFile}
                    className="text-gray-500 hover:text-red-500"
                    aria-label="Remove file"
                  >
                    <FileX className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {uploadError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600">
              {uploadError}
            </div>
          )}
          
          <div className="border rounded-lg mb-6 bg-gray-50 min-h-[600px] flex flex-col">
            <div 
              ref={pdfContainerRef}
              className="relative w-full h-[600px] overflow-auto"
            >
              <object
                data={IRS_FORM_URL}
                type="application/pdf"
                className="w-full h-full"
                onLoad={() => setPdfLoaded(true)}
                onError={() => setPdfError(true)}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 p-4">
                  <div className="text-center max-w-md">
                    <div className="text-amber-600 text-4xl mb-4">⚠️</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to display the PDF</h3>
                    <p className="text-gray-600 mb-4">
                      Your browser may not support embedded PDFs. You can download the form or view it on the IRS website.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button onClick={handleDownload} className="flex items-center gap-2">
                        <Download size={16} /> Download PDF
                      </Button>
                      <Button onClick={openInNewTab} className="flex items-center gap-2">
                        <ExternalLink size={16} /> View on IRS Website
                      </Button>
                    </div>
                  </div>
                </div>
              </object>
              
              {!pdfLoaded && !pdfError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#017354] mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading IRS Form 4506-T...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-4 text-center max-w-xl">
              By continuing, you acknowledge that you have reviewed the IRS Form 4506-T and authorize Creator Capital to use it for income verification.
            </p>
            
            <Button
              onClick={handleContinue}
              className="bg-[#017354] hover:bg-[#017354]/90 text-white py-5 px-6 text-lg gap-2 min-w-[300px]"
            >
              Continue to Business Verification
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIRSForm; 