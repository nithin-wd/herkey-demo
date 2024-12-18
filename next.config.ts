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
  
    ];
  },
};

export default nextConfig;
