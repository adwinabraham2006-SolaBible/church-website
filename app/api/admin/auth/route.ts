import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ELDER_PASSWORD = process.env.ELDER_PASSWORD;
const COOKIE_NAME = 'admin_session';
const ELDER_COOKIE = 'elder_session';
const SESSION_DURATION = 60 * 60 * 24; // 24 hours

function makeToken() {
  return Buffer.from(`${Date.now()}-${Math.random().toString(36).substring(2)}`).toString('base64');
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: SESSION_DURATION,
  path: '/',
};

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 });
    }

    // Elder password — grants both admin and elder access
    if (ELDER_PASSWORD && password === ELDER_PASSWORD) {
      const res = NextResponse.json({ success: true, role: 'elder' });
      res.cookies.set(COOKIE_NAME, makeToken(), cookieOptions);
      res.cookies.set(ELDER_COOKIE, makeToken(), cookieOptions);
      return res;
    }

    // Regular admin password
    if (password === ADMIN_PASSWORD) {
      const res = NextResponse.json({ success: true, role: 'admin' });
      res.cookies.set(COOKIE_NAME, makeToken(), cookieOptions);
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
