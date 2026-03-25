import { supabase } from './client';
import { ScheduledContent, PageContent } from '../types';
import { adminDb } from '../admin-db';

// ==================== SCHEDULED CONTENT ====================

export async function getScheduledContent() {
    const { data, error } = await supabase
        .from('scheduled_content')
        .select('*')
        .order('scheduled_date', { ascending: true });

    if (error) { console.error('Error fetching scheduled content:', error); return []; }
    return data as ScheduledContent[];
}

export async function createScheduledContent(content: Partial<ScheduledContent>) {
    const { data, error } = await adminDb.insert('scheduled_content', content);
    if (error) { console.error('Error creating scheduled content:', error); return null; }
    return (data as ScheduledContent[])?.[0] || null;
}

export async function updateScheduledContent(id: string, updates: Partial<ScheduledContent>) {
    const { data, error } = await adminDb.update('scheduled_content', { ...updates, updated_at: new Date().toISOString() }, { column: 'id', value: id });
    if (error) { console.error('Error updating scheduled content:', error); return null; }
    return (data as ScheduledContent[])?.[0] || null;
}

export async function deleteScheduledContent(id: string) {
    const { error } = await adminDb.delete('scheduled_content', { column: 'id', value: id });
    if (error) { console.error('Error deleting scheduled content:', error); return false; }
    return true;
}

// ==================== PAGE CONTENT ====================

export async function getAllPageContent(): Promise<PageContent[]> {
    const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('id');

    if (error) { console.error('Error fetching page content:', error); return []; }
    return data || [];
}

export async function savePageContent(sectionId: string, pagePath: string, data: Record<string, string>): Promise<boolean> {
    const { error } = await adminDb.upsert('page_content', {
        section_id: sectionId,
        page_path: pagePath,
        data,
        updated_at: new Date().toISOString(),
    }, { onConflict: 'section_id' });
    if (error) { console.error('Error saving page content:', error); return false; }
    return true;
}

// ==================== SITE SETTINGS ====================

export async function getSiteSettings(): Promise<Record<string, any>> {
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) { console.error('Error fetching site settings:', error); return {}; }
    return (data || []).reduce((acc: Record<string, any>, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {});
}

export async function saveSiteSetting(key: string, value: any): Promise<boolean> {
    const { error } = await adminDb.upsert('site_settings', { key, value }, { onConflict: 'key' });
    if (error) { console.error('Error saving setting:', error); return false; }
    return true;
}

/**
 * Get integration settings (GA4, GSC) from site_settings.
 * Used by GoogleAnalytics component.
 */
export interface IntegrationSettings {
    ga4_measurement_id: string;
    gsc_verification_code: string;
    ga4_enabled: boolean;
    gsc_enabled: boolean;
}

export async function getIntegrationSettings(): Promise<IntegrationSettings | null> {
    try {
        const { data } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', 'integrations')
            .single();

        if (data?.value) {
            return typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
        }
    } catch {
        /* ignore */
    }
    return null;
}
