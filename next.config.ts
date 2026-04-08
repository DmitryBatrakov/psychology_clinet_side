import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pub-2f6cea07e8de44c5a4fe8de80370629d.r2.dev",
            },
        ],
    },
};

export default nextConfig;
