import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SECRET = process.env.ADMIN_SESSION_SECRET ?? '';

function hexToBytes(hex: string): ArrayBuffer {
  const pairs = hex.match(/.{2}/g);
  if (!pairs) return new ArrayBuffer(0);
  const arr = new Uint8Array(pairs.map(b => parseInt(b, 16)));
  return arr.buffer as ArrayBuffer;
}

async function verifySignedCookie(cookieValue: string | undefined, role: string): Promise<boolean> {
  if (!SECRET || !cookieValue) return false;
  const i = cookieValue.lastIndexOf('.');
  if (i < 0) return false;
  const payload = cookieValue.slice(0, i);
  const mac = cookieValue.slice(i + 1);
  if (!payload.startsWith(`${role}:`)) return false;
  try {
    const encoder = new TextEncoder();
    const key = await globalThis.crypto.subtle.importKey(
      'raw', encoder.encode(SECRET),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    return await globalThis.crypto.subtle.verify(
      'HMAC', key, hexToBytes(mac), encoder.encode(payload)
    );
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAdminApi = pathname.startsWith('/api/admin/') && pathname !== '/api/admin/auth';

  if (isAdminPage || isAdminApi) {
    const sessionCookie = request.cookies.get('admin_session')?.value;
    const valid = await verifySignedCookie(sessionCookie, 'admin');

    if (!valid) {
      if (isAdminApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
