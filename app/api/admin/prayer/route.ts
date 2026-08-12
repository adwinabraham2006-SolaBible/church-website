export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';

async function isElder(): Promise<boolean> {
  const store = await cookies();
  const val = store.get('elder_session')?.value;
  return Boolean(val && val.length > 0);
}

export async function GET(_: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  const elder = await isElder();

  let query = supabaseAdmin
    .from('prayer_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (!elder) {
    query = query.eq('confidential', false);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ requests: data, isElder: elder });
}
