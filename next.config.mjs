/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
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
  transpilePackages: [
    "@tiptap/react",
    "@tiptap/starter-kit",
    "@tiptap/extension-color",
    "@tiptap/extension-highlight",
    "@tiptap/extension-image",
    "@tiptap/extension-link",
    "@tiptap/extension-placeholder",
    "@tiptap/extension-text-align",
    "@tiptap/extension-text-style",
    "@tiptap/extension-underline",
  ],
  async redirects() {
    return [
      {
        source: '/services/:path*',
        destination: '/dich-vu/:path*',
        permanent: true,
      },
      {
        source: '/category/dich-vu/:path*',
        destination: '/dich-vu/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
