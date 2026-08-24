/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Cloudinary is optional. If you add a cloud name in .env.local,
    // remote images from your Cloudinary account will be optimized by
    // next/image. The site works perfectly with zero Cloudinary config.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
