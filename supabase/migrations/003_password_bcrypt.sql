-- ============================================================
-- FIX #3: Migrate Passwords to bcrypt
-- ============================================================
--
-- IMPORTANT: Passwords sẽ được auto-migrate khi user login lần đầu
-- (login route tự detect plaintext → hash lại bằng bcrypt)
--
-- Nếu muốn hash thủ công, chạy script Node.js:
-- node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword', 10, (e,h) => console.log(h))"
--
-- Rồi update trong SQL:
-- UPDATE users SET password_hash = '$2a$10$...' WHERE email = 'admin@example.com';
--
-- ============================================================
-- Enable pgcrypto extension (optional, for SQL-level hashing)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- If you want to hash all existing plaintext passwords via SQL:
-- (chỉ hash những password chưa ở format bcrypt)
-- ============================================================

-- UPDATE users
-- SET password_hash = crypt(password_hash, gen_salt('bf', 10))
-- WHERE password_hash NOT LIKE '$2a$%'
--   AND password_hash NOT LIKE '$2b$%'
--   AND password_hash != 'NEEDS_RESET';

-- ============================================================
-- NOTE: The login route now auto-migrates passwords!
-- When a user logs in with a plaintext password:
-- 1. It verifies against the plaintext value
-- 2. Hashes with bcrypt
-- 3. Updates the database
-- No manual migration needed for active users.
-- ============================================================
