import nextPWA from "next-pwa";

const PWA_VERSION = "2024.04.23.01";

const runtimeCaching = [
  // 0.1 API POST Requests (Background Sync)
  {
    urlPattern: /\/(?:api|workers)\/.*$/i,
    method: "POST",
    handler: "NetworkOnly",
    options: {
      backgroundSync: {
        name: `api-post-syncQueue-${PWA_VERSION}`,
        options: {
          maxRetentionTime: 24 * 60, // 24 hours
        },
      },
    },
  },
  // 0.2 API GET Requests (Network First)
  {
    urlPattern: /\/(?:api|workers)\/.*$/i,
    method: "GET",
    handler: "NetworkFirst",
    options: {
      cacheName: `kazilen-api-get-${PWA_VERSION}`,
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 24 * 60 * 60, 
      },
      networkTimeoutSeconds: 5, 
    },
  },
  // 1. Next.js Static Builds & JS/CSS Bundles (Stale-While-Revalidate)
  // Changed from CacheFirst to StaleWhileRevalidate to ensure bundles eventually update
  {
    urlPattern: /^https?.*\.(?:js|css)$/,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: `kazilen-static-assets-${PWA_VERSION}`,
      expiration: {
        maxEntries: 200,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      },
    },
  },

  // 2. Local & Remote Images
  {
    urlPattern: /^https?.*\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: `kazilen-images-${PWA_VERSION}`,
      expiration: {
        maxEntries: 80,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      },
    },
  },

  // 3. Fonts
  {
    urlPattern: /^https?.*\.(?:woff|woff2|ttf|eot)$/,
    handler: "CacheFirst",
    options: {
      cacheName: `kazilen-fonts-${PWA_VERSION}`,
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 Year
      },
    },
  },

  // 4. Third-Party APIs
  {
    urlPattern: /^https?:\/\/(?:api\.mapbox\.com|fonts\.googleapis\.com|fonts\.gstatic\.com).*/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: `kazilen-external-apis-${PWA_VERSION}`,
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 Week
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },

  // 5. Next.js Pages & Client-Side Navigations (Network First)
  // Changed from StaleWhileRevalidate to NetworkFirst to prevent stale auth/content
  {
    urlPattern: /^https?.*/,
    handler: "NetworkFirst",
    options: {
      cacheName: `kazilen-pages-${PWA_VERSION}`,
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 24 * 60 * 60, // 1 Day
      },
      networkTimeoutSeconds: 3, // Fallback to cache after 3 seconds
    },
  },
];

const withPWA = nextPWA({
  dest: "public",
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/app-build-manifest\.json$/],
  publicExcludes: ['!subcategories/**/*'],
  runtimeCaching,
  fallbacks: {
    document: "/offline.html",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8888",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://api.mapbox.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com; img-src 'self' blob: data: http://localhost:8888; font-src 'self' https://fonts.gstatic.com; connect-src 'self' http://127.0.0.1:8000 http://localhost:8000 ws://127.0.0.1:8000 ws://localhost:8000 https://api.mapbox.com https://events.mapbox.com; worker-src 'self' blob:;",
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);