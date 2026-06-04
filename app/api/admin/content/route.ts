import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function isAdmin(session: any) {
  return session?.user?.role === 'ADMIN';
}

// GET /api/admin/content?page=home
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const page = req.nextUrl.searchParams.get('page') || 'home';
  const items = await prisma.siteContent.findMany({
    where: { page },
    orderBy: { key: 'asc' },
  });

  return NextResponse.json({ items });
}

// PUT /api/admin/content — update a content entry
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { key, value } = await req.json();
  if (!key || value === undefined) {
    return NextResponse.json({ error: 'key and value are required' }, { status: 400 });
  }

  const updated = await prisma.siteContent.upsert({
    where: { key },
    update: { value },
    create: { key, value, type: 'TEXT', page: key.split('.')[0], label: key },
  });

  return NextResponse.json({ item: updated });
}

// DELETE /api/admin/content — reset a content entry to its default fallback
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { key } = await req.json();
  if (!key) {
    return NextResponse.json({ error: 'key is required' }, { status: 400 });
  }

  await prisma.siteContent.update({
    where: { key },
    data: { value: '' },
  });

  return NextResponse.json({ success: true });
}
