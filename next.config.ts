import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
