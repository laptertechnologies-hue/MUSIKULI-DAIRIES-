export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized. Please log in to apply for a job.' }, { status: 401 });
    }

    const { jobTitle, resumeUrl, coverLetter, jobListingId } = await request.json();

    if (!jobTitle) {
      return NextResponse.json({ error: 'Job title is required' }, { status: 400 });
    }

    const application = await prisma.jobApplication.create({
      data: {
        userId: session.user.id as string,
        jobTitle,
        resumeUrl: resumeUrl || null,
        coverLetter: coverLetter || null,
        jobListingId: jobListingId || null,
      }
    });

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error('Job Application Error:', error);
    return NextResponse.json({ error: 'Failed to submit application. Please try again later.' }, { status: 500 });
  }
}
