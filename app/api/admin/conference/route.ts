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
    .order('updated_at', { ascending: false })
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
    const { id: _id, ...updateFields } = body;

    const { data: existing } = await supabaseAdmin
      .from('conference_details')
      .select('id')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    let result;
    if (existing) {
      // Delete any extra rows so GET and PUT always agree on which row is canonical
      await supabaseAdmin.from('conference_details').delete().neq('id', existing.id);

      result = await supabaseAdmin
        .from('conference_details')
        .update({ ...updateFields, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabaseAdmin
        .from('conference_details')
        .insert({ ...updateFields, updated_at: new Date().toISOString() })
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
