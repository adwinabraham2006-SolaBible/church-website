import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from('sermons')
    .select('*, sermon_series(*)')
    .order('date', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured — SUPABASE_SERVICE_ROLE_KEY may be missing' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { data, error } = await supabaseAdmin
      .from('sermons')
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Sermon POST error:', err);
    return NextResponse.json({ error: `Server error: ${err instanceof Error ? err.message : 'Unknown error'}` }, { status: 500 });
  }
}
