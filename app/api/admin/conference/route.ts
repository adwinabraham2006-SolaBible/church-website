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
      const { id: _id, ...updateFields } = body;
      console.log('[conference PUT] updating id:', existing.id, 'fields:', JSON.stringify(updateFields));
      result = await supabaseAdmin
        .from('conference_details')
        .update({ ...updateFields, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      console.log('[conference PUT] inserting new row');
      result = await supabaseAdmin
        .from('conference_details')
        .insert({ ...body, updated_at: new Date().toISOString() })
        .select()
        .single();
    }

    console.log('[conference PUT] result error:', result.error, 'data name:', result.data?.name);
    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 400 });
    }
    return NextResponse.json(result.data);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
