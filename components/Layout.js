import React from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation'; // Ensure correct import path
import Footer from '@/components/Footer'; // Ensure correct import path
import PropTypes from 'prop-types';

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children, title, description, noFooter = false }) {
  const pageTitle = title 
    ? `${title} | VC Platform` 
    : 'VC Platform - Connect Startups with Investors';
  const pageDescription = description || 
    'Submit your startup pitch deck and connect with leading venture capitalists. Get detailed feedback and funding opportunities.';

  return (
    <div className={`min-h-screen flex flex-col ${inter.className}`}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VC Platform" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* PWA theme color */}
        <meta name="theme-color" content="#003366" />
      </Head>

      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-primary"
      >
        Skip to main content
      </a>

      <Navigation />  {/* Correctly imported Navigation */}

      <main id="main-content" className="flex-grow">
        {children}
      </main>

      {!noFooter && <Footer />} {/* Correctly imported Footer */}

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 5000,
          classNames: {
            toast: 'group',
            title: 'font-heading font-semibold',
            description: 'text-gray-500',
            actionButton: 'bg-secondary text-white hover:bg-secondary-dark',
            cancelButton: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          }
        }}
      />

      <ScrollToTop />
    </div>
  );
}

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-8 p-3 rounded-full bg-secondary text-white shadow-lg
        hover:bg-secondary-dark transition-colors duration-200
        opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
      `}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  noFooter: PropTypes.bool,
};

export function getLayout(page) {
  return <Layout>{page}</Layout>;
}
