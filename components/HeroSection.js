'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  PlayCircle, 
  TrendingUp, 
  Users, 
  Briefcase, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();
  const [videoOpen, setVideoOpen] = React.useState(false);

  const stats = [
    { label: 'Startups Funded', value: '500+', icon: TrendingUp },
    { label: 'Active Investors', value: '200+', icon: Users },
    { label: 'Total Investments', value: '$250M+', icon: Briefcase }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.3,
        when: "beforeChildren" 
      } 
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren" 
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
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      transition: { 
        duration: 0.3 
      } 
    }
  };

  return (
    <AnimatePresence mode="wait">
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg ... %3C/svg%3E")`
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 items-center"
          >
            <div className="space-y-8">
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-secondary/10 text-secondary">
                  Now accepting applications for Q2 2024
                  <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900"
              >
                Connect Your Startup 
                <span className="text-secondary"> with Leading Investors</span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-600 max-w-2xl lg:max-w-none"
              >
                Submit your pitch deck, get personalized feedback, and connect with investors 
                who share your vision. Join hundreds of successful startups who found their 
                perfect investment match through our platform.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Button
                  size="lg"
                  className="text-lg"
                  onClick={() => router.push('/submit')}
                >
                  Submit Your Pitch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg"
                    >
                      <PlayCircle className="mr-2 h-5 w-5" />
                      How It Works
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-4xl">
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/your-video-id"
                        title="How It Works"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <stat.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="hidden lg:block">
              {/* Content with animation */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}