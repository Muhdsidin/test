import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  experimental :{
    serverActions: {
      bodySizeLimit: '10mb', // or '5mb', '20mb', etc.
    }
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
