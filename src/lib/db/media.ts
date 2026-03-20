import { supabase } from './client';
import { MediaFile } from '../types';

// ==================== MEDIA / STORAGE ====================

export async function uploadImage(file: File, bucket: string = 'post-images'): Promise<string | null> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { error } = await supabase.storage
            .from(bucket)
            .upload(fileName, file, { cacheControl: '3600', upsert: false });

        if (error) {
            console.error('[Upload] Error:', error);
            return null;
        }

        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
        return urlData.publicUrl;
    } catch (error) {
        console.error('[Upload] Unexpected error:', error);
        return null;
    }
}

export async function listStorageImages(bucket: string = 'post-images'): Promise<MediaFile[]> {
    try {
        const { data, error } = await supabase.storage
            .from(bucket)
            .list('', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });

        if (error) { console.error('Error listing images:', error); return []; }

        const imageFiles = (data || []).filter(f =>
            f.name && !f.name.startsWith('.') &&
            /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.name)
        );

        return imageFiles.map(f => {
            const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(f.name);
            return {
                name: f.name,
                url: urlData.publicUrl,
                size: (f.metadata as any)?.size || 0,
                created_at: f.created_at || '',
                type: (f.metadata as any)?.mimetype || 'image/jpeg',
            };
        });
    } catch (error) {
        console.error('List images error:', error);
        return [];
    }
}

export async function deleteStorageImage(fileName: string, bucket: string = 'post-images'): Promise<boolean> {
    try {
        const { error } = await supabase.storage.from(bucket).remove([fileName]);
        if (error) { console.error('Error deleting:', error); return false; }
        return true;
    } catch (error) {
        console.error('Delete error:', error);
        return false;
    }
}
