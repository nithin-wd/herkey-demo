import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sessions",
        permanent: false,
      },
      {
        source: "/sessions/:sessionId/join",
        destination: "/sessions/:sessionId/join2",
        permanent: false,
      },
  
    ];
  },
};

export default nextConfig;
