'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const jobOpportunities = [
  {
    id: 'dairy-farm-manager',
    title: 'Dairy Farm Manager',
    location: 'Luwero, Uganda',
    type: 'Full-time',
    description: 'Oversee daily operations of our Nsozibirye zero-grazing dairy farm, ensuring optimal production and animal welfare.',
  },
  {
    id: 'procurement-officer',
    title: 'Agro-Produce Procurement Officer',
    location: 'Luwero, Nakaseke, Nakasongola',
    type: 'Full-time',
    description: 'Manage relationships with smallholder farmers and ensure timely procurement of maize, beans, rice, and groundnuts.',
  },
  {
    id: 'logistics-assistant',
    title: 'Logistics & Distribution Assistant',
    location: 'Luwero, Uganda',
    type: 'Full-time',
    description: 'Coordinate the efficient transport and distribution of dairy products and agro-produce to various markets.',
  },
];

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
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Full Name</label>
          <input type="text" required placeholder="John Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }} />
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

        {/* Email and Phone will now be in their own grid cells */}
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
          <input type="email" required placeholder="john@example.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }} />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Phone Number</label>
          <input type="tel" required placeholder="+256..." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }} />
        </div>

        {/* These should span full width */}
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Cover Letter / Personal Statement</label>
          <textarea rows={4} placeholder="Tell us why you're a great fit..." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)', resize: 'none' }}></textarea>
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
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
      <div className="page-hero fade-up" style={{ marginBottom: '0' }}>
        <span className="section-tag">Careers</span>
        <h1>Work with Us</h1>
        <p>Explore current openings and join our team in building Uganda&apos;s agri-dairy future.</p>
      </div>

      {/* ===== JOBS LIST ===== */}
      <div className="container fade-up" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10, marginBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {jobOpportunities.map((job) => (
            <div key={job.id} className="fade-up" style={{ background: 'white', border: '1px solid var(--gray-100)', borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--blue-900)', marginBottom: '0.5rem' }}>{job.title}</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '1.25rem', display: 'flex', gap: '1rem' }}>
                <span>📍 {job.location}</span>
                <span>💼 {job.type}</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--gray-600)', lineHeight: 1.7, flexGrow: 1 }}>{job.description}</p>
              <Link href={`/careers?job=${job.id}#apply-form`} className="btn btn-primary" style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}>
                Apply Now →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ===== APPLICATION FORM ===== */}
      <div className="container fade-up" id="apply-form" style={{ marginBottom: '5rem', position: 'relative', zIndex: 10 }}>
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
      <section className="fade-up" style={{ marginTop: '5rem', padding: 'var(--section-pad)', background: 'white', borderTop: '1px solid var(--gray-100)' }}>
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