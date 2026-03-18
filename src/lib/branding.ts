import { readFile } from 'fs/promises';
import path from 'path';

export interface BrandingData {
    logoUrl?: string;
    faviconUrl?: string;
}

const BRANDING_FILE = path.join(process.cwd(), 'public', 'branding.json');

/**
 * Read branding config from public/branding.json (server-side only).
 * Falls back to default paths if file doesn't exist.
 */
export async function getBranding(): Promise<BrandingData> {
    try {
        const data = await readFile(BRANDING_FILE, 'utf-8');
        const parsed = JSON.parse(data);
        return {
            logoUrl: parsed.logoUrl || '/logo.png',
            faviconUrl: parsed.faviconUrl || '/favicon.png',
        };
    } catch {
        return {
            logoUrl: '/logo.png',
            faviconUrl: '/favicon.png',
        };
    }
}
