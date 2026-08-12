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

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 });
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: SESSION_DURATION,
      path: '/',
    };

    const cookieStore = await cookies();

    // Elder password grants both admin and elder access
    if (ELDER_PASSWORD && password === ELDER_PASSWORD) {
      cookieStore.set(COOKIE_NAME, makeToken(), cookieOptions);
      cookieStore.set(ELDER_COOKIE, makeToken(), cookieOptions);
      return NextResponse.json({ success: true, role: 'elder' });
    }

    // Regular admin password
    if (password === ADMIN_PASSWORD) {
      cookieStore.set(COOKIE_NAME, makeToken(), cookieOptions);
      cookieStore.delete(ELDER_COOKIE); // clear any stale elder session
      return NextResponse.json({ success: true, role: 'admin' });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  cookieStore.delete(ELDER_COOKIE);
  return NextResponse.json({ success: true });
}
