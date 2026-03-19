/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "njchsjhdkcfaouqwyutc.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      // Old indexed URLs → redirect to current pages
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/blog", destination: "/tin-tuc", permanent: true },
      { source: "/to-chuc-chay-roadshow", destination: "/dich-vu/khai-truong", permanent: true },
      { source: "/to-chuc-tiec-tat-nien", destination: "/dich-vu/year-end-party", permanent: true },
      { source: "/to-chuc-le-ra-mat-san-pham", destination: "/dich-vu/khai-truong", permanent: true },
    ];
  },
};

export default nextConfig;
