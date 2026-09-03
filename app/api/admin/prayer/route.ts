export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireElder } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  const isElder = !requireElder(req);

  let query = supabaseAdmin
    .from('prayer_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (!isElder) {
    query = query.eq('confidential', false);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Failed to load requests' }, { status: 500 });

  return NextResponse.json({ requests: data, isElder });
}
