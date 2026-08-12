export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';

async function isElder(): Promise<boolean> {
  const store = await cookies();
  const val = store.get('elder_session')?.value;
  return Boolean(val && val.length > 0);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // If updating a confidential row, require elder session
  const { data: existing } = await supabaseAdmin
    .from('prayer_requests')
    .select('confidential')
    .eq('id', params.id)
    .single();

  if (existing?.confidential) {
    const elder = await isElder();
    if (!elder) {
      return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
    }
  }

  const allowed = ['status', 'handled_by', 'notes'] as const;
  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }

  const { data, error } = await supabaseAdmin
    .from('prayer_requests')
    .update(update)
    .eq('id', params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
