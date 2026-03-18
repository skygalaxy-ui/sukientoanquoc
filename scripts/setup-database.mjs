/**
 * Setup Database for Sự Kiện Toàn Quốc CMS
 * - Kiểm tra trạng thái hiện tại
 * - Xóa dữ liệu test cũ (cachdautu legacy)
 * - Hiển thị hướng dẫn chạy schema
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://njchsjhdkcfaouqwyutc.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qY2hzamhka2NmYW91cXd5dXRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA0OTY5MCwiZXhwIjoyMDg1NjI1NjkwfQ.IlMHefuzwH2DZ_2srbE2N4vyDoZVk36vMr060wNlagE';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function checkAndClean() {
    console.log('🔍 Kiểm tra database hiện tại...\n');

    // Check existing tables
    const tables = ['posts', 'categories', 'tags', 'scheduled_content', 'page_content', 'site_settings', 'comments'];

    for (const table of tables) {
        try {
            const { data, count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            if (error) {
                console.log(`  ❌ ${table}: Không tồn tại hoặc lỗi (${error.message})`);
            } else {
                console.log(`  ✅ ${table}: ${count} records`);
            }
        } catch (e) {
            console.log(`  ❌ ${table}: ${e.message}`);
        }
    }

    console.log('\n🧹 Dọn dẹp dữ liệu cũ...\n');

    // Delete old data from existing tables
    const tablesToClean = ['posts', 'categories', 'tags', 'scheduled_content', 'page_content', 'site_settings', 'comments'];

    for (const table of tablesToClean) {
        try {
            const { error } = await supabase
                .from(table)
                .delete()
                .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

            if (error) {
                if (error.code === '42P01') {
                    console.log(`  ⏭️  ${table}: Bảng chưa tồn tại (sẽ tạo khi chạy schema)`);
                } else {
                    console.log(`  ⚠️  ${table}: ${error.message}`);
                }
            } else {
                console.log(`  🗑️  ${table}: Đã xóa sạch!`);
            }
        } catch (e) {
            console.log(`  ⏭️  ${table}: Bỏ qua`);
        }
    }

    // Verify clean state
    console.log('\n📊 Kiểm tra lại sau dọn dẹp...\n');

    for (const table of ['posts', 'categories', 'tags']) {
        try {
            const { count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            if (!error) {
                console.log(`  ${count === 0 ? '✅' : '⚠️'} ${table}: ${count} records`);
            }
        } catch (e) {
            // skip
        }
    }

    console.log('\n✅ Database đã sẵn sàng!');
    console.log('\n📋 BƯỚC TIẾP THEO:');
    console.log('   Vào Supabase Dashboard → SQL Editor');
    console.log('   Paste nội dung file supabase-schema.sql → Bấm Run');
    console.log('   URL: https://supabase.com/dashboard/project/njchsjhdkcfaouqwyutc/sql/new\n');
}

checkAndClean().catch(console.error);
