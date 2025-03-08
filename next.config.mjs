/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://instagram-clone-api.fly.dev/:path*',
        },
      ];
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', 
        },
      ],
    },
  };
  
  export default nextConfig;
  