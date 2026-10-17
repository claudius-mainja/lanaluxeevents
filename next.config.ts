import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 390, 480, 640, 768, 1024, 1280, 1440, 1920],
  },
  async redirects() {
    return [
      // Legacy route preservation -> new information architecture.
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/services", destination: "/services", permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
