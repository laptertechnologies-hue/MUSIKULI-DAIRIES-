'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const FORMSPREE_ID = 'xwpbdgek'; // Using the same as quote page

export default function ApplyForm() {
  const searchParams = useSearchParams();
  const jobParam = searchParams.get('job');
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    if (jobParam) {
      // Map job param to full title
      const jobMap: Record<string, string> = {
        'dairy-farm-manager': 'Dairy Farm Manager',
        'procurement-officer': 'Agro-Produce Procurement Officer',
        'logistics-assistant': 'Logistics & Distribution Assistant',
        'community-coordinator': 'Community Outreach Coordinator'
      };
      setJobTitle(jobMap[jobParam] || jobParam.replace(/-/g, ' '));
    }
  }, [jobParam]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setError('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success">
        <div className="form-success-icon" style={{ display: 'inline-block', marginBottom: '1rem' }}>
          <img src="/icons/award.svg" alt="Success" width={48} height={48} />
        </div>
        <h3>Application Sent!</h3>
        <p>Thank you for applying. We will review your application and get back to you soon.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn btn-primary"
          style={{ marginTop: '1.5rem' }}
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} id="apply-form" noValidate>
      <h3 style={{ fontSize: '1.35rem', color: 'var(--blue-900)', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
        Job Application Form
      </h3>

      <input type="hidden" name="_subject" value={`New Job Application: ${jobTitle || 'General'}`} />
      <input type="hidden" name="_replyto" value="info@musikulidairies.com" />

      <div className="form-grid">
        <div className="form-group full">
          <label htmlFor="apply-position">Position Applying For *</label>
          <input 
            id="apply-position" 
            name="position" 
            type="text" 
            placeholder="e.g. Dairy Farm Manager" 
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="apply-name">Full Name *</label>
          <input id="apply-name" name="name" type="text" placeholder="Your full name" required />
        </div>
        <div className="form-group">
          <label htmlFor="apply-email">Email Address *</label>
          <input id="apply-email" name="email" type="email" placeholder="your@email.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="apply-phone">Phone Number *</label>
          <input id="apply-phone" name="phone" type="tel" placeholder="+256 xxx xxx xxx" required />
        </div>
        <div className="form-group">
          <label htmlFor="apply-location">Current Location *</label>
          <input id="apply-location" name="location" type="text" placeholder="City / District" required />
        </div>
        
        <div className="form-group full">
          <label htmlFor="apply-experience">Brief summary of relevant experience *</label>
          <textarea
            id="apply-experience"
            name="experience"
            placeholder="Tell us about your background and why you're a good fit for this role..."
            required
            rows={5}
          />
        </div>

        <div className="form-group full">
          <label htmlFor="apply-portfolio">LinkedIn Profile or Portfolio Link</label>
          <input id="apply-portfolio" name="portfolio" type="url" placeholder="https://..." />
        </div>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.75rem 1rem', color: '#dc2626', fontSize: '0.875rem', marginBottom: '1rem' }}>
          ⚠️ {error}
        </div>
      )}

      <button type="submit" className="form-submit" disabled={loading}>
        {loading ? 'Sending...' : 'Submit Application'}
      </button>

      <p style={{ fontSize: '0.78rem', color: 'var(--gray-500)', textAlign: 'center', marginTop: '0.75rem' }}>
        Note: If you have a CV, please email it directly to info@musikulidairies.com with your name in the subject line.
      </p>
    </form>
  );
}
