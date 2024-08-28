/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apps.dilivva.com.ng",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
