import type { NextConfig } from "next";

const BACKEND_URL = 'https://localhost:5000/api';

const nextConfig: NextConfig = {
  env: {
    BACKEND_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
