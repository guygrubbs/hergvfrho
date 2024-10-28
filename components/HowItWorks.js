// components/HowItWorks.js
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  LineChart, 
  Users, 
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Rocket,
  Target,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useInView } from 'react-intersection-observer';

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Submit Your Pitch",
      description: "Upload your pitch deck and key business metrics through our secure platform.",
      timeline: "Day 1",
      details: [
        "Simple submission process",
        "Secure file handling",
        "Automated initial screening",
        "Immediate confirmation"
      ],
      color: "bg-blue-500",
    },
    {
      icon: FileText,
      title: "Expert Review",
      description: "Our team of venture capital experts analyzes your submission in detail.",
      timeline: "Days 2-3",
      details: [
        "Business model evaluation",
        "Market analysis",
        "Financial assessment",
        "Growth potential review"
      ],
      color: "bg-purple-500",
    },
    {
      icon: LineChart,
      title: "Detailed Report",
      description: "Receive comprehensive feedback and suggestions for improvement.",
      timeline: "Day 4",
      details: [
        "Detailed insights",
        "Actionable recommendations",
        "Competitive analysis",
        "Investment readiness score"
      ],
      color: "bg-green-500",
    },
    {
      icon: Users,
      title: "Investor Matching",
      description: "Get connected with investors who align with your industry and stage.",
      timeline: "Days 5-10",
      details: [
        "Targeted introductions",
        "Investor preference matching",
        "Meeting coordination",
        "Follow-up support"
      ],
      color: "bg-orange-500",
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Targeted Matching",
      description: "Connect with investors who specifically invest in your industry and stage.",
    },
    {
      icon: Zap,
      title: "Quick Turnaround",
      description: "Get comprehensive feedback and investor introductions within days, not months.",
    },
    {
      icon: Rocket,
      title: "Growth Support",
      description: "Access resources and guidance to help accelerate your startup's growth.",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="text-secondary font-semibold text-sm tracking-wider uppercase"
          >
            Simple Process
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl"
          >
            How It Works
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Our streamlined process helps connect great startups with the right investors 
            in just a few steps.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

          {/* Steps */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {steps.map((step, index) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.1
              });

              return (
                <motion.div
                  key={step.title}
                  ref={ref}
                  variants={itemVariants}
                  className={`relative ${index % 2 === 0 ? 'lg:text-right' : ''}`}
                >
                  <Card className={`
                    lg:w-1/2 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'}
                    transform transition-all duration-300
                    ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                  `}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${step.color} bg-opacity-10`}>
                          <step.icon className={`h-6 w-6 ${step.color} text-opacity-100`} />
                        </div>
                        <span className="text-sm font-medium text-gray-500">
                          {step.timeline}
                        </span>
                      </div>
                      <CardTitle className="text-2xl font-bold">{step.title}</CardTitle>
                      <CardDescription className="text-gray-600 text-lg">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-gray-600">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mt-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900">
              Why Choose Our Platform
            </h3>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              We've optimized every step of the fundraising process to help you succeed.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center p-3 rounded-lg bg-secondary/10 mb-4">
                  <benefit.icon className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-24 text-center"
        >
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of successful startups who found their perfect investment match 
              through our platform.
            </p>
            <Button size="lg" className="text-lg">
              Submit Your Pitch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}