import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const SECRET = process.env.ADMIN_SESSION_SECRET ?? '';

export function signSession(role: 'admin' | 'elder'): string {
  if (!SECRET) throw new Error('ADMIN_SESSION_SECRET is not set');
  const nonce = crypto.randomBytes(8).toString('hex');
  const payload = `${role}:${nonce}`;
  const mac = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return `${payload}.${mac}`;
}

function verifyRole(cookieValue: string | undefined, role: string): boolean {
  if (!SECRET || !cookieValue) return false;
  const i = cookieValue.lastIndexOf('.');
  if (i < 0) return false;
  const payload = cookieValue.slice(0, i);
  const mac = cookieValue.slice(i + 1);
  if (!payload.startsWith(`${role}:`)) return false;
  try {
    const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
    const a = Buffer.from(mac, 'hex');
    const b = Buffer.from(expected, 'hex');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function requireAdmin(req: NextRequest): NextResponse | null {
  return verifyRole(req.cookies.get('admin_session')?.value, 'admin')
    ? null
    : NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export function requireElder(req: NextRequest): NextResponse | null {
  return verifyRole(req.cookies.get('elder_session')?.value, 'elder')
    ? null
    : NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
