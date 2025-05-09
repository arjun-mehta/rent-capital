import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Upload, Info, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

type Owner = {
  name: string;
  percentage: string;
  idDocument: File | null;
};

const EntityDetails: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isPatreonConnected } = useAuth();
  
  const [entityType, setEntityType] = useState<string>("");
  const [ein, setEin] = useState<string>("");
  const [businessAddress, setBusinessAddress] = useState<string>("");
  const [owners, setOwners] = useState<Owner[]>([{ name: "", percentage: "", idDocument: null }]);
  const [articlesOfOrganization, setArticlesOfOrganization] = useState<File | null>(null);
  const [businessRegistration, setBusinessRegistration] = useState<File | null>(null);
  const [operatingAgreement, setOperatingAgreement] = useState<File | null>(null);
  const [taxReturn, setTaxReturn] = useState<File | null>(null);
  const [isIncomeConfirmed, setIsIncomeConfirmed] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [showValidationWarning, setShowValidationWarning] = useState<boolean>(false);

  // Current year for determining prior year tax return
  const currentYear = new Date().getFullYear();
  const priorYear = currentYear - 1;

  // Redirect if not authenticated or Patreon not connected
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else if (!isPatreonConnected) {
      navigate("/connect-patreon");
    }
  }, [isAuthenticated, isPatreonConnected, navigate]);

  // Validate form
  useEffect(() => {
    const validEntityType = !!entityType;
    const validEin = /^[0-9]{2}-[0-9]{7}$/.test(ein) || /^[0-9]{9}$/.test(ein);
    const validAddress = !!businessAddress;
    const validOwners = owners.length > 0 && owners.every(owner => 
      !!owner.name && 
      !!owner.percentage && 
      parseInt(owner.percentage) >= 25 && 
      parseInt(owner.percentage) <= 100 &&
      !!owner.idDocument
    );
    const validDocuments = !!articlesOfOrganization && !!businessRegistration && !!operatingAgreement;
    const validTaxReturn = !!taxReturn && isIncomeConfirmed;

    setIsFormValid(validEntityType && validEin && validAddress && validOwners && validDocuments && validTaxReturn && isAuthorized);
  }, [entityType, ein, businessAddress, owners, articlesOfOrganization, businessRegistration, operatingAgreement, taxReturn, isIncomeConfirmed, isAuthorized]);

  const handleAddOwner = () => {
    setOwners([...owners, { name: "", percentage: "", idDocument: null }]);
  };

  const handleRemoveOwner = (index: number) => {
    if (owners.length > 1) {
      const newOwners = [...owners];
      newOwners.splice(index, 1);
      setOwners(newOwners);
    }
  };

  const handleOwnerChange = (index: number, field: keyof Owner, value: string | File | null) => {
    const newOwners = [...owners];
    newOwners[index] = { ...newOwners[index], [field]: value };
    setOwners(newOwners);
  };

  const handleFileUpload = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleContinue = () => {
    if (!isFormValid && isAuthorized) {
      // If the form is not valid but the authorization is checked, show a warning
      setShowValidationWarning(true);
      // Submit anyway to keep things simple for the demo
      navigate("/sign-irs-form");
    } else {
      // Form is valid, proceed normally
      navigate("/sign-irs-form");
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return size + ' bytes';
    else if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    else return (size / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#FCF7F0]">
      <div className="flex-1 flex flex-col overflow-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="mb-2">
            <span className="text-xl font-poppins font-semibold tracking-tight">Creator Capital</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Business Information
          </h1>
          <p className="text-md text-gray-600 max-w-2xl mx-auto">
            Please provide your business details to proceed with your revenue purchase agreement.
            This information is required for compliance and verification purposes.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto p-6 mb-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Entity Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="entity-type">Entity Type</Label>
                  <Select value={entityType} onValueChange={setEntityType}>
                    <SelectTrigger id="entity-type">
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                      <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="s-corporation">S Corporation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ein">
                    EIN (Tax ID)
                    <span className="text-xs text-gray-500 ml-1">Format: XX-XXXXXXX or XXXXXXXXX</span>
                  </Label>
                  <Input 
                    id="ein" 
                    value={ein} 
                    onChange={(e) => setEin(e.target.value)}
                    placeholder="XX-XXXXXXX"
                  />
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor="business-address">Business Address</Label>
                <Textarea 
                  id="business-address" 
                  value={businessAddress} 
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  placeholder="Full business address"
                  rows={3}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Ownership Information</h3>
              <p className="text-sm text-gray-600 mb-4">
                List all individuals who own 25% or more of the business. At least one owner must be provided.
              </p>
              
              {owners.map((owner, index) => (
                <div key={index} className="border rounded-md p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Owner {index + 1}</h4>
                    {owners.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => handleRemoveOwner(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`owner-name-${index}`}>Full Name</Label>
                      <Input 
                        id={`owner-name-${index}`} 
                        value={owner.name} 
                        onChange={(e) => handleOwnerChange(index, "name", e.target.value)}
                        placeholder="Full legal name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`owner-percentage-${index}`}>Ownership Percentage</Label>
                      <div className="relative">
                        <Input 
                          id={`owner-percentage-${index}`} 
                          value={owner.percentage} 
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^[0-9]+$/.test(value)) {
                              handleOwnerChange(index, "percentage", value);
                            }
                          }}
                          placeholder="Percentage (must be ≥ 25%)"
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-2 text-gray-500">%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`owner-id-${index}`}>
                      Government ID
                      <span className="text-xs text-gray-500 ml-1">(Driver's license, passport, etc.)</span>
                    </Label>
                    <div className="border rounded-md p-3 bg-gray-50">
                      {!owner.idDocument ? (
                        <div className="flex items-center justify-center h-24">
                          <label className="cursor-pointer flex flex-col items-center">
                            <div className="flex flex-col items-center justify-center gap-1">
                              <Upload className="h-6 w-6 text-gray-400" />
                              <span className="text-sm text-gray-500">Upload ID document</span>
                              <span className="text-xs text-gray-400">PDF, JPG, or PNG (max 5MB)</span>
                            </div>
                            <input 
                              type="file" 
                              id={`owner-id-${index}`}
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleOwnerChange(index, "idDocument", e.target.files[0]);
                                }
                              }}
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-green-100 rounded-md">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium truncate max-w-[200px]">{owner.idDocument.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(owner.idDocument.size)}</p>
                            </div>
                          </div>
                          <button 
                            type="button"
                            onClick={() => handleOwnerChange(index, "idDocument", null)}
                            className="text-red-500 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={handleAddOwner}
                className="w-full mt-2"
              >
                Add Another Owner
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Business Documents</h3>
              <p className="text-sm text-gray-600 mb-4">
                Please upload the following required business documents.
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="articles">
                    Articles of Organization
                    <span className="text-xs text-gray-500 ml-1">(Required for LLC)</span>
                  </Label>
                  <div className="border rounded-md p-3 bg-gray-50">
                    {!articlesOfOrganization ? (
                      <div className="flex items-center justify-center h-24">
                        <label className="cursor-pointer flex flex-col items-center">
                          <div className="flex flex-col items-center justify-center gap-1">
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="text-sm text-gray-500">Upload Articles of Organization</span>
                            <span className="text-xs text-gray-400">PDF format (max 10MB)</span>
                          </div>
                          <input 
                            type="file" 
                            id="articles"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleFileUpload(setArticlesOfOrganization)}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-green-100 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium truncate max-w-[200px]">{articlesOfOrganization.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(articlesOfOrganization.size)}</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setArticlesOfOrganization(null)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="registration">Business Registration</Label>
                  <div className="border rounded-md p-3 bg-gray-50">
                    {!businessRegistration ? (
                      <div className="flex items-center justify-center h-24">
                        <label className="cursor-pointer flex flex-col items-center">
                          <div className="flex flex-col items-center justify-center gap-1">
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="text-sm text-gray-500">Upload Business Registration</span>
                            <span className="text-xs text-gray-400">PDF format (max 10MB)</span>
                          </div>
                          <input 
                            type="file" 
                            id="registration"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleFileUpload(setBusinessRegistration)}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-green-100 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium truncate max-w-[200px]">{businessRegistration.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(businessRegistration.size)}</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setBusinessRegistration(null)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="agreement">Operating Agreement</Label>
                  <div className="border rounded-md p-3 bg-gray-50">
                    {!operatingAgreement ? (
                      <div className="flex items-center justify-center h-24">
                        <label className="cursor-pointer flex flex-col items-center">
                          <div className="flex flex-col items-center justify-center gap-1">
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="text-sm text-gray-500">Upload Operating Agreement</span>
                            <span className="text-xs text-gray-400">PDF format (max 10MB)</span>
                          </div>
                          <input 
                            type="file" 
                            id="agreement"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleFileUpload(setOperatingAgreement)}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-green-100 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium truncate max-w-[200px]">{operatingAgreement.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(operatingAgreement.size)}</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setOperatingAgreement(null)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Total Business Income</h3>
              <p className="text-sm text-gray-600 mb-4">
                To finalize your funding, we'll need to confirm that your Patreon earnings make up less than 50% of your total business income last year.
                Please upload your {priorYear} tax return (Schedule C, 1120-S, or 1065). We only need the first 2 pages showing total gross income. You may redact other income details - just keep the total income line visible.
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tax-return">Tax Return</Label>
                  <div className="border rounded-md p-3 bg-gray-50">
                    {!taxReturn ? (
                      <div className="flex items-center justify-center h-24">
                        <label className="cursor-pointer flex flex-col items-center">
                          <div className="flex flex-col items-center justify-center gap-1">
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="text-sm text-gray-500">Upload {priorYear} Tax Return</span>
                            <span className="text-xs text-gray-400">PDF format (max 10MB)</span>
                          </div>
                          <input 
                            type="file" 
                            id="tax-return"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleFileUpload(setTaxReturn)}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-green-100 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium truncate max-w-[200px]">{taxReturn.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(taxReturn.size)}</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setTaxReturn(null)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-amber-600 text-sm mb-4">
            <Info className="h-4 w-4 mr-2" />
            <p>All uploaded information is securely stored and used only for verification purposes.</p>
          </div>
          
          <div className="flex items-start space-x-2 mb-4 max-w-xl text-left">
            <Checkbox 
              id="income-confirmation" 
              checked={isIncomeConfirmed}
              onCheckedChange={(checked) => setIsIncomeConfirmed(checked as boolean)}
              className="mt-1"
            />
            <Label 
              htmlFor="income-confirmation" 
              className="text-sm text-gray-700 font-normal cursor-pointer"
            >
              I confirm that this tax return reflects my full business income for {priorYear}, and that my Patreon earnings are less than 50% of that amount.
            </Label>
          </div>
          
          <div className="flex items-start space-x-2 mb-6 max-w-xl text-left">
            <Checkbox 
              id="authorization" 
              checked={isAuthorized}
              onCheckedChange={(checked) => setIsAuthorized(checked as boolean)}
              className="mt-1"
            />
            <Label 
              htmlFor="authorization" 
              className="text-sm text-gray-700 font-normal cursor-pointer"
            >
              I authorize Creator Capital to verify my business information and creditworthiness, including checking for existing funding obligations, liens, and federal tax compliance. This may include a soft business credit inquiry, which will not affect my personal credit.
            </Label>
          </div>
          
          {showValidationWarning && !isFormValid && (
            <div className="text-amber-600 text-sm mb-4 flex items-center gap-1 max-w-xl">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p>Not all information has been completed, but you can continue anyway for demonstration purposes.</p>
            </div>
          )}
          
          <Button
            className="bg-[#017354] hover:bg-[#017354]/90 text-white py-5 px-6 text-lg gap-2 min-w-[200px] mb-4"
            onClick={handleContinue}
            disabled={!isAuthorized} // Only require authorization to be checked
          >
            Continue to Sign IRS Form
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EntityDetails; 