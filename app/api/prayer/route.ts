export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function buildEmailHtml(fields: {
  name: string;
  email: string | null;
  phone: string | null;
  request: string;
  confidential: boolean;
  followup: boolean;
  submittedAt: string;
}): string {
  const { name, email, phone, request, confidential, followup, submittedAt } = fields;
  const badges = [
    confidential ? '<span style="background:#dc2626;color:#fff;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:700;">CONFIDENTIAL</span>' : '',
    followup ? '<span style="background:#d97706;color:#fff;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:700;">FOLLOW-UP REQUESTED</span>' : '',
  ].filter(Boolean).join('&nbsp;');

  return `
<!DOCTYPE html>
<html>
<body style="font-family:Georgia,serif;color:#1c1917;max-width:600px;margin:0 auto;padding:24px;">
  <h2 style="color:#2a4572;border-bottom:2px solid #f4c430;padding-bottom:8px;">
    New Prayer Request — Sola Bible Church
  </h2>
  ${badges ? `<p style="margin-bottom:16px;">${badges}</p>` : ''}
  <table style="width:100%;border-collapse:collapse;font-size:15px;">
    <tr><td style="padding:8px 0;font-weight:700;width:140px;vertical-align:top;">Name</td><td style="padding:8px 0;">${name}</td></tr>
    ${email ? `<tr><td style="padding:8px 0;font-weight:700;vertical-align:top;">Email</td><td style="padding:8px 0;">${email}</td></tr>` : ''}
    ${phone ? `<tr><td style="padding:8px 0;font-weight:700;vertical-align:top;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>` : ''}
    <tr><td style="padding:8px 0;font-weight:700;vertical-align:top;">Follow-up?</td><td style="padding:8px 0;">${followup ? 'Yes' : 'No'}</td></tr>
    <tr><td style="padding:8px 0;font-weight:700;vertical-align:top;">Confidential?</td><td style="padding:8px 0;">${confidential ? 'Yes' : 'No'}</td></tr>
    <tr>
      <td style="padding:12px 0;font-weight:700;vertical-align:top;">Prayer Request</td>
      <td style="padding:12px 0;"><div style="background:#f5f5f4;border-left:4px solid #2a4572;padding:12px 16px;white-space:pre-wrap;border-radius:0 4px 4px 0;">${request.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div></td>
    </tr>
  </table>
  <p style="font-size:12px;color:#78716c;margin-top:24px;border-top:1px solid #e7e5e4;padding-top:12px;">
    Submitted ${submittedAt}${email ? ' · Reply to this email to respond directly to the submitter.' : ''}
  </p>
  <p style="font-size:12px;color:#78716c;">
    Manage this request in the <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'}/admin/prayer" style="color:#2a4572;">admin dashboard</a>.
  </p>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields, humans don't
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const name = (body.name as string | undefined)?.trim() ?? '';
  const email = (body.email as string | undefined)?.trim() || null;
  const phone = (body.phone as string | undefined)?.trim() || null;
  const prayerRequest = (body.request as string | undefined)?.trim() ?? '';
  const confidential = Boolean(body.confidential);
  const followup = Boolean(body.followup);

  if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  if (!prayerRequest) return NextResponse.json({ error: 'Prayer request is required.' }, { status: 400 });
  if (followup && !email && !phone) {
    return NextResponse.json(
      { error: 'Please provide an email or phone number so we can follow up with you.' },
      { status: 400 }
    );
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Service unavailable. Please try again later.' }, { status: 500 });
  }

  const { error: dbError } = await supabaseAdmin.from('prayer_requests').insert({
    name,
    email,
    phone,
    request: prayerRequest,
    confidential,
    followup,
    status: 'new',
  });

  if (dbError) {
    console.error('Prayer request DB error:', dbError);
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 });
  }

  // Send email notification
  if (resend) {
    const elders = [
      'adwinabraham2006@gmail.com',
      'brad@ridgewoodwealth.com',
      'diosesbueno.1294@gmail.com',
      'leewatson1165@gmail.com',
      'jj197588@gmail.com',
    ];
    // All elders receive both regular and confidential requests
    const recipients = elders;

    if (recipients.length > 0) {
      const flags = [
        confidential && '[CONFIDENTIAL]',
        followup && '[FOLLOW-UP NEEDED]',
      ].filter(Boolean).join(' ');
      const subject = `${flags ? flags + ' ' : ''}Prayer Request from ${name}`;
      const fromEmail = process.env.PRAYER_FROM_EMAIL || 'noreply@solabiblechurch.org';

      await resend.emails.send({
        from: `Sola Bible Church <${fromEmail}>`,
        to: recipients,
        replyTo: email ?? undefined,
        subject,
        html: buildEmailHtml({
          name,
          email,
          phone,
          request: prayerRequest,
          confidential,
          followup,
          submittedAt: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }) + ' CT',
        }),
      }).catch(err => {
        // Log but don't fail the request — prayer is saved even if email fails
        console.error('Prayer email send error:', err);
      });
    }
  }

  return NextResponse.json({ success: true });
}
