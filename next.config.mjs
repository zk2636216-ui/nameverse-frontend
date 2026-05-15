const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || 'https://name-meaning-site-backend.vercel.app').replace(/\/+$/, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Allow all hosts for Replit proxy
  allowedDevOrigins: [
    'https://faea070e-8320-40f1-92b2-b79c20b8d2f6-00-6rm0csoemn1l.kirk.replit.dev',
    'http://faea070e-8320-40f1-92b2-b79c20b8d2f6-00-6rm0csoemn1l.kirk.replit.dev',
    '*.replit.dev',
    '*.repl.co',
    '*.kirk.replit.dev',
  ],

  // Performance Optimizations
  compress: true,

  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers for Performance & Edge Caching
  async headers() {
    return [
      // API routes should not be cached (dynamic data)
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate',
          },
        ],
      },
      // Main pages - NO Cache-Control here!
      // ISR manages caching via route-level revalidate exports
      // Setting a global Cache-Control would conflict with ISR's native caching behavior
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https: data:; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://analytics.ahrefs.com https://www.google-analytics.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' https://analytics.ahrefs.com https://name-meaning-site-backend.vercel.app https://ep1.adtrafficquality.google https://www.google-analytics.com https://www.googletagmanager.com; font-src 'self' data:; frame-ancestors 'self'; object-src 'none'; base-uri 'self';",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
        ],
      },
      // Next.js data - allow ISR caching with stale-while-revalidate
      // This enables Next.js to serve cached JSON data while revalidating in background
      {
        source: '/_next/data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, stale-while-revalidate=2592000',
          },
        ],
      },
      // Static assets - long-term caching
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Rewrites for image fallbacks only (API rewrites removed to enable proper caching)
  async rewrites() {
    return [
      {
        source: '/article/:path*',
        destination: '/logo.png',
      },
      {
        source: '/images/articles/:path*',
        destination: '/logo.png',
      },
      // NOTE: API rewrites removed - they were bypassing Next.js caching
      // All API calls now use native fetch() with next.revalidate for proper ISR
    ];
  },

  // Experimental Features for Performance
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-slot',
      '@heroicons/react',
      'framer-motion',
      'lodash'
    ],
  },

  // Turbopack configuration
  turbopack: {},

  // Webpack Optimizations
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;