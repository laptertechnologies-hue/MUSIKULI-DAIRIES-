import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/jobs — public, active non-expired job listings
export async function GET() {
  const now = new Date();
  const jobs = await prisma.jobListing.findMany({
    where: {
      isActive: true,
      OR: [
        { deadline: null },
        { deadline: { gte: now } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ jobs });
}
