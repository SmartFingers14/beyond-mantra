import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow the logo from /public (local) — no remote patterns needed
    unoptimized: false,
  },
  // Ensure video files in /public are served correctly
  async headers() {
    return [
      {
        source: "/:path*.webm",
        headers: [{ key: "Content-Type", value: "video/webm" }],
      },
      {
        source: "/:path*.mp4",
        headers: [{ key: "Content-Type", value: "video/mp4" }],
      },
    ];
  },
};

export default nextConfig;
