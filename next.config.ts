import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                hostname: 'pandator-assets.s3.ap-northeast-3.amazonaws.com',
            },
        ],
    },
};

export default nextConfig;
