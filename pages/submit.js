// pages/submit.js
import { useState } from 'react';
import Head from 'next/head';
import { 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Upload, 
  FileText,
  Trash2
} from 'lucide-react';
import PitchDeckForm from '../components/PitchDeckForm';

export default function Submit() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    website: '',
    industry: '',
    businessStage: '',
    founded: '',
    location: '',
    
    // Team Information
    founderNames: '',
    teamSize: '',
    keyHires: '',
    
    // Business Information
    problem: '',
    solution: '',
    targetMarket: '',
    businessModel: '',
    competition: '',
    traction: '',
    
    // Financial Information
    currentRevenue: '',
    burnRate: '',
    runwayMonths: '',
    fundingNeeded: '',
    useOfFunds: '',
    
    // Additional Information
    comments: '',
    referralSource: '',
  });

  const [files, setFiles] = useState({
    pitchDeck: null,
    financials: null,
    additionalDocs: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const guidelines = [
    {
      title: "Pitch Deck Requirements",
      items: [
        "10-15 slides maximum",
        "PDF format under 10MB",
        "Must include problem, solution, market size, business model",
        "Team bios with relevant experience",
        "Clear financial projections and metrics"
      ]
    },
    {
      title: "Financial Document Guidelines",
      items: [
        "Last 12 months of financials if available",
        "3-year projections",
        "Current cap table",
        "Key metrics dashboard"
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    
    if (type === 'additionalDocs') {
      setFiles(prev => ({
        ...prev,
        additionalDocs: [...prev.additionalDocs, file]
      }));
    } else {
      setFiles(prev => ({
        ...prev,
        [type]: file
      }));
    }
  };

  const removeFile = (type, index) => {
    if (type === 'additionalDocs') {
      setFiles(prev => ({
        ...prev,
        additionalDocs: prev.additionalDocs.filter((_, i) => i !== index)
      }));
    } else {
      setFiles(prev => ({
        ...prev,
        [type]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Here you would implement your actual form submission logic
      // For example, using FormData to handle file uploads
      const formDataToSubmit = new FormData();
      
      // Append form data
      Object.keys(formData).forEach(key => {
        formDataToSubmit.append(key, formData[key]);
      });
      
      // Append files
      if (files.pitchDeck) {
        formDataToSubmit.append('pitchDeck', files.pitchDeck);
      }
      if (files.financials) {
        formDataToSubmit.append('financials', files.financials);
      }
      files.additionalDocs.forEach((file, index) => {
        formDataToSubmit.append(`additionalDoc${index}`, file);
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      // You might want to redirect to a success page or show a success message
    } catch (error) {
      setSubmitError('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  id="website"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                  Industry *
                </label>
                <input
                  type="text"
                  name="industry"
                  id="industry"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
                  value={formData.industry}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="businessStage" className="block text-sm font-medium text-gray-700">
                  Business Stage *
                </label>
                <select
                  name="businessStage"
                  id="businessStage"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
                  value={formData.businessStage}
                  onChange={handleInputChange}
                >
                  <option value="">Select stage</option>
                  <option value="idea">Idea Stage</option>
                  <option value="mvp">MVP</option>
                  <option value="early">Early Traction</option>
                  <option value="growth">Growth</option>
                  <option value="scale">Scale</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Upload Documents</h3>
            
            {/* Pitch Deck Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Pitch Deck (Required)
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-grow">
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-secondary transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="pitchDeck" className="relative cursor-pointer rounded-md font-medium text-secondary hover:text-secondary-dark">
                          <span>Upload a file</span>
                          <input
                            id="pitchDeck"
                            name="pitchDeck"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.ppt,.pptx"
                            onChange={(e) => handleFileChange(e, 'pitchDeck')}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PDF or PPT up to 10MB</p>
                    </div>
                  </div>
                </div>
                {files.pitchDeck && (
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{files.pitchDeck.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile('pitchDeck')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Financials Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Financial Documents (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-grow">
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-secondary transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="financials" className="relative cursor-pointer rounded-md font-medium text-secondary hover:text-secondary-dark">
                          <span>Upload files</span>
                          <input
                            id="financials"
                            name="financials"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.xlsx,.xls,.csv"
                            onChange={(e) => handleFileChange(e, 'financials')}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PDF, Excel, or CSV up to 10MB</p>
                    </div>
                  </div>
                </div>
                {files.financials && (
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{files.financials.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile('financials')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Business Information</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="problem" className="block text-sm font-medium text-gray-700">
                  Problem Statement *
                </label>
                <textarea
                  name="problem"
                  id="problem"
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
                  value={formData.problem}
                  onChange={handleInputChange}
                  placeholder="What problem are you solving?"
                />
              </div>

              <div>
                <label htmlFor="solution" className="block text-sm font-medium text-gray-700">
                  Solution *
                </label>
                <textarea
                  name="solution"
                  id="solution"
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
                  value={formData.solution}
                  onChange={handleInputChange}
                  placeholder="How does your product/service solve this problem?"
                />
              </div>

              <div>
                <label htmlFor="traction" className="block text-sm font-medium text-gray-700">
                  Traction & Metrics
                </label>
                <textarea
                  name="traction"
                  id="traction"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
                  value={formData.traction}
                  onChange={handleInputChange}
                  placeholder="Current users, revenue, growth rate, etc."
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Submit Your Pitch - VC Platform</title>
        <meta 
          name="description" 
          content="Submit your startup's pitch deck for expert review and connect with potential investors."
        />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNumber
                        ? 'bg-secondary text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <div className="text-xs mt-2 text-gray-600">
                    {stepNumber === 1 ? 'Company' : stepNumber === 2 ? 'Documents' : 'Business'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
					className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-dark transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-secondary text-white px-6 py-2 rounded-md transition-colors ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary-dark'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Pitch'}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Guidelines Section */}
          <div className="mt-8 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <HelpCircle className="h-5 w-5 text-secondary" />
                <h3 className="text-lg font-medium">Submission Guidelines</h3>
              </div>
              
              {guidelines.map((section, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{section.title}</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Success/Error Messages */}
          {submitSuccess && (
            <div className="mt-6">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Submission Successful
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        Thank you for submitting your pitch deck. Our team will review your
                        submission and get back to you within 2-3 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {submitError && (
            <div className="mt-6">
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Submission Error
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{submitError}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}