-- =============================================
-- BƯỚC 4: TẠO BẢNG AUTH + ADMIN USER
-- Chạy trong Supabase SQL Editor
-- =============================================

-- Extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Tenants
CREATE TABLE IF NOT EXISTS tenants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    domain TEXT,
    logo TEXT,
    plan TEXT DEFAULT 'free',
    settings JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Users
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor')),
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    avatar TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Login Attempts (rate limit)
CREATE TABLE IF NOT EXISTS login_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    ip_address TEXT,
    success BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Activity Logs
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id TEXT,
    details JSONB DEFAULT '{}',
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Thêm tenant_id vào bảng posts, categories, tags
ALTER TABLE posts ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE tags ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_posts_tenant ON posts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_categories_tenant ON categories(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tags_tenant ON tags(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_tenant ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email, created_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_tenant ON activity_logs(tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_id);

-- RLS
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tenants_all" ON tenants FOR ALL USING (true);
CREATE POLICY "users_all" ON users FOR ALL USING (true);
CREATE POLICY "login_attempts_all" ON login_attempts FOR ALL USING (true);
CREATE POLICY "activity_logs_all" ON activity_logs FOR ALL USING (true);

-- Functions
CREATE OR REPLACE FUNCTION create_user(
    p_email TEXT,
    p_password TEXT,
    p_name TEXT,
    p_role TEXT DEFAULT 'editor',
    p_tenant_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    new_id UUID;
BEGIN
    INSERT INTO users (email, password_hash, name, role, tenant_id)
    VALUES (p_email, crypt(p_password, gen_salt('bf')), p_name, p_role, p_tenant_id)
    RETURNING id INTO new_id;
    RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_password(p_user_id UUID, p_new_password TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE users SET password_hash = crypt(p_new_password, gen_salt('bf')),
                     updated_at = NOW()
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- TẠO TENANT + ADMIN USER cho Sự Kiện Toàn Quốc
-- =============================================
INSERT INTO tenants (name, slug, domain, plan) 
VALUES ('Sự Kiện Toàn Quốc', 'sukientoanquoc', 'sukientoanquoc.com', 'pro')
ON CONFLICT (slug) DO NOTHING;

-- Tạo super admin (password: SETQ@Admin2026)
INSERT INTO users (email, password_hash, name, role, tenant_id)
SELECT 
    'admin@sukientoanquoc.com',
    crypt('SETQ@Admin2026', gen_salt('bf')),
    'Admin SETQ',
    'super_admin',
    t.id
FROM tenants t WHERE t.slug = 'sukientoanquoc'
ON CONFLICT (email) DO NOTHING;

-- Gắn data vào tenant
UPDATE posts SET tenant_id = (SELECT id FROM tenants WHERE slug = 'sukientoanquoc') WHERE tenant_id IS NULL;
UPDATE categories SET tenant_id = (SELECT id FROM tenants WHERE slug = 'sukientoanquoc') WHERE tenant_id IS NULL;
UPDATE tags SET tenant_id = (SELECT id FROM tenants WHERE slug = 'sukientoanquoc') WHERE tenant_id IS NULL;

-- Done! ✅ Giờ đăng nhập: admin@sukientoanquoc.com / SETQ@Admin2026
