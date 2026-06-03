export const dynamic = 'force-dynamic';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect('/login');

  const userId = session.user.id as string;

  const [quotes, applications] = await Promise.all([
    prisma.quoteRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.jobApplication.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { jobListing: { select: { title: true } } },
    }),
  ]);

  const quoteStatusColor: Record<string, string> = {
    PENDING: '#f59e0b', RESPONDED: '#3b82f6', CLOSED: '#6b7280',
  };
  const appStatusColor: Record<string, string> = {
    PENDING: '#f59e0b', REVIEWED: '#8b5cf6', ACCEPTED: '#10b981', REJECTED: '#ef4444',
  };

  function formatDate(iso: string | Date) {
    return new Date(iso).toLocaleDateString('en-UG', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  const initials = session.user.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'U';

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', paddingTop: '6rem', paddingBottom: '4rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', borderRadius: '20px', padding: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'white' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '3px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, flexShrink: 0 }}>
            {session.user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={session.user.image} alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
            ) : initials}
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Welcome, {session.user.name?.split(' ')[0] || 'there'}!</h1>
            <p style={{ opacity: 0.7, margin: '0.25rem 0 0', fontSize: '0.9rem' }}>{session.user.email}</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/quote" className="btn btn-primary" style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}>
              + Request a Quote
            </Link>
            <Link href="/careers" style={{ padding: '0.55rem 1.1rem', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.4)', color: 'white', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
              Browse Jobs
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.25rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#3b82f6' }}>{quotes.length}</div>
            <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>Quote Requests Submitted</div>
          </div>
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.25rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8b5cf6' }}>{applications.length}</div>
            <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>Job Applications Submitted</div>
          </div>
        </div>

        {/* Quote Requests */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>💬 My Quote Requests</h2>
            <Link href="/quote" style={{ fontSize: '0.82rem', color: '#1a56db', fontWeight: 600, textDecoration: 'none' }}>+ New Quote</Link>
          </div>
          {quotes.length === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: '#94a3b8' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</div>
              <p style={{ margin: 0 }}>No quote requests yet.</p>
              <Link href="/quote" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.6rem 1.4rem', fontSize: '0.875rem' }}>Request a Quote</Link>
            </div>
          ) : quotes.map((q, i) => (
            <div key={q.id} style={{ padding: '1rem 1.5rem', borderBottom: i < quotes.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{q.product}</div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>📅 {formatDate(q.createdAt)}{q.quantity ? ` · Qty: ${q.quantity}` : ''}</div>
              </div>
              <span style={{ display: 'inline-block', padding: '0.2rem 0.7rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, color: 'white', background: quoteStatusColor[q.status] || '#6b7280', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {q.status}
              </span>
            </div>
          ))}
        </div>

        {/* Job Applications */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>📋 My Job Applications</h2>
            <Link href="/careers" style={{ fontSize: '0.82rem', color: '#1a56db', fontWeight: 600, textDecoration: 'none' }}>Browse Jobs</Link>
          </div>
          {applications.length === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: '#94a3b8' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</div>
              <p style={{ margin: 0 }}>You haven&apos;t applied for any jobs yet.</p>
              <Link href="/careers" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.6rem 1.4rem', fontSize: '0.875rem' }}>Browse Open Positions</Link>
            </div>
          ) : applications.map((app, i) => (
            <div key={app.id} style={{ padding: '1rem 1.5rem', borderBottom: i < applications.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{app.jobListing?.title || app.jobTitle}</div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>📅 Applied {formatDate(app.createdAt)}</div>
                {app.resumeUrl && (
                  <a href={app.resumeUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.78rem', color: '#1a56db', display: 'inline-block', marginTop: '0.25rem' }}>📄 Resume</a>
                )}
              </div>
              <span style={{ display: 'inline-block', padding: '0.2rem 0.7rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, color: 'white', background: appStatusColor[app.status] || '#6b7280', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {app.status}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
