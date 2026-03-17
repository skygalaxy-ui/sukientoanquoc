import { supabase } from './supabase';

/**
 * Create a tenant-scoped query builder.
 * Super admin sees all, others see only their tenant.
 *
 * NOTE: tenantId and role should come from AuthContext (server-verified),
 * NOT from client-side cookie decoding.
 */
export function tenantQuery(table: string, tenantId: string | null, role: string | null) {
    let query = supabase.from(table).select('*');

    // Super admin sees everything, others filtered by tenant
    if (role !== 'super_admin' && tenantId) {
        query = query.eq('tenant_id', tenantId);
    }

    return query;
}

/**
 * Add tenant_id to data before insert.
 * tenantId should come from AuthContext (server-verified).
 */
export function withTenantId<T extends Record<string, any>>(data: T, tenantId?: string | null): T & { tenant_id?: string } {
    if (tenantId) {
        return { ...data, tenant_id: tenantId };
    }
    return data;
}

