// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      'postcss-preset-env': {
        stage: 3,
        features: {
          'nesting-rules': false,
          'custom-properties': false,
        },
        autoprefixer: {
          flexbox: 'no-2009',
        },
      },
      'postcss-flexbugs-fixes': {},
      'postcss-custom-properties': {},
      '@fullhuman/postcss-purgecss': {
        content: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: ['html', 'body'],
          deep: [/^dark:/, /^light:/, /^hover:/, /^focus:/, /^active:/, /^disabled:/],
          greedy: [/^react-/, /^slick-/]
        }
      },
      'cssnano': {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
            normalizeWhitespace: false,
            colormin: true,
            reduceIdents: false,
            mergeIdents: false,
            mergeLonghand: true,
            minifyFontValues: true,
            minifyGradients: true,
            minifyParams: true,
            minifySelectors: true,
          },
        ],
      },
    } : {}),
  },
};