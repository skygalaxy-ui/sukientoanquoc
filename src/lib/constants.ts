/**
 * Site-wide constants — Tập trung tất cả thông tin cố định của website.
 * 
 * Khi cần thay đổi SĐT, email, địa chỉ, tên công ty...
 * chỉ cần sửa MỘT chỗ duy nhất ở đây.
 */

// ==================== COMPANY INFO ====================
export const SITE_NAME = "Sự Kiện Toàn Quốc";
export const SITE_NAME_SHORT = "SKTQ";
export const SITE_URL = "https://sukientoanquoc.com";
export const SITE_DESCRIPTION = "Đơn vị tổ chức teambuilding, company trip, year end party, workshop chuyên nghiệp phủ sóng 63 tỉnh thành. 500+ sự kiện thành công.";
export const COMPANY_PHONE = "0854517868";
export const COMPANY_PHONE_DISPLAY = "0854 517 868";
export const COMPANY_EMAIL = "sale@sukientoanquoc.com";
export const COMPANY_ADDRESS = "63 Tỉnh Thành Việt Nam";
export const COMPANY_CITY = "Hà Nội";

// ==================== SOCIAL LINKS ====================
export const SOCIAL_LINKS = {
    facebook: "https://www.facebook.com/sukientoanquoc",
    youtube: "https://www.youtube.com/@sukientoanquoc",
} as const;

// ==================== MARQUEE ITEMS ====================
export const MARQUEE_CITIES = [
    "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ",
    "Hải Phòng", "Quảng Ninh", "Bình Dương", "Nha Trang",
];

export const MARQUEE_SERVICES = [
    "Khai Trương", "Hội Nghị", "Festival", "Roadshow",
    "Teambuilding", "Gala Dinner", "Khánh Thành", "Động Thổ",
];

// ==================== SEO KEYWORDS ====================
export const SEO_KEYWORDS = [
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
];

// ==================== SCHEMA.ORG STRUCTURED DATA ====================
export const SCHEMA_ORG_DATA = {
    "@context": "https://schema.org",
    "@type": "EventPlanningService",
    name: SITE_NAME,
    alternateName: "SKTQ National Events",
    description: `${SITE_DESCRIPTION} 500+ sự kiện thành công.`,
    image: `${SITE_URL}/logo.png`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
    priceRange: "$$",
    address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY_ADDRESS,
        addressLocality: COMPANY_CITY,
        addressCountry: "VN",
    },
    areaServed: {
        "@type": "Country",
        name: "Việt Nam",
    },
    openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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
    sameAs: Object.values(SOCIAL_LINKS),
};
