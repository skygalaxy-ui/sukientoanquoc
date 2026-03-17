import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const type = (formData.get('type') as string) || 'logo'; // 'logo' or 'favicon'

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Max 2MB
        if (file.size > 2 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large (max 2MB)' }, { status: 400 });
        }

        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
        const buffer = Buffer.from(await file.arrayBuffer());

        const publicDir = path.join(process.cwd(), 'public');
        await mkdir(publicDir, { recursive: true });

        // Save as logo.png or favicon.png directly
        const targetName = type === 'favicon' ? `favicon.${fileExt}` : `logo.${fileExt}`;
        const filePath = path.join(publicDir, targetName);
        await writeFile(filePath, buffer);

        // Also save a timestamped backup
        const uploadsDir = path.join(publicDir, 'uploads');
        await mkdir(uploadsDir, { recursive: true });
        const backupName = `${type}-${Date.now()}.${fileExt}`;
        await writeFile(path.join(uploadsDir, backupName), buffer);

        const publicUrl = `/${targetName}`;

        return NextResponse.json({
            url: publicUrl,
            publicUrl: publicUrl,
            fileName: targetName,
        });
    } catch (error) {
        console.error('[Branding Upload] Error:', error);
        return NextResponse.json({ error: 'Upload failed: ' + (error as Error).message }, { status: 500 });
    }
}
