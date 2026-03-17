import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyToken } from "@/lib/jwt";
import { verifyPassword, hashPassword } from "@/lib/password";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST /api/auth/change-password
export async function POST(request: NextRequest) {
    const authCookie = request.cookies.get('cms_auth');
    if (!authCookie) {
        return NextResponse.json({ success: false, message: 'Chưa đăng nhập' }, { status: 401 });
    }

    const userData = await verifyToken(authCookie.value);
    if (!userData || !userData.userId) {
        return NextResponse.json({ success: false, message: 'Token không hợp lệ' }, { status: 401 });
    }

    const userId = userData.userId;
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
        return NextResponse.json({ success: false, message: 'Thiếu thông tin' }, { status: 400 });
    }

    if (newPassword.length < 8) {
        return NextResponse.json({ success: false, message: 'Mật khẩu mới phải ít nhất 8 ký tự' }, { status: 400 });
    }

    // Get user's current password hash
    const { data: user } = await supabase.from('users').select('password_hash').eq('id', userId).single();
    if (!user || !user.password_hash) {
        return NextResponse.json({ success: false, message: 'User không tồn tại' }, { status: 404 });
    }

    // Verify current password using bcrypt
    const isCorrect = await verifyPassword(currentPassword, user.password_hash);
    if (!isCorrect) {
        return NextResponse.json({ success: false, message: 'Mật khẩu hiện tại không đúng' }, { status: 401 });
    }

    // Hash new password with bcrypt and update
    const newHash = await hashPassword(newPassword);
    const { error } = await supabase.from('users').update({ password_hash: newHash }).eq('id', userId);

    if (error) {
        console.error('[Change Password] Error:', error);
        return NextResponse.json({ success: false, message: 'Lỗi cập nhật mật khẩu' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Đã đổi mật khẩu thành công' });
}
