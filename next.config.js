/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  connect-src 'self' api.coingecko.com vitals.vercel-insights.com;
  default-src 'self' api.coingecko.com;
  script-src 'self' 'unsafe-eval' api.coingecko.com;
  child-src 'self' api.coingecko.com;
  style-src 'self' 'unsafe-inline';
  font-src 'self' fonts.gstatic.com;
`;
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "Access-Control-Allow-Origin",
    value: "no-cors",
  },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
      },
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
      },
    ],
  },
};

module.exports = {
  ...nextConfig,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};
