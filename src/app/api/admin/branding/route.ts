import { NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const BRANDING_FILE = path.join(process.cwd(), 'public', 'branding.json');

async function readBranding() {
    try {
        const data = await readFile(BRANDING_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return {};
    }
}

export async function GET() {
    try {
        const branding = await readBranding();
        return NextResponse.json({ branding });
    } catch {
        return NextResponse.json({ branding: {} });
    }
}

export async function POST(request: Request) {
    try {
        const { branding } = await request.json();

        // Ensure public directory exists
        await mkdir(path.dirname(BRANDING_FILE), { recursive: true });
        await writeFile(BRANDING_FILE, JSON.stringify(branding, null, 2), 'utf-8');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[Branding] Save error:', error);
        return NextResponse.json({ error: 'Failed to save: ' + (error as Error).message }, { status: 500 });
    }
}
