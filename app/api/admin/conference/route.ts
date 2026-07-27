export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }
  const { data } = await supabaseAdmin
    .from('conference_details')
    .select('*')
    .limit(1)
    .maybeSingle();
  return NextResponse.json(data || {});
}

export async function PUT(request: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }
  try {
    const body = await request.json();
    const { data: existing } = await supabaseAdmin
      .from('conference_details')
      .select('id')
      .limit(1)
      .maybeSingle();

    let result;
    if (existing) {
      result = await supabaseAdmin
        .from('conference_details')
        .update({ ...body, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabaseAdmin
        .from('conference_details')
        .insert({ ...body, updated_at: new Date().toISOString() })
        .select()
        .single();
    }

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 400 });
    }
    return NextResponse.json(result.data);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
