// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    localeDetection: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 480, 640, 768, 1024, 1200, 1600, 2048],
    imageSizes: [16,32,48,64,96,128,256,384],
  },

   webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.plugins = config.plugins.filter(
        p => p.constructor && p.constructor.name !== 'ReactRefreshWebpackPlugin'
      );
    }
    return config;
  },
};
