'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

function ApplyForm() {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get('job')?.replace(/-/g, ' ') || 'General Application';
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate API call to send email
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="text-center" style={{ padding: '4rem 1rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ color: 'var(--blue-900)', marginBottom: '1rem' }}>Application Sent!</h2>
        <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
          Thank you for applying for the <strong>{jobTitle}</strong> position. Our team will review your information and get back to you soon.
        </p>
        <Link href="/careers" className="btn btn-primary">Back to Careers</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: 'var(--blue-900)', marginBottom: '0.5rem' }}>Application Form</h2>
      <p style={{ color: 'var(--gray-500)', marginBottom: '2rem' }}>Applying for: <strong style={{ color: 'var(--blue-600)' }}>{jobTitle}</strong></p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Full Name</label>
          <input type="text" required placeholder="John Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
            <input type="email" required placeholder="john@example.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }} />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Phone Number</label>
            <input type="tel" required placeholder="+256..." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }} />
          </div>
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Years of Experience</label>
          <select required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
            <option value="">Select experience level</option>
            <option value="0-1">0 - 1 years</option>
            <option value="2-4">2 - 4 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Cover Letter / Personal Statement</label>
          <textarea rows={4} placeholder="Tell us why you're a great fit..." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)', resize: 'none' }}></textarea>
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>CV / Resume (Link or Text)</label>
          <input type="text" placeholder="Link to your CV (Google Drive/Dropbox)" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }} />
          <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '0.4rem' }}>For security, please provide a link to your hosted CV.</p>
        </div>

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="btn btn-primary" 
          style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
        >
          {status === 'submitting' ? 'Sending Application...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <div style={{ background: 'var(--gray-50)', minHeight: '100vh', paddingBottom: '5rem' }}>
      <div className="page-hero" style={{ marginBottom: '0' }}>
        <span className="section-tag">Careers</span>
        <h1>Work with Us</h1>
        <p>Please fill out the form below to submit your application to Musikuli Dairies.</p>
      </div>

      <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
        <Suspense fallback={<div className="text-center">Loading application form...</div>}>
          <ApplyForm />
        </Suspense>

        {/* Helper Contact Info */}
        <div className="text-center" style={{ marginTop: '3rem' }}>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
            Having trouble? Email us directly at <strong>musikuliimran@gmail.com</strong>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
             <Link href="/careers" style={{ color: 'var(--blue-600)', fontWeight: 600, textDecoration: 'none' }}>← View all jobs</Link>
          </div>
        </div>
      </div>

      {/* Bottom Visual Section */}
      <section style={{ marginTop: '5rem', padding: 'var(--section-pad)', background: 'white', borderTop: '1px solid var(--gray-100)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <span className="section-tag">Environment</span>
              <h2 className="section-title">Our Luwero Farm</h2>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
                Join a team working in the heart of Luwero. Our Nsozibirye zero-grazing farm is a state-of-the-art 
                facility dedicated to sustainable dairy production and farmer education.
              </p>
            </div>
            <div style={{ position: 'relative', height: '300px', borderRadius: '24px', overflow: 'hidden' }}>
              <Image src="/images/hero_farm.png" alt="Luwero Farm" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}