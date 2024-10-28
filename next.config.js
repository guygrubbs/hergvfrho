/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.placeholder.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Environment variables that should be exposed to the browser
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_COMPANY_NAME: 'VC Platform',
    NEXT_PUBLIC_SUPPORT_EMAIL: 'support@vcplatform.com',
    GOOGLE_DRIVE_CLIENT_ID: process.env.GOOGLE_DRIVE_CLIENT_ID,
    GOOGLE_DRIVE_CLIENT_SECRET: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    GOOGLE_DRIVE_REDIRECT_URI: process.env.GOOGLE_DRIVE_REDIRECT_URI,
    GOOGLE_DRIVE_REFRESH_TOKEN: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    UPLOAD_FOLDER_ID: process.env.UPLOAD_FOLDER_ID,
    JWT_SECRET: process.env.JWT_SECRET
  },
  
  // Headers configuration for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; media-src 'self'; connect-src 'self' https://api.vcplatform.com; frame-src 'self'"
          }
        ]
      }
    ];
  },

  // Redirects configuration
  async redirects() {
    return [
      {
        source: '/pitch',
        destination: '/submit',
        permanent: true,
      },
      {
        source: '/apply',
        destination: '/submit',
        permanent: true,
      }
    ];
  },
  
  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    // PDF handling
    config.module.rules.push({
      test: /\.pdf$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      ]
    });

    // Optimization for production builds
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            }
          }
        }
      };
    }

    return config;
  },
  
  // Internationalization settings
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  
    experimental: {
    optimizeCss: {
      critters: {
        ssrMode: 'opt-in'
      }
    }
  },

  // Disable powered by header
  poweredByHeader: false,

  // Configure build output
  output: 'standalone',
};

module.exports = nextConfig;
