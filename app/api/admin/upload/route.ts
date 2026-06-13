export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const BUCKET = 'uploads';

async function ensureBucket() {
  if (!supabaseAdmin) return;
  const { data: buckets } = await supabaseAdmin.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);
  if (!exists) {
    await supabaseAdmin.storage.createBucket(BUCKET, { public: true });
  }
}

export async function POST(request: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Storage not configured — SUPABASE_SERVICE_ROLE_KEY may be missing' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('bucket') as string) || 'misc';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    await ensureBucket();

    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 400 });
    }

    const { data: urlData } = supabaseAdmin.storage
      .from(BUCKET)
      .getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: `Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}` }, { status: 500 });
  }
}
