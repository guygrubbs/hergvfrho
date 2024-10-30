'use client'

// pages/how-it-works.js
import Head from 'next/head';
import Link from 'next/link';
import { 
  Upload, 
  FileText, 
  PieChart, 
  Users, 
  MessageSquare,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Submit Your Pitch",
      description: "Upload your pitch deck, financial data, and business information through our secure platform.",
      details: [
        "Simple and intuitive submission process",
        "Secure file handling up to 10MB",
        "Support for various file formats (PDF, PPT, Excel)",
      ]
    },
    {
      icon: FileText,
      title: "Receive Detailed Analysis",
      description: "Our team analyzes your submission and generates a comprehensive report with actionable insights.",
      details: [
        "Business model evaluation",
        "Market opportunity assessment",
        "Growth strategy recommendations",
        "Financial projections review"
      ]
    },
    {
      icon: MessageSquare,
      title: "Connect with Investors",
      description: "Get your pitch in front of the right investors and receive valuable feedback.",
      details: [
        "Direct connection with relevant VCs",
        "Structured feedback process",
        "Follow-up opportunities",
      ]
    }
  ];

  const benefits = [
    {
      icon: PieChart,
      title: "Data-Driven Insights",
      description: "Get detailed analytics and metrics about your startup's potential and market position."
    },
    {
      icon: Users,
      title: "Expert Review",
      description: "Receive feedback from experienced venture capitalists and industry experts."
    },
    {
      icon: CheckCircle2,
      title: "Streamlined Process",
      description: "Navigate the fundraising process efficiently with our structured approach."
    }
  ];

  return (
    <>
      <Head>
        <title>How It Works - VC Platform</title>
        <meta 
          name="description" 
          content="Learn how our platform connects startups with investors through a streamlined pitch submission and review process."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                How It Works
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Our platform streamlines the connection between innovative startups 
                and forward-thinking investors through a simple, three-step process.
              </p>
            </div>
          </div>
        </div>

        {/* Process Steps Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <step.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-secondary mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Why Choose Our Platform
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We provide comprehensive support throughout your fundraising journey
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Submit your pitch deck today and take the first step towards 
                connecting with potential investors.
              </p>
              <Link
                href="/submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-secondary bg-white hover:bg-gray-50 transition-colors"
              >
                Submit Your Pitch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}