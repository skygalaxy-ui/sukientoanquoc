import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getBranding } from "@/lib/branding";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, COMPANY_PHONE_DISPLAY, SEO_KEYWORDS, SCHEMA_ORG_DATA } from "@/lib/constants";
import GoogleAnalytics, { GoogleSearchConsoleVerification } from "@/components/GoogleAnalytics";

export async function generateMetadata(): Promise<Metadata> {
  const branding = await getBranding();
  const faviconUrl = branding.faviconUrl || "/favicon.png";
  const logoUrl = branding.logoUrl || "/logo.png";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — Tổ chức Teambuilding & Event chuyên nghiệp hàng đầu Việt Nam`,
      template: `%s | ${SITE_NAME}`,
    },
    description: `${SITE_NAME} - ${SITE_DESCRIPTION} Hotline: ${COMPANY_PHONE_DISPLAY}.`,
    keywords: SEO_KEYWORDS,
    openGraph: {
      title: `${SITE_NAME} — Gắn kết đội nhóm, bùng nổ năng lượng`,
      description: "Đơn vị tổ chức teambuilding & event chuyên nghiệp hàng đầu Việt Nam. 500+ sự kiện thành công trên 63 tỉnh thành.",
      url: SITE_URL,
      siteName: SITE_NAME,
      type: "website",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — Teambuilding & Event chuyên nghiệp`,
      description: "Tổ chức teambuilding, company trip, year end party chuyên nghiệp. 500+ sự kiện thành công.",
    },
    alternates: {
      canonical: SITE_URL,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: faviconUrl, type: "image/png", sizes: "32x32" },
        { url: faviconUrl, type: "image/png", sizes: "192x192" },
      ],
      shortcut: faviconUrl,
      apple: logoUrl,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <GoogleSearchConsoleVerification />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SCHEMA_ORG_DATA),
          }}
        />
        {children}
      </body>
    </html>
  );
}
