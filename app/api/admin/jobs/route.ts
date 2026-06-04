import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function isAdmin(session: any) {
  return session?.user?.role === 'ADMIN';
}

// GET /api/admin/jobs — all job listings
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const jobs = await prisma.jobListing.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { applications: true } } },
  });

  return NextResponse.json({ jobs });
}

// POST /api/admin/jobs — create new job
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { title, location, type, description, requirements, salary, deadline, isActive } = body;

  if (!title || !location || !type || !description) {
    return NextResponse.json({ error: 'title, location, type, description are required' }, { status: 400 });
  }

  const job = await prisma.jobListing.create({
    data: {
      title,
      location,
      type,
      description,
      requirements: requirements || null,
      salary: salary || null,
      deadline: deadline ? new Date(deadline) : null,
      isActive: isActive !== undefined ? isActive : true,
    },
  });

  return NextResponse.json({ job });
}

// PUT /api/admin/jobs — update existing job
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { id, title, location, type, description, requirements, salary, deadline, isActive } = body;

  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const job = await prisma.jobListing.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(location !== undefined && { location }),
      ...(type !== undefined && { type }),
      ...(description !== undefined && { description }),
      ...(requirements !== undefined && { requirements }),
      ...(salary !== undefined && { salary }),
      ...(deadline !== undefined && { deadline: deadline ? new Date(deadline) : null }),
      ...(isActive !== undefined && { isActive }),
    },
  });

  return NextResponse.json({ job });
}

// DELETE /api/admin/jobs — permanent hard delete
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

  await prisma.jobListing.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
