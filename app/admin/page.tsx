export const dynamic = 'force-dynamic';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import AdminClient from './AdminClient';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) redirect('/login');

  if (session.user.role !== 'ADMIN') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem' }}>🔒</div>
        <h1 style={{ fontSize: '2rem', color: 'var(--blue-900)', fontWeight: 800 }}>Access Denied</h1>
        <p style={{ color: 'var(--gray-600)' }}>You must be an administrator to view this page.</p>
        <a href="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Return Home</a>
      </div>
    );
  }

  // Fetch all data for the admin dashboard
  const [quoteRequests, jobApplications, jobListings, users, contentItems, brokerListings] = await Promise.all([
    prisma.quoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.jobApplication.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        jobListing: { select: { title: true } },
      },
    }),
    prisma.jobListing.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { applications: true } } },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    prisma.siteContent.findMany({ orderBy: [{ page: 'asc' }, { key: 'asc' }] }),
    prisma.brokerListing.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true, phone: true } },
        orders: {
          include: { buyer: { select: { name: true, email: true } } },
          orderBy: { createdAt: 'desc' }
        }
      }
    }),
  ]);

  const now = new Date();
  const activeJobs = jobListings.filter(
    (j) => j.isActive && (!j.deadline || j.deadline >= now)
  ).length;

  return (
    <AdminClient
      adminName={session.user.name || 'Admin'}
      adminEmail={session.user.email || ''}
      stats={{
        quotes: quoteRequests.length,
        applications: jobApplications.length,
        activeJobs,
        users: users.length,
      }}
      quoteRequests={JSON.parse(JSON.stringify(quoteRequests))}
      jobApplications={JSON.parse(JSON.stringify(jobApplications))}
      jobListings={JSON.parse(JSON.stringify(jobListings))}
      contentItems={JSON.parse(JSON.stringify(contentItems))}
      users={JSON.parse(JSON.stringify(users))}
      brokerListings={JSON.parse(JSON.stringify(brokerListings))}
    />
  );
}
