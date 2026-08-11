export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  const { error } = await supabaseAdmin.from('missions_files').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
