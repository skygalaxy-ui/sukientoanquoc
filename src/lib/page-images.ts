import { supabase } from './supabase';

// Default images (fallback khi chưa set trong CMS)
const DEFAULT_IMAGES: Record<string, string> = {
  // Hero
  'hero_bg': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&q=90',
  
  // Feature
  'feature_main': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=85',
  
  // Services
  'service_teambuilding': 'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=800&q=85',
  'service_company_trip': 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=85',
  'service_year_end_party': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=85',
  'service_workshop': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=85',
  'service_sports_day': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=85',
  'service_family_day': 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=800&q=85',
  
  // Portfolio
  'portfolio_1': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80&fm=webp',
  'portfolio_2': 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80&fm=webp',
  'portfolio_3': 'https://images.unsplash.com/photo-1583521214690-73421a1829a9?w=600&q=80&fm=webp',
  'portfolio_4': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80&fm=webp',
  'portfolio_5': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80&fm=webp',
  'portfolio_6': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80&fm=webp',
  
  // Speakers (Asian avatars)
  'speaker_1': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&fm=webp',
  'speaker_2': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80&fm=webp',
  'speaker_3': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80&fm=webp',
  
  // Sponsor
  'sponsor_bg': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&q=85',
  
  // Events
  'event_teambuilding_1': 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&q=80',
  'event_teambuilding_2': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
  'event_gala_1': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80',
  'event_gala_2': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
  'event_workshop_1': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80',
  'event_workshop_2': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80',
  
  // VideoGrid
  'video_1': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
  'video_2': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80',
  'video_3': 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80',
  'video_4': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',

  // Topics
  'topic_main': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&q=80',

  // Service pages hero
  'servicepage_teambuilding': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&q=90&fm=webp',
  'servicepage_company_trip': 'https://images.unsplash.com/photo-1583521214690-73421a1829a9?w=1920&q=90&fm=webp',
  'servicepage_year_end_party': 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1920&q=90&fm=webp',
  'servicepage_workshop': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=90&fm=webp',
  'servicepage_sports_day': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1920&q=90&fm=webp',
  'servicepage_family_day': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1920&q=90&fm=webp',
  'servicepage_khai_truong': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=90&fm=webp',
  'servicepage_hoi_nghi': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=90&fm=webp',
};

let cachedImages: Record<string, string> | null = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 1000; // 60 seconds

export async function getPageImages(): Promise<Record<string, string>> {
  const now = Date.now();
  if (cachedImages && (now - cacheTime) < CACHE_TTL) {
    return cachedImages;
  }

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', 'page_images')
      .single();

    if (error || !data) {
      cachedImages = { ...DEFAULT_IMAGES };
    } else {
      cachedImages = { ...DEFAULT_IMAGES, ...(data.value || {}) };
    }
  } catch {
    cachedImages = { ...DEFAULT_IMAGES };
  }

  cacheTime = now;
  return cachedImages!;
}

export function getDefaultImages(): Record<string, string> {
  return { ...DEFAULT_IMAGES };
}

export async function getImage(key: string): Promise<string> {
  const images = await getPageImages();
  return images[key] || DEFAULT_IMAGES[key] || '';
}

// List of all image keys with labels for admin UI
export const IMAGE_KEYS = [
  { key: 'hero_bg', label: 'Ảnh nền Hero (Banner chính)', section: 'Trang chủ' },
  { key: 'feature_main', label: 'Ảnh mục Tại sao chọn chúng tôi', section: 'Trang chủ' },
  { key: 'service_teambuilding', label: 'Teambuilding', section: 'Dịch vụ' },
  { key: 'service_company_trip', label: 'Company Trip', section: 'Dịch vụ' },
  { key: 'service_year_end_party', label: 'Year End Party', section: 'Dịch vụ' },
  { key: 'service_workshop', label: 'Workshop & Đào tạo', section: 'Dịch vụ' },
  { key: 'service_sports_day', label: 'Sports Day', section: 'Dịch vụ' },
  { key: 'service_family_day', label: 'Family Day', section: 'Dịch vụ' },
  { key: 'portfolio_1', label: 'Dự án 1', section: 'Portfolio' },
  { key: 'portfolio_2', label: 'Dự án 2', section: 'Portfolio' },
  { key: 'portfolio_3', label: 'Dự án 3', section: 'Portfolio' },
  { key: 'portfolio_4', label: 'Dự án 4', section: 'Portfolio' },
  { key: 'portfolio_5', label: 'Dự án 5', section: 'Portfolio' },
  { key: 'portfolio_6', label: 'Dự án 6', section: 'Portfolio' },
  { key: 'speaker_1', label: 'Diễn giả 1', section: 'Đội ngũ' },
  { key: 'speaker_2', label: 'Diễn giả 2', section: 'Đội ngũ' },
  { key: 'speaker_3', label: 'Diễn giả 3', section: 'Đội ngũ' },
  { key: 'sponsor_bg', label: 'Ảnh nền Đối tác', section: 'Trang chủ' },
  { key: 'event_teambuilding_1', label: 'Teambuilding 1', section: 'Sự kiện' },
  { key: 'event_teambuilding_2', label: 'Teambuilding 2', section: 'Sự kiện' },
  { key: 'event_gala_1', label: 'Gala Dinner 1', section: 'Sự kiện' },
  { key: 'event_gala_2', label: 'Gala Dinner 2', section: 'Sự kiện' },
  { key: 'event_workshop_1', label: 'Workshop 1', section: 'Sự kiện' },
  { key: 'event_workshop_2', label: 'Workshop 2', section: 'Sự kiện' },
  { key: 'video_1', label: 'Video/Ảnh 1', section: 'Video' },
  { key: 'video_2', label: 'Video/Ảnh 2', section: 'Video' },
  { key: 'video_3', label: 'Video/Ảnh 3', section: 'Video' },
  { key: 'video_4', label: 'Video/Ảnh 4', section: 'Video' },
  { key: 'topic_main', label: 'Ảnh chủ đề', section: 'Trang chủ' },
  { key: 'servicepage_teambuilding', label: 'Hero Teambuilding', section: 'Trang dịch vụ' },
  { key: 'servicepage_company_trip', label: 'Hero Company Trip', section: 'Trang dịch vụ' },
  { key: 'servicepage_year_end_party', label: 'Hero Year End Party', section: 'Trang dịch vụ' },
  { key: 'servicepage_workshop', label: 'Hero Workshop', section: 'Trang dịch vụ' },
  { key: 'servicepage_sports_day', label: 'Hero Sports Day', section: 'Trang dịch vụ' },
  { key: 'servicepage_family_day', label: 'Hero Family Day', section: 'Trang dịch vụ' },
  { key: 'servicepage_khai_truong', label: 'Hero Khai trương', section: 'Trang dịch vụ' },
  { key: 'servicepage_hoi_nghi', label: 'Hero Hội nghị', section: 'Trang dịch vụ' },
];
