-- =============================================
-- Migration: Thêm cột deleted_at cho soft delete
-- Chạy SQL này trên Supabase Dashboard:
-- https://supabase.com/dashboard/project/njchsjhdkcfaouqwyutc/sql/new
-- =============================================

-- Thêm cột deleted_at (NULL = chưa xoá, có giá trị = đã xoá mềm)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL;

-- Index để tối ưu query filter deleted_at IS NULL
CREATE INDEX IF NOT EXISTS idx_posts_deleted ON posts(deleted_at) WHERE deleted_at IS NULL;

-- Xác nhận
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'posts' AND column_name = 'deleted_at';
