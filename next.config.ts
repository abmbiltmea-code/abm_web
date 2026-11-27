import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dl.dropboxusercontent.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  serverExternalPackages: ["node-fetch", "fetch-blob", "dropbox"],
  async redirects() {
    // Legacy URLs → new locations. 301 (not Next's default 308) as requested for SEO.
    return [
      { source: "/palace-residence", destination: "/projects/palace-residence" },
      { source: "/jumeirah-living-business-bay", destination: "/projects/jumeirah-living-business-bay" },
      { source: "/regent-residences-dubai---sankari-place", destination: "/projects/regent-residences-dubai-sankari-place" },
      { source: "/address-the-bay", destination: "/projects/address-the-bay" },
      { source: "/the-peninsula-four-the-plaza", destination: "/projects/the-peninsula-four-the-plaza" },
      { source: "/division", destination: "/" },
    ].map((r) => ({ ...r, statusCode: 301 as const }));
  },
};

export default nextConfig;
