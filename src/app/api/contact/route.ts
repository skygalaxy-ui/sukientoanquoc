import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

interface ContactPayload {
  name: string;
  phone: string;
  eventType: string;
  message?: string;
}

function isEmpty(value: string | undefined) {
  return !value || value.trim().length === 0;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;

    if (isEmpty(payload.name) || isEmpty(payload.phone) || isEmpty(payload.eventType)) {
      return NextResponse.json(
        { message: "Vui lòng điền đầy đủ họ tên, số điện thoại và loại sự kiện." },
        { status: 400 },
      );
    }

    const normalizedPhone = payload.phone.replace(/\s|\.|-/g, "");
    if (!/^[0-9+]{8,15}$/.test(normalizedPhone)) {
      return NextResponse.json(
        { message: "Số điện thoại chưa đúng định dạng." },
        { status: 400 },
      );
    }

    const leadData = {
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      event_type: payload.eventType,
      message: payload.message?.trim() || null,
    };

    // Save lead to database
    const { error } = await supabaseAdmin
      .from('contact_leads')
      .insert(leadData);

    if (error) {
      // Log error but still return OK to user (graceful degradation)
      console.error('[contact-form] DB insert failed:', error);
    }

    console.info("[contact-form] New lead", {
      ...leadData,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Không thể xử lý yêu cầu lúc này, vui lòng thử lại sau." },
      { status: 500 },
    );
  }
}

