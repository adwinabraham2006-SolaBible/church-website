export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function GET() {
  const elderPw = process.env.ELDER_PASSWORD;
  const adminPw = process.env.ADMIN_PASSWORD;
  return NextResponse.json({
    elder_set: Boolean(elderPw),
    elder_length: elderPw?.length ?? 0,
    admin_set: Boolean(adminPw),
    admin_length: adminPw?.length ?? 0,
  });
}
