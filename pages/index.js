'use client'

// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, Award, Users, BarChart, Check } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';

export default function Home() {
  const stats = [
    { value: '500+', label: 'Startups Reviewed' },
    { value: '$50M+', label: 'Capital Raised' },
    { value: '100+', label: 'VC Partners' },
    { value: '90%', label: 'Success Rate' }
  ];

  const testimonials = [
    {
      quote: "The insights we received were invaluable for our seed round. Highly recommended!",
      author: "Sarah Chen",
      role: "CEO, TechStart",
      company: "Series A Funded"
    },
    {
      quote: "This platform streamlined our fundraising process and helped us connect with the right investors.",
      author: "Michael Roberts",
      role: "Founder",
      company: "$2M Seed Round"
    }
  ];

  const benefits = [
    "Comprehensive startup assessment",
    "Direct access to VC network",
    "Detailed feedback on pitch materials",
    "Growth strategy recommendations",
    "Market positioning analysis",
    "Investment readiness evaluation"
  ];

  return (
    <>
      <Head>
        <title>VC Platform - Submit Your Pitch Deck for Expert Review</title>
        <meta 
          name="description" 
          content="Get expert feedback on your pitch deck, connect with VCs, and accelerate your startup's growth with our comprehensive review platform."
        />
        <meta property="og:title" content="VC Platform - Expert Pitch Deck Review" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Features Section */}
        <Features />

        {/* Benefits Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Platform</h2>
              <p className="mt-4 text-lg text-gray-600">Everything you need to perfect your pitch and connect with investors</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Founders Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm">
                  <p className="text-gray-600 italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-gray-900 font-semibold">{testimonial.author}</p>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      <p className="text-secondary text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Take Your Startup to the Next Level?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Get expert feedback on your pitch deck and connect with leading investors.
              </p>
              <Link
                href="/submit"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
              >
                Submit Your Pitch Deck
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center text-gray-600">
                <Award className="h-5 w-5 mr-2" />
                <span>Top-rated platform</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>Trusted by 500+ founders</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BarChart className="h-5 w-5 mr-2" />
                <span>Data-driven insights</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}