'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

function ApplyFormContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const jobParam = searchParams.get('job');
  
  const [jobTitle, setJobTitle] = useState(jobParam || '');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      jobTitle: data.get('jobTitle'),
      resumeUrl: data.get('resumeUrl'),
      coverLetter: data.get('coverLetter'),
    };

    try {
      const res = await fetch('/api/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ background: 'var(--gray-50)', minHeight: '80vh', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', borderRadius: '16px', padding: '3rem', boxShadow: 'var(--shadow-sm)' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--blue-900)', marginBottom: '1rem', textAlign: 'center' }}>Job Application</h1>
        
        {status === 'unauthenticated' ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
             <Image src="/icons/target.svg" alt="" width={48} height={48} style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--blue-900)', marginBottom: '1rem' }}>Account Required</h3>
            <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>Please log in or register an account to apply for open positions.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link href="/login" className="btn btn-primary">Log In</Link>
              <Link href="/register" className="btn btn-outline">Register</Link>
            </div>
          </div>
        ) : submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}><Image src="/icons/award.svg" alt="Success" width={48} height={48} /></div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--blue-900)', marginBottom: '1rem' }}>Application Received!</h3>
            <p style={{ color: 'var(--gray-600)' }}>Thank you, {session?.user?.name}. Your application for <strong>{jobTitle}</strong> has been submitted successfully. We will review it and contact you soon.</p>
            <Link href="/careers" className="btn btn-outline" style={{ marginTop: '2rem', display: 'inline-block' }}>Back to Careers</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem', textAlign: 'center' }}>
              Applying as <strong>{session?.user?.name}</strong> ({session?.user?.email})
            </p>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>Position / Job Title</label>
              <input 
                type="text" 
                name="jobTitle"
                required
                defaultValue={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>Resume/CV Link (Google Drive, Dropbox, etc.)</label>
              <input 
                type="url" 
                name="resumeUrl"
                placeholder="https://"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>Cover Letter</label>
              <textarea 
                name="coverLetter"
                rows={5}
                placeholder="Tell us why you're a great fit for this role..."
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
              />
            </div>

            {error && (
              <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', padding: '0.8rem', background: 'var(--blue-600)', color: 'white', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '1rem' }}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Form...</div>}>
      <ApplyFormContent />
    </Suspense>
  );
}
