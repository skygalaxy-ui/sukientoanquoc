-- ============================================================
-- FIX #2: Lock Down RLS Policies
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================
-- WHAT THIS DOES:
-- 1. Remove dangerous "Allow all" policies (USING true for ALL)
-- 2. Allow reads (SELECT) from anon key (content is not sensitive)
-- 3. Block ALL writes (INSERT/UPDATE/DELETE) from anon key
-- 4. Sensitive tables (users, tenants, activity_logs) = service_role only
--
-- Admin write operations go through /api/admin/db which uses
-- service_role key (bypasses RLS automatically)
-- ============================================================

-- ===================== POSTS =====================

DROP POLICY IF EXISTS "Allow all on posts" ON posts;
DROP POLICY IF EXISTS "Allow all access to posts" ON posts;
DROP POLICY IF EXISTS "Enable all for posts" ON posts;

-- Anon can read all posts (admin dashboard needs drafts/scheduled too)
CREATE POLICY "Anon read posts"
    ON posts FOR SELECT
    USING (true);

-- Only service_role can write
CREATE POLICY "Service role write posts"
    ON posts FOR INSERT
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role update posts"
    ON posts FOR UPDATE
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role delete posts"
    ON posts FOR DELETE
    USING (auth.role() = 'service_role');

-- ===================== CATEGORIES =====================

DROP POLICY IF EXISTS "Allow all on categories" ON categories;
DROP POLICY IF EXISTS "Allow all access to categories" ON categories;
DROP POLICY IF EXISTS "Enable all for categories" ON categories;

CREATE POLICY "Anon read categories"
    ON categories FOR SELECT
    USING (true);

CREATE POLICY "Service role write categories"
    ON categories FOR INSERT
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role update categories"
    ON categories FOR UPDATE
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role delete categories"
    ON categories FOR DELETE
    USING (auth.role() = 'service_role');

-- ===================== TAGS =====================

DROP POLICY IF EXISTS "Allow all on tags" ON tags;
DROP POLICY IF EXISTS "Allow all access to tags" ON tags;
DROP POLICY IF EXISTS "Enable all for tags" ON tags;

CREATE POLICY "Anon read tags"
    ON tags FOR SELECT
    USING (true);

CREATE POLICY "Service role write tags"
    ON tags FOR INSERT
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role update tags"
    ON tags FOR UPDATE
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role delete tags"
    ON tags FOR DELETE
    USING (auth.role() = 'service_role');

-- ===================== SCHEDULED_CONTENT =====================

DROP POLICY IF EXISTS "Allow all on scheduled_content" ON scheduled_content;
DROP POLICY IF EXISTS "Allow all access to scheduled_content" ON scheduled_content;
DROP POLICY IF EXISTS "Enable all for scheduled_content" ON scheduled_content;

CREATE POLICY "Anon read scheduled_content"
    ON scheduled_content FOR SELECT
    USING (true);

CREATE POLICY "Service role write scheduled_content"
    ON scheduled_content FOR INSERT
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role update scheduled_content"
    ON scheduled_content FOR UPDATE
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role delete scheduled_content"
    ON scheduled_content FOR DELETE
    USING (auth.role() = 'service_role');

-- ===================== PAGE_CONTENT =====================

DROP POLICY IF EXISTS "Allow all on page_content" ON page_content;
DROP POLICY IF EXISTS "Allow all access to page_content" ON page_content;
DROP POLICY IF EXISTS "Enable all for page_content" ON page_content;

CREATE POLICY "Anon read page_content"
    ON page_content FOR SELECT
    USING (true);

CREATE POLICY "Service role write page_content"
    ON page_content FOR INSERT
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role update page_content"
    ON page_content FOR UPDATE
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role delete page_content"
    ON page_content FOR DELETE
    USING (auth.role() = 'service_role');

-- ===================== SITE_SETTINGS =====================

DROP POLICY IF EXISTS "Allow all on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow all access to site_settings" ON site_settings;
DROP POLICY IF EXISTS "Enable all for site_settings" ON site_settings;

CREATE POLICY "Anon read site_settings"
    ON site_settings FOR SELECT
    USING (true);

CREATE POLICY "Service role write site_settings"
    ON site_settings FOR INSERT
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role update site_settings"
    ON site_settings FOR UPDATE
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role delete site_settings"
    ON site_settings FOR DELETE
    USING (auth.role() = 'service_role');

-- ===================== SENSITIVE TABLES =====================
-- Users, Tenants, Activity Logs = NO public access at all

-- TENANTS
DROP POLICY IF EXISTS "Allow all on tenants" ON tenants;
DROP POLICY IF EXISTS "Allow all access to tenants" ON tenants;
DROP POLICY IF EXISTS "Enable all for tenants" ON tenants;

CREATE POLICY "Service role only tenants"
    ON tenants FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- USERS
DROP POLICY IF EXISTS "Allow all on users" ON users;
DROP POLICY IF EXISTS "Allow all access to users" ON users;
DROP POLICY IF EXISTS "Enable all for users" ON users;

CREATE POLICY "Service role only users"
    ON users FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- ACTIVITY_LOGS
DROP POLICY IF EXISTS "Allow all on activity_logs" ON activity_logs;
DROP POLICY IF EXISTS "Allow all access to activity_logs" ON activity_logs;
DROP POLICY IF EXISTS "Enable all for activity_logs" ON activity_logs;

CREATE POLICY "Service role only activity_logs"
    ON activity_logs FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- ============================================================
-- ENSURE RLS IS ENABLED
-- ============================================================

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- VERIFICATION: Run these with anon key to test:
-- ✅ SELECT * FROM posts;            → Works (read OK)
-- ❌ INSERT INTO posts (...) ...     → BLOCKED
-- ❌ DELETE FROM posts WHERE ...     → BLOCKED
-- ❌ SELECT * FROM users;            → BLOCKED (0 rows)
-- ❌ SELECT * FROM tenants;          → BLOCKED (0 rows)
-- ============================================================
