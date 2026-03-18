import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

import { getSiteSettings } from "@/lib/supabase";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const favicon = settings.favicon_url || "/favicon.ico";
  const siteName = settings.site_name || "Sự Kiện Toàn Quốc";

  return {
    metadataBase: new URL("https://sukientoanquoc.com"),
    title: {
      default: `${siteName} — Tổ chức Teambuilding & Event chuyên nghiệp hàng đầu Việt Nam`,
      template: `%s | ${siteName}`,
    },
    description:
      "Sự Kiện Toàn Quốc - Đơn vị tổ chức teambuilding, company trip, year end party, workshop chuyên nghiệp phủ sóng 63 tỉnh thành. 500+ sự kiện thành công. Hotline: 0857 999 545.",
    keywords: [
      "tổ chức sự kiện",
      "sự kiện toàn quốc",
      "teambuilding",
      "company trip",
      "year end party",
      "workshop",
      "tổ chức sự kiện doanh nghiệp",
      "event",
      "hội nghị",
      "festival",
      "gala dinner",
      "khai trương",
      "sports day",
      "family day",
      "tổ chức teambuilding",
      "công ty tổ chức sự kiện",
    ],
    openGraph: {
      title: `${siteName} — Gắn kết đội nhóm, bùng nổ năng lượng`,
      description: "Đơn vị tổ chức teambuilding & event chuyên nghiệp hàng đầu Việt Nam. 500+ sự kiện thành công trên 63 tỉnh thành.",
      url: "https://sukientoanquoc.com",
      siteName: siteName,
      type: "website",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} — Teambuilding & Event chuyên nghiệp`,
      description: "Tổ chức teambuilding, company trip, year end party chuyên nghiệp. 500+ sự kiện thành công.",
    },
    alternates: {
      canonical: "https://sukientoanquoc.com",
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
        { url: favicon, sizes: "any" },
        { url: favicon, type: "image/png", sizes: "64x64" },
      ],
      apple: favicon,
    },
    verification: {
      // Thêm Google Search Console verification code khi có
      // google: "verification-code-here",
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
    <html lang="vi" className={`${jakartaSans.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EventPlanningService",
              name: "Sự Kiện Toàn Quốc",
              alternateName: "SKTQ National Events",
              description: "Đơn vị tổ chức teambuilding, company trip, year end party, workshop chuyên nghiệp phủ sóng 63 tỉnh thành Việt Nam. 500+ sự kiện thành công.",
              image: "https://sukientoanquoc.com/logo.png",
              "@id": "https://sukientoanquoc.com",
              url: "https://sukientoanquoc.com",
              telephone: "0857999545",
              email: "sale@sukientoanquoc.com",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "63 Tỉnh Thành Việt Nam",
                addressLocality: "Hà Nội",
                addressCountry: "VN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 21.0285,
                longitude: 105.8542,
              },
              areaServed: {
                "@type": "Country",
                name: "Việt Nam",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Dịch vụ tổ chức sự kiện",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Teambuilding" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Company Trip" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Year End Party" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Workshop & Đào tạo" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sports Day" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Family Day" } },
                ],
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "800",
                bestRating: "5",
              },
              sameAs: [
                "https://www.facebook.com/sukientoanquoc",
                "https://www.youtube.com/@sukientoanquoc",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
