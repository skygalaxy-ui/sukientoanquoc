-- =============================================
-- BƯỚC 3 (FIX): CHỈ SEED DATA (Storage đã có sẵn)
-- =============================================

-- SEED CATEGORIES cho Sự Kiện Toàn Quốc
INSERT INTO categories (name, slug, description) VALUES
    ('Teambuilding', 'teambuilding', 'Các hoạt động teambuilding, gắn kết đội nhóm'),
    ('Sự kiện doanh nghiệp', 'su-kien-doanh-nghiep', 'Tổ chức sự kiện cho doanh nghiệp, hội nghị, hội thảo'),
    ('Tiệc & Gala', 'tiec-gala', 'Tổ chức tiệc cuối năm, gala dinner, lễ kỷ niệm'),
    ('Lễ hội & Activation', 'le-hoi-activation', 'Tổ chức lễ hội, brand activation, event marketing'),
    ('Tin tức', 'tin-tuc', 'Tin tức mới nhất về ngành sự kiện'),
    ('Kinh nghiệm', 'kinh-nghiem', 'Chia sẻ kinh nghiệm tổ chức sự kiện')
ON CONFLICT (slug) DO NOTHING;

-- SEED TAGS
INSERT INTO tags (name, slug) VALUES
    ('Teambuilding', 'teambuilding'),
    ('Sự kiện', 'su-kien'),
    ('Doanh nghiệp', 'doanh-nghiep'),
    ('Gala Dinner', 'gala-dinner'),
    ('Hội nghị', 'hoi-nghi'),
    ('Activation', 'activation'),
    ('Year End Party', 'year-end-party'),
    ('Team Outing', 'team-outing'),
    ('Tổ chức sự kiện', 'to-chuc-su-kien'),
    ('Tips', 'tips')
ON CONFLICT (slug) DO NOTHING;

-- Done! ✅
