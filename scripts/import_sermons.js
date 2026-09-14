/**
 * Bulk imports sermons from the YouTube CSV export into Supabase.
 *
 * Prerequisites:
 *   1. Run supabase/make-sermon-fields-nullable.sql in Supabase SQL Editor first.
 *   2. .env.local must contain NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 *
 * Usage:
 *   node scripts/import_sermons.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const CSV_PATH = '/Users/adwinabraham/Downloads/Untitled spreadsheet - Sheet1.csv';

// Load .env.local so the script can run without setting env vars manually
function loadEnv() {
  const envFile = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envFile)) return;
  for (const line of fs.readFileSync(envFile, 'utf-8').split('\n')) {
    const match = line.match(/^([^#=][^=]*)=(.*)$/);
    if (!match) continue;
    const key = match[1].trim();
    const val = match[2].trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}

// RFC 4180-compliant CSV parser — handles quoted fields and escaped quotes
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') { field += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { field += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { row.push(field); field = ''; }
      else if (ch === '\r' && next === '\n') { i++; row.push(field); rows.push(row); row = []; field = ''; }
      else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else { field += ch; }
    }
  }
  if (field || row.length > 0) { row.push(field); rows.push(row); }

  return rows.filter(r => r.some(f => f.trim().length > 0));
}

async function main() {
  loadEnv();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Parse CSV
  const csvText = fs.readFileSync(CSV_PATH, 'utf-8');
  const [, ...dataRows] = parseCSV(csvText); // skip header row

  // Map columns: Title | Publish Date | YouTube URL
  const sermons = dataRows
    .map(row => ({
      title:     (row[0] || '').trim(),
      date:      (row[1] || '').trim(),
      video_url: (row[2] || '').trim(),
    }))
    .filter(s => s.title && s.date && s.video_url)
    // Sort oldest first as requested
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  console.log(`Found ${sermons.length} sermons in CSV. Inserting oldest-first...\n`);

  const BATCH = 50;
  let inserted = 0;
  let failed = 0;

  for (let i = 0; i < sermons.length; i += BATCH) {
    const batch = sermons.slice(i, i + BATCH);
    const batchNum = Math.floor(i / BATCH) + 1;

    const { data, error } = await supabase
      .from('sermons')
      .insert(batch)
      .select('id');

    if (error) {
      console.error(`Batch ${batchNum} FAILED: ${error.message}`);
      failed += batch.length;
    } else {
      inserted += data.length;
      console.log(`Batch ${batchNum}: inserted ${data.length} (${inserted} total so far)`);
    }
  }

  console.log(`\n✓ Done — ${inserted} inserted, ${failed} failed.`);
}

main().catch(err => { console.error(err); process.exit(1); });
