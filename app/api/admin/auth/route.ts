import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { signSession } from '@/lib/admin-auth';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';
const ELDER_PASSWORD = process.env.ELDER_PASSWORD ?? '';
const COOKIE_NAME = 'admin_session';
const ELDER_COOKIE = 'elder_session';
const SESSION_DURATION = 60 * 60 * 24;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: SESSION_DURATION,
  path: '/',
};

function checkPassword(supplied: string, actual: string): boolean {
  if (!actual) return false;
  const a = crypto.createHmac('sha256', 'pw-check').update(supplied).digest();
  const b = crypto.createHmac('sha256', 'pw-check').update(actual).digest();
  return crypto.timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    if (typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 });
    }

    // Elder password — grants both admin and elder access
    if (ELDER_PASSWORD && checkPassword(password.trim(), ELDER_PASSWORD.trim())) {
      const res = NextResponse.json({ success: true, role: 'elder' });
      res.cookies.set(COOKIE_NAME, signSession('admin'), cookieOptions);
      res.cookies.set(ELDER_COOKIE, signSession('elder'), cookieOptions);
      return res;
    }

    // Regular admin password
    if (checkPassword(password.trim(), ADMIN_PASSWORD.trim())) {
      const res = NextResponse.json({ success: true, role: 'admin' });
      res.cookies.set(COOKIE_NAME, signSession('admin'), cookieOptions);
      res.cookies.delete(ELDER_COOKIE);
      return res;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(COOKIE_NAME);
  res.cookies.delete(ELDER_COOKIE);
  return res;
}
