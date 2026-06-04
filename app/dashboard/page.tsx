export const dynamic = 'force-dynamic';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/login');
  }

  const userId = session.user.id as string;
  const now = new Date();

  // Fetch user quotes, applications, and all active job listings from the database
  const [quotes, applications, activeJobListings, dbUser] = await Promise.all([
    prisma.quoteRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.jobApplication.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { jobListing: { select: { title: true } } },
    }),
    prisma.jobListing.findMany({
      where: {
        isActive: true,
        OR: [{ deadline: null }, { deadline: { gte: now } }],
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { phone: true },
    }),
  ]);

  // Convert dates to ISO strings to prevent serialization errors between Server and Client Components
  const serializedQuotes = quotes.map(q => ({
    ...q,
    createdAt: q.createdAt.toISOString(),
  }));

  const serializedApplications = applications.map(a => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
  }));

  const serializedJobs = activeJobListings.map(j => ({
    ...j,
    deadline: j.deadline ? j.deadline.toISOString() : null,
  }));

  return (
    <DashboardClient
      session={session}
      initialQuotes={serializedQuotes}
      initialApplications={serializedApplications}
      activeJobListings={serializedJobs}
      initialPhone={dbUser?.phone || ''}
    />
  );
}
