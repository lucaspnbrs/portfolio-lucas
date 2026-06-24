import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    optimizePackageImports: ["gsap", "three", "@react-three/fiber", "@react-three/drei"],
    viewTransition: true,
  },
};

export default nextConfig;
