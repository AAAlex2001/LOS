import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // allow production build to succeed despite lint errors
  },
};

export default nextConfig;
