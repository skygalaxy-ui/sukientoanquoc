-- =============================================
-- Sự Kiện Toàn Quốc CMS — Database Setup
-- CHẠY TỪNG BƯỚC trong Supabase SQL Editor
-- =============================================

-- =============================================
-- BƯỚC 1: XÓA BẢNG CŨ (chạy riêng phần này trước)
-- =============================================
DROP TABLE IF EXISTS scheduled_content CASCADE;
DROP TABLE IF EXISTS page_content CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
