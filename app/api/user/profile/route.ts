import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { phone } = await req.json();
    if (phone === undefined) {
      return NextResponse.json({ error: 'phone is required' }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: session.user.id as string },
      data: { phone },
    });

    return NextResponse.json({ success: true, phone: updated.phone });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
