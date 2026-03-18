import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getBranding } from "@/lib/branding";

export async function generateMetadata(): Promise<Metadata> {
  const branding = await getBranding();
  const faviconUrl = branding.faviconUrl || "/favicon.png";
  const logoUrl = branding.logoUrl || "/logo.png";

  return {
    metadataBase: new URL("https://sukientoanquoc.com"),
    title: {
      default: "Sự Kiện Toàn Quốc — Tổ chức Teambuilding & Event chuyên nghiệp hàng đầu Việt Nam",
      template: "%s | Sự Kiện Toàn Quốc",
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
      title: "Sự Kiện Toàn Quốc — Gắn kết đội nhóm, bùng nổ năng lượng",
      description: "Đơn vị tổ chức teambuilding & event chuyên nghiệp hàng đầu Việt Nam. 500+ sự kiện thành công trên 63 tỉnh thành.",
      url: "https://sukientoanquoc.com",
      siteName: "Sự Kiện Toàn Quốc",
      type: "website",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sự Kiện Toàn Quốc — Teambuilding & Event chuyên nghiệp",
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
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
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
              areaServed: {
                "@type": "Country",
                name: "Việt Nam",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
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
