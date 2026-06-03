export const dynamic = 'force-dynamic';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  if (session.user.role !== 'ADMIN') {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', minHeight: '60vh' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--blue-900)' }}>Access Denied</h1>
        <p style={{ marginTop: '1rem', color: 'var(--gray-600)' }}>You must be an administrator to view this page.</p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>Return Home</Link>
      </div>
    );
  }

  const quoteRequests = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  });

  return (
    <div style={{ background: 'var(--gray-50)', minHeight: '100vh', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', color: 'var(--blue-900)', fontWeight: 800 }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--gray-600)' }}>Welcome, {session.user.name || 'Admin'}!</p>
          </div>
          <Link href="/api/auth/signout" className="btn btn-outline">Sign Out</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          {/* Quotes Panel */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--blue-900)', marginBottom: '1.5rem', borderBottom: '2px solid var(--gray-100)', paddingBottom: '0.75rem' }}>
              Recent Quote Requests
            </h2>
            
            {quoteRequests.length === 0 ? (
              <p style={{ color: 'var(--gray-500)', fontStyle: 'italic' }}>No quote requests found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {quoteRequests.map(quote => (
                  <div key={quote.id} style={{ border: '1px solid var(--gray-200)', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem', color: 'var(--blue-900)' }}>{quote.product}</strong>
                      <span style={{ fontSize: '0.75rem', background: 'var(--gold-100)', color: 'var(--gold-600)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontWeight: 700 }}>
                        {quote.status}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                      <div>
                        <strong>From:</strong> {quote.user.name} ({quote.user.email})<br/>
                        <strong>Date:</strong> {new Date(quote.createdAt).toLocaleString()}
                      </div>
                      <div>
                        <strong>Quantity:</strong> {quote.quantity || 'N/A'}<br/>
                      </div>
                    </div>
                    <div style={{ background: 'var(--gray-50)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', color: 'var(--gray-700)', whiteSpace: 'pre-wrap' }}>
                      {quote.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Site Content CMS Panel */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--blue-900)', marginBottom: '1.5rem', borderBottom: '2px solid var(--gray-100)', paddingBottom: '0.75rem' }}>
              Website Content Manager
            </h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              This section will allow you to edit dynamic text and images across the website.
            </p>
            <div style={{ padding: '2rem', border: '1px dashed var(--gray-300)', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ color: 'var(--blue-600)', fontWeight: 600 }}>CMS Interface (Under Construction)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
