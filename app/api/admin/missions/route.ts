export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  const { data } = await supabaseAdmin.from('missions_content').select('*').limit(1).maybeSingle();
  return NextResponse.json(data || { description: '' });
}

export async function PUT(request: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  try {
    const body = await request.json();
    const { data: existing } = await supabaseAdmin.from('missions_content').select('id').limit(1).maybeSingle();
    let result;
    if (existing?.id) {
      result = await supabaseAdmin.from('missions_content').update({ description: body.description, updated_at: new Date().toISOString() }).eq('id', existing.id).select().single();
    } else {
      result = await supabaseAdmin.from('missions_content').insert({ description: body.description }).select().single();
    }
    if (result.error) return NextResponse.json({ error: result.error.message }, { status: 400 });
    return NextResponse.json(result.data);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
