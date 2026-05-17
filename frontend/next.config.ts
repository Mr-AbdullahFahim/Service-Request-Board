import type { NextConfig } from "next";

const BACKEND_URL = 'http://localhost:5000/api';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.56.1'],
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
