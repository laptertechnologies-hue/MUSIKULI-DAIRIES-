import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function isAdmin(session: any) {
  return session?.user?.role === 'ADMIN';
}

// PUT /api/admin/quotes — update quote status
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, status } = await req.json();
  if (!id || !status) return NextResponse.json({ error: 'id and status are required' }, { status: 400 });

  const allowed = ['PENDING', 'RESPONDED', 'CLOSED'];
  if (!allowed.includes(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });

  const quote = await prisma.quoteRequest.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ quote });
}
