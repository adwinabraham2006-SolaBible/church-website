export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  const { data } = await supabaseAdmin
    .from('benevolence_content')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return NextResponse.json(data || { description: '' });
}

export async function PUT(request: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  try {
    const body = await request.json();
    const { data: existing } = await supabaseAdmin
      .from('benevolence_content')
      .select('id')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    let result;
    if (existing?.id) {
      // Delete any extra rows, keep only the one we're updating
      await supabaseAdmin.from('benevolence_content').delete().neq('id', existing.id);
      result = await supabaseAdmin
        .from('benevolence_content')
        .update({ description: body.description, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabaseAdmin
        .from('benevolence_content')
        .insert({ description: body.description })
        .select()
        .single();
    }

    if (result.error) return NextResponse.json({ error: result.error.message }, { status: 400 });
    return NextResponse.json(result.data);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
