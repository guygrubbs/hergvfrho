// components/Footer.js
import React from 'react';
import Link from 'next/link';
import { 
  Twitter, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone,
  ArrowRight,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Submit Pitch', href: '/submit' },
      { name: 'For Investors', href: '/investors' },
      { name: 'Success Stories', href: '/success-stories' },
      { name: 'Pricing', href: '/pricing' },
    ],
    resources: [
      { name: 'Pitch Deck Templates', href: '/resources/templates' },
      { name: 'Investment Guides', href: '/resources/guides' },
      { name: 'Market Reports', href: '/resources/reports' },
      { name: 'Blog', href: '/blog' },
      { name: 'FAQs', href: '/faqs' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Press Kit', href: '/press' },
      { name: 'Partners', href: '/partners' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Security', href: '/security' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  };

  const socialLinks = [
    { 
      name: 'Twitter',
      href: 'https://twitter.com/vcplatform',
      icon: Twitter,
    },
    { 
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/vcplatform',
      icon: Linkedin,
    },
  ];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <img
                src="/logo-white.svg"
                alt="VC Platform"
                className="h-8 w-auto"
              />
              <span className="font-heading font-bold text-xl text-white">
                VC Platform
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Connecting innovative startups with forward-thinking investors. 
              Submit your pitch deck and take the first step towards funding your vision.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-secondary" />
                <span>123 Innovation Drive, Silicon Valley, CA 94025</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-secondary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-secondary" />
                <a href="mailto:contact@vcplatform.com" className="hover:text-white transition-colors">
                  contact@vcplatform.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h3 className="text-white font-semibold uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-white font-semibold text-lg mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Get the latest updates on venture capital trends and startup opportunities.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-secondary"
                required
              />
              <Button type="submit" variant="secondary">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} VC Platform. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={`Follow us on ${social.name}`}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Cookie Consent Banner */}
      <CookieConsentBanner />
    </footer>
  );
}

// Cookie Consent Banner Component
function CookieConsentBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  const acceptCookies = () => {
    // Add cookie acceptance logic here
    setIsVisible(false);
    localStorage.setItem('cookieConsent', 'accepted');
  };

  React.useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <p className="text-gray-300 text-sm">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          <Link href="/cookies" className="text-secondary hover:text-secondary-light ml-1">
            Learn more
          </Link>
        </p>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={() => setIsVisible(false)}
          >
            Decline
          </Button>
          <Button
            variant="secondary"
            onClick={acceptCookies}
          >
            Accept All Cookies
          </Button>
        </div>
      </div>
    </div>
  );
}