import { supabase } from './client';
import { Tag } from '../types';
import { adminDb } from '../admin-db';

// ==================== TAGS CRUD ====================

export async function getTags() {
    const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true });

    if (error) { console.error('Error fetching tags:', error); return []; }
    return data as Tag[];
}

export async function createTag(tag: Partial<Tag>) {
    const { data, error } = await adminDb.insert('tags', tag);
    if (error) { console.error('Error creating tag:', error); return null; }
    return (data as Tag[])?.[0] || null;
}

export async function updateTag(id: string, updates: Partial<Tag>) {
    const { data, error } = await adminDb.update('tags', updates, { column: 'id', value: id });
    if (error) { console.error('Error updating tag:', error); return null; }
    return (data as Tag[])?.[0] || null;
}

export async function deleteTag(id: string) {
    const { error } = await adminDb.delete('tags', { column: 'id', value: id });
    if (error) { console.error('Error deleting tag:', error); return false; }
    return true;
}
