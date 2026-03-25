import { supabase } from './supabase';

// Default images (fallback khi chưa set trong CMS)
const DEFAULT_IMAGES: Record<string, string> = {
  // Hero
  'hero_bg': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=90',
  
  // Feature
  'feature_main': 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=85',
  
  // Services
  'service_teambuilding': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85',
  'service_company_trip': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85',
  'service_year_end_party': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85',
  'service_workshop': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=85',
  'service_sports_day': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=85',
  'service_family_day': 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=85',
  
  // Portfolio
  'portfolio_1': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&fm=webp',
  'portfolio_2': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&fm=webp',
  'portfolio_3': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fm=webp',
  'portfolio_4': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80&fm=webp',
  'portfolio_5': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&fm=webp',
  'portfolio_6': 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80&fm=webp',
  
  // Speakers
  'speaker_1': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&fm=webp',
  'speaker_2': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&fm=webp',
  'speaker_3': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80&fm=webp',
  
  // Sponsor
  'sponsor_bg': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=85',
  
  // Events
  'event_teambuilding_1': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80',
  'event_teambuilding_2': 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80',
  'event_gala_1': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
  'event_gala_2': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80',
  'event_workshop_1': 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80',
  'event_workshop_2': 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&q=80',
  
  // VideoGrid
  'video_1': 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
  'video_2': 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80',
  'video_3': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
  'video_4': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',

  // Service page heroes
  'servicepage_teambuilding': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=90&fm=webp',
  'servicepage_company_trip': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90&fm=webp',
  'servicepage_year_end_party': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=90&fm=webp',
  'servicepage_workshop': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=90&fm=webp',
  'servicepage_sports_day': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&q=90&fm=webp',
  'servicepage_family_day': 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1920&q=90&fm=webp',
  'servicepage_khai_truong': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=90&fm=webp',
  'servicepage_hoi_nghi': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=90&fm=webp',
};

let cachedImages: Record<string, string> | null = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 1000; // 60 seconds

/**
 * Fetch page images from Supabase site_settings.
 * Merges CMS-managed images on top of defaults.
 * Results are cached for 60 seconds (matches ISR revalidation).
 */
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
