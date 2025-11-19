import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh1.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh2.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com", // If you use Clerk
      },
      {
        protocol: "https",
        hostname: "great1.b-cdn.net", // your Bunny CDN hostname
      },
    ],
  },
};

export default nextConfig;
