export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { supabaseAdmin, supabase } from '@/lib/supabase';

const SITE_URL = 'https://solabiblechurch.org';
const LOGO_URL = `${SITE_URL}/images/logo.png`;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRfc822(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00Z');
  return d.toUTCString();
}

export async function GET() {
  const client = supabaseAdmin || supabase;
  if (!client) {
    return new NextResponse('Database not configured', { status: 500 });
  }

  const { data: sermons, error } = await client
    .from('sermons')
    .select('id, title, date, speaker, scripture, description, audio_url')
    .not('audio_url', 'is', null)
    .neq('audio_url', '')
    .order('date', { ascending: false });

  if (error) {
    return new NextResponse('Failed to fetch sermons', { status: 500 });
  }

  const items = (sermons ?? []).map((s) => {
    const title = escapeXml(s.title ?? '');
    const speaker = escapeXml(s.speaker ?? 'Sola Bible Church');
    const scripture = s.scripture ? escapeXml(s.scripture) : '';
    const description = escapeXml(
      s.description ?? (scripture ? `${s.title} — ${s.scripture}` : s.title ?? '')
    );
    const pubDate = formatRfc822(s.date);
    const guid = `${SITE_URL}/resources/sermons/${s.id}`;
    const audioUrl = escapeXml(s.audio_url);

    return `
    <item>
      <title>${title}</title>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${guid}</guid>
      <link>${guid}</link>
      <enclosure url="${audioUrl}" type="audio/mpeg" length="0" />
      <itunes:title>${title}</itunes:title>
      <itunes:author>${speaker}</itunes:author>
      <itunes:summary>${description}</itunes:summary>
      ${scripture ? `<itunes:subtitle>${escapeXml(s.scripture)}</itunes:subtitle>` : ''}
      <itunes:explicit>false</itunes:explicit>
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sola Bible Church Sermons</title>
    <description>Expository preaching from Sola Bible Church in Temple, TX</description>
    <link>${SITE_URL}/resources/sermons</link>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed/podcast" rel="self" type="application/rss+xml" />
    <itunes:author>Sola Bible Church</itunes:author>
    <itunes:owner>
      <itunes:name>Sola Bible Church</itunes:name>
      <itunes:email>solabiblechurch@gmail.com</itunes:email>
    </itunes:owner>
    <itunes:summary>Expository preaching from Sola Bible Church in Temple, TX</itunes:summary>
    <itunes:explicit>false</itunes:explicit>
    <itunes:category text="Religion &amp; Spirituality">
      <itunes:category text="Christianity" />
    </itunes:category>
    <image>
      <url>${LOGO_URL}</url>
      <title>Sola Bible Church Sermons</title>
      <link>${SITE_URL}/resources/sermons</link>
    </image>
    <itunes:image href="${LOGO_URL}" />${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=600',
    },
  });
}
