'use client'

// components/Features.js
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  LineChart,
  Target,
  Users,
  Shield,
  Zap,
  MessageSquare,
  FileText,
  Trophy,
  BarChart4,
  PieChart,
  Clock,
  Globe,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function Features() {
  const featureCategories = [
    {
      id: 'startups',
      label: 'For Startups',
      features: [
        {
          icon: LineChart,
          title: 'Pitch Analytics',
          description: 'Get detailed feedback on your pitch deck with AI-powered analysis and expert insights.',
          highlights: [
            'Slide-by-slide analysis',
            'Industry benchmarking',
            'Investment readiness score',
            'Automated recommendations'
          ]
        },
        {
          icon: Target,
          title: 'Investor Matching',
          description: 'Connect with investors who are actively looking for opportunities in your industry and stage.',
          highlights: [
            'Smart matching algorithm',
            'Investor preferences tracking',
            'Direct introductions',
            'Follow-up management'
          ]
        },
        {
          icon: Shield,
          title: 'Secure Data Room',
          description: 'Share confidential documents securely with potential investors and track engagement.',
          highlights: [
            'Bank-level encryption',
            'Access controls',
            'Activity monitoring',
            'Document expiration'
          ]
        }
      ]
    },
    {
      id: 'investors',
      label: 'For Investors',
      features: [
        {
          icon: BarChart4,
          title: 'Deal Flow Management',
          description: 'Streamline your deal flow with powerful filtering and organization tools.',
          highlights: [
            'Custom deal pipelines',
            'Advanced filtering',
            'Team collaboration',
            'Performance tracking'
          ]
        },
        {
          icon: PieChart,
          title: 'Portfolio Analytics',
          description: 'Track and analyze your portfolio companies with real-time updates and insights.',
          highlights: [
            'Performance metrics',
            'Growth tracking',
            'Comparative analysis',
            'Custom reporting'
          ]
        },
        {
          icon: Globe,
          title: 'Market Intelligence',
          description: 'Stay informed with industry trends, market data, and competitor analysis.',
          highlights: [
            'Industry reports',
            'Market trends',
            'Competitor tracking',
            'Investment insights'
          ]
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
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
            Platform Features
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl"
          >
            Everything You Need to Succeed
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Powerful tools and features designed to streamline the fundraising process
            and maximize your chances of success.
          </motion.p>
        </motion.div>

        {/* Features Tabs */}
        <Tabs defaultValue="startups" className="space-y-8">
          <div className="flex justify-center">
            <TabsList>
              {featureCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-lg px-6 py-3"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {featureCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {category.features.map((feature, index) => {
                  const [ref, inView] = useInView({
                    threshold: 0.1,
                    triggerOnce: true
                  });

                  return (
                    <motion.div
                      key={index}
                      ref={ref}
                      variants={itemVariants}
                      className={`transform transition-all duration-500 ${
                        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-lg bg-secondary/10">
                              <feature.icon className="h-6 w-6 text-secondary" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {feature.title}
                            </h3>
                          </div>
                          
                          <p className="text-gray-600">
                            {feature.description}
                          </p>

                          <ul className="space-y-3">
                            {feature.highlights.map((highlight, highlightIndex) => (
                              <li
                                key={highlightIndex}
                                className="flex items-start space-x-3"
                              >
                                <div className="flex-shrink-0 mt-1">
                                  <svg
                                    className="h-5 w-5 text-secondary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                                <span className="text-gray-600">
                                  {highlight}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            {
              icon: Trophy,
              value: '95%',
              label: 'Success Rate',
              description: 'of startups receive investor interest'
            },
            {
              icon: Clock,
              value: '48h',
              label: 'Average Response',
              description: 'time for initial feedback'
            },
            {
              icon: Users,
              value: '500+',
              label: 'Active Investors',
              description: 'looking for opportunities'
            },
            {
              icon: LineChart,
              value: '$250M+',
              label: 'Total Funding',
              description: 'raised through our platform'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-lg bg-secondary/10 mb-4">
                <stat.icon className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-lg font-medium text-gray-900 mb-2">
                {stat.label}
              </div>
              <div className="text-gray-600">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}