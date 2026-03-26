import { supabase } from './supabase';

const DEFAULT_CONTENT: Record<string, string> = {
  // Hero section
  'hero_title_1': 'SỰ KIỆN',
  'hero_title_2': '2026',
  'hero_subtitle': 'Các sự kiện quy mô lớn trên toàn quốc',

  // Portfolio Section (6 items)
  'portfolio_1_title': 'TEAMBUILDING BIỂN ĐÀ NẴNG',
  'portfolio_1_client': 'FPT Software — 300 người',
  'portfolio_2_title': 'YEAR END PARTY 2025',
  'portfolio_2_client': 'Viettel Group — 500 người',
  'portfolio_3_title': 'COMPANY TRIP PHÚ QUỐC',
  'portfolio_3_client': 'MoMo — 200 người',
  'portfolio_4_title': 'SPORTS DAY NỘI BỘ',
  'portfolio_4_client': 'Samsung Electronics — 800 người',
  'portfolio_5_title': 'WORKSHOP LEADERSHIP',
  'portfolio_5_client': 'Masan Group — 150 người',
  'portfolio_6_title': 'FAMILY DAY & CARNIVAL',
  'portfolio_6_client': 'Vingroup — 1000+ người',
};

let cachedContent: Record<string, string> | null = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 1000; // 60 seconds

/**
 * Fetch text content overrides from Supabase site_settings.
 * Merges CMS-managed content on top of defaults.
 */
export async function getPageContent(): Promise<Record<string, string>> {
  const now = Date.now();
  if (cachedContent && (now - cacheTime) < CACHE_TTL) {
    return cachedContent;
  }

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', 'page_content')
      .single();

    if (error || !data) {
      cachedContent = { ...DEFAULT_CONTENT };
    } else {
      cachedContent = { ...DEFAULT_CONTENT, ...(data.value || {}) };
    }
  } catch {
    cachedContent = { ...DEFAULT_CONTENT };
  }

  cacheTime = now;
  return cachedContent!;
}
