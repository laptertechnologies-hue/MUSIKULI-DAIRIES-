import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function isAdmin(session: any) {
  return session?.user?.role === 'ADMIN';
}

// GET /api/admin/applications — all job applications
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const applications = await prisma.jobApplication.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { id: true, name: true, email: true } },
      jobListing: { select: { id: true, title: true } },
    },
  });

  return NextResponse.json({ applications });
}

// PUT /api/admin/applications — update application status
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, status } = await req.json();
  if (!id || !status) return NextResponse.json({ error: 'id and status are required' }, { status: 400 });

  const allowed = ['PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED'];
  if (!allowed.includes(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });

  const application = await prisma.jobApplication.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ application });
}
