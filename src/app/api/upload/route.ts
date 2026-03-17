import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = (formData.get('folder') as string) || '';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Max 2MB
        if (file.size > 2 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large (max 2MB)' }, { status: 400 });
        }

        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
        const prefix = folder ? `${folder}-` : '';
        const fileName = `${prefix}${Date.now()}.${fileExt}`;

        const buffer = Buffer.from(await file.arrayBuffer());

        // Save to public directory
        const publicDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(publicDir, { recursive: true });
        
        const filePath = path.join(publicDir, fileName);
        await writeFile(filePath, buffer);

        const publicUrl = `/uploads/${fileName}`;

        return NextResponse.json({
            url: publicUrl,
            publicUrl: publicUrl,
            fileName,
        });
    } catch (error) {
        console.error('[Upload API] Error:', error);
        return NextResponse.json({ error: 'Upload failed: ' + (error as Error).message }, { status: 500 });
    }
}
