import { supabase } from './client';
import { Category } from '../types';
import { adminDb } from '../admin-db';

// ==================== CATEGORIES CRUD ====================

export async function getCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

    if (error) { console.error('Error fetching categories:', error); return []; }
    return data as Category[];
}

export async function createCategory(category: Partial<Category>) {
    const { data, error } = await adminDb.insert('categories', category);
    if (error) { console.error('Error creating category:', error); return null; }
    return (data as Category[])?.[0] || null;
}

export async function updateCategory(id: string, updates: Partial<Category>) {
    const { data, error } = await adminDb.update('categories', updates, { column: 'id', value: id });
    if (error) { console.error('Error updating category:', error); return null; }
    return (data as Category[])?.[0] || null;
}

export async function deleteCategory(id: string) {
    const { error } = await adminDb.delete('categories', { column: 'id', value: id });
    if (error) { console.error('Error deleting category:', error); return false; }
    return true;
}
