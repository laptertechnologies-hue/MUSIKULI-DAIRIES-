'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Mail,
  DollarSign,
  MapPin,
  FileDown,
  LogOut,
  User
} from 'lucide-react';

interface QuoteRequest {
  id: string;
  product: string;
  quantity: string | null;
  message: string;
  status: string;
  createdAt: string | Date;
}

interface JobListing {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string | null;
  salary: string | null;
  deadline: string | Date | null;
}

interface JobApplication {
  id: string;
  jobTitle: string;
  resumeUrl: string | null;
  coverLetter: string | null;
  status: string;
  createdAt: string | Date;
  jobListing?: {
    title: string;
  } | null;
}

interface DashboardClientProps {
  session: any;
  initialQuotes: QuoteRequest[];
  initialApplications: JobApplication[];
  activeJobListings: JobListing[];
  initialPhone: string;
}

export default function DashboardClient({
  session,
  initialQuotes,
  initialApplications,
  activeJobListings,
  initialPhone,
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'quote' | 'settings'>('overview');
  const [quotes, setQuotes] = useState<QuoteRequest[]>(initialQuotes);
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);
  const [phone, setPhone] = useState(initialPhone);

  // Profile Settings State
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState('');
  const [settingsError, setSettingsError] = useState('');
  
  // Job Expansion & Application States
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  
  // Quote Form State
  const [quoteProduct, setQuoteProduct] = useState('');
  const [quoteQuantity, setQuoteQuantity] = useState('');
  const [quoteMessage, setQuoteMessage] = useState('');
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState('');
  const [quoteError, setQuoteError] = useState('');

  // Application Form State
  const [resumeUrl, setResumeUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [appLoading, setAppLoading] = useState(false);
  const [appSuccess, setAppSuccess] = useState('');
  const [appError, setAppError] = useState('');

  const initials = session?.user?.name
    ? session.user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  const formatDate = (dateInput: string | Date) => {
    return new Date(dateInput).toLocaleDateString('en-UG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysLeft = (deadlineInput: string | Date | null) => {
    if (!deadlineInput) return null;
    const now = new Date();
    const deadline = new Date(deadlineInput);
    const diff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diff <= 0) return 'Closing today';
    if (diff === 1) return '1 day left';
    return `${diff} days left`;
  };

  const getStatusBadge = (status: string, type: 'quote' | 'job') => {
    let bg = '#fee2e2';
    let text = '#b91c1c';
    let icon = <XCircle size={14} />;

    if (status === 'PENDING') {
      bg = '#fef3c7';
      text = '#d97706';
      icon = <Clock size={14} />;
    } else if (status === 'RESPONDED' || status === 'REVIEWED') {
      bg = '#e0f2fe';
      text = '#0369a1';
      icon = <Clock size={14} />;
    } else if (status === 'ACCEPTED' || status === 'CLOSED') {
      bg = '#d1fae5';
      text = '#047857';
      icon = <CheckCircle size={14} />;
    }

    return (
      <span style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '0.25rem', 
        padding: '0.25rem 0.6rem', 
        borderRadius: '100px', 
        fontSize: '0.72rem', 
        fontWeight: 700, 
        color: text, 
        backgroundColor: bg,
        whiteSpace: 'nowrap'
      }}>
        {icon}
        {status}
      </span>
    );
  };

  // Submit Quote Request
  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteLoading(true);
    setQuoteError('');
    setQuoteSuccess('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: quoteProduct,
          quantity: quoteQuantity,
          message: quoteMessage
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit quote request');
      }

      setQuoteSuccess('Quote request submitted and sent to info@musikulidairies.com successfully!');
      setQuotes([data.quote, ...quotes]);
      
      // Reset form
      setQuoteProduct('');
      setQuoteQuantity('');
      setQuoteMessage('');
      
      // Redirect to overview after short delay
      setTimeout(() => {
        setActiveTab('overview');
        setQuoteSuccess('');
      }, 3000);

    } catch (err: any) {
      setQuoteError(err.message || 'An error occurred. Please try again.');
    } finally {
      setQuoteLoading(false);
    }
  };

  // Submit Job Application
  const handleAppSubmit = async (e: React.FormEvent, job: JobListing) => {
    e.preventDefault();
    setAppLoading(true);
    setAppError('');
    setAppSuccess('');

    try {
      const res = await fetch('/api/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: job.title,
          resumeUrl,
          coverLetter,
          jobListingId: job.id
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setAppSuccess(`Applied for ${job.title} successfully!`);
      // Update local state
      const newApp: JobApplication = {
        id: data.application?.id || Math.random().toString(),
        jobTitle: job.title,
        resumeUrl,
        coverLetter,
        status: 'PENDING',
        createdAt: new Date(),
        jobListing: { title: job.title }
      };
      setApplications([newApp, ...applications]);

      // Reset application state
      setResumeUrl('');
      setCoverLetter('');
      setApplyingJobId(null);

      // Redirect to overview after short delay
      setTimeout(() => {
        setActiveTab('overview');
        setAppSuccess('');
      }, 3000);

    } catch (err: any) {
      setAppError(err.message || 'An error occurred. Please try again.');
    } finally {
      setAppLoading(false);
    }
  };

  // Submit Profile Settings
  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsLoading(true);
    setSettingsError('');
    setSettingsSuccess('');

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      setSettingsSuccess('✅ Telephone contact saved successfully!');
      setTimeout(() => setSettingsSuccess(''), 4000);
    } catch (err: any) {
      setSettingsError(err.message || 'An error occurred. Please try again.');
    } finally {
      setSettingsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: '6rem', paddingBottom: '4rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Banner */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)', 
          borderRadius: '24px', 
          padding: '2.5rem', 
          marginBottom: '2rem', 
          display: 'flex', 
          flexDirection: 'row',
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '1.5rem', 
          color: 'white',
          boxShadow: '0 10px 25px -5px rgba(30, 58, 138, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ 
              width: 72, 
              height: 72, 
              borderRadius: '50%', 
              background: 'rgba(255,255,255,0.12)', 
              border: '3px solid rgba(255,255,255,0.25)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '1.75rem', 
              fontWeight: 800, 
              flexShrink: 0 
            }}>
              {session?.user?.image ? (
                <img src={session.user.image} alt="avatar" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover' }} />
              ) : initials}
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.65, fontWeight: 700 }}>User Portal</span>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.1rem 0 0' }}>Welcome, {session?.user?.name?.split(' ')[0] || 'Member'}!</h1>
              <p style={{ opacity: 0.75, margin: '0.2rem 0 0', fontSize: '0.9rem' }}>{session?.user?.email}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setActiveTab('quote')} 
              className={`btn ${activeTab === 'quote' ? 'btn-outline' : 'btn-primary'}`} 
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', color: activeTab === 'quote' ? 'white' : undefined, borderColor: activeTab === 'quote' ? 'rgba(255,255,255,0.6)' : undefined }}
            >
              + Request a Quote
            </button>
            <button 
              onClick={() => setActiveTab('jobs')} 
              className={`btn ${activeTab === 'jobs' ? 'btn-outline' : 'btn-primary'}`}
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', color: activeTab === 'jobs' ? 'white' : undefined, borderColor: activeTab === 'jobs' ? 'rgba(255,255,255,0.6)' : undefined }}
            >
              Browse Jobs
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }}>
          
          {/* Sidebar Menu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={() => setActiveTab('overview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'overview' ? 'white' : 'transparent',
                color: activeTab === 'overview' ? '#1e3a8a' : '#64748b',
                fontWeight: activeTab === 'overview' ? 700 : 500,
                fontSize: '0.9rem',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: activeTab === 'overview' ? '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <LayoutDashboard size={18} />
              Portal Overview
            </button>
            <button 
              onClick={() => setActiveTab('quote')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'quote' ? 'white' : 'transparent',
                color: activeTab === 'quote' ? '#1e3a8a' : '#64748b',
                fontWeight: activeTab === 'quote' ? 700 : 500,
                fontSize: '0.9rem',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: activeTab === 'quote' ? '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <FileText size={18} />
              Request a Quote
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'jobs' ? 'white' : 'transparent',
                color: activeTab === 'jobs' ? '#1e3a8a' : '#64748b',
                fontWeight: activeTab === 'jobs' ? 700 : 500,
                fontSize: '0.9rem',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: activeTab === 'jobs' ? '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <Briefcase size={18} />
              Browse & Apply Jobs
            </button>

            <button 
              onClick={() => setActiveTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'settings' ? 'white' : 'transparent',
                color: activeTab === 'settings' ? '#1e3a8a' : '#64748b',
                fontWeight: activeTab === 'settings' ? 700 : 500,
                fontSize: '0.9rem',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: activeTab === 'settings' ? '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <User size={18} />
              Profile Settings
            </button>

            <a 
              href="/api/auth/signout"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                border: 'none',
                background: 'transparent',
                color: '#dc2626',
                fontWeight: 500,
                fontSize: '0.9rem',
                textAlign: 'left',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginTop: '1.5rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fee2e2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <LogOut size={18} />
              Log Out
            </a>
          </div>

          {/* Main Content Area */}
          <div style={{ flex: 1 }}>
            
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Warning callout banner if phone number is missing */}
                {!phone && (
                  <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '16px', padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ width: '40px', height: '40px', background: '#fef3c7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', fontSize: '1.2rem', flexShrink: 0 }}>⚠️</div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: '#92400e', fontSize: '0.9rem', display: 'block', marginBottom: '0.15rem' }}>Telephone Contact Required</strong>
                      <p style={{ color: '#b45309', fontSize: '0.825rem', margin: 0, lineHeight: 1.5 }}>You haven't registered a contact phone number yet. Please add a telephone contact to your account so our team can easily reach out regarding your requests.</p>
                    </div>
                    <button onClick={() => setActiveTab('settings')} style={{ padding: '0.5rem 1rem', background: '#d97706', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }}>
                      Add Phone Number
                    </button>
                  </div>
                )}
                
                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Quote Requests</span>
                      <div style={{ padding: '0.5rem', background: '#dbeafe', borderRadius: '10px', color: '#1e40af' }}>
                        <FileText size={18} />
                      </div>
                    </div>
                    <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1e293b', marginTop: '0.75rem' }}>{quotes.length}</div>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>Total requests submitted</p>
                  </div>

                  <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Job Applications</span>
                      <div style={{ padding: '0.5rem', background: '#f3e8ff', borderRadius: '10px', color: '#6b21a8' }}>
                        <Briefcase size={18} />
                      </div>
                    </div>
                    <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1e293b', marginTop: '0.75rem' }}>{applications.length}</div>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>Total positions applied for</p>
                  </div>
                </div>

                {/* Quote Requests Table */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>💬 My Quote Requests</h2>
                    <button onClick={() => setActiveTab('quote')} style={{ border: 'none', background: 'none', color: '#2563eb', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>+ New Quote</button>
                  </div>
                  {quotes.length === 0 ? (
                    <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#94a3b8' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📭</div>
                      <p style={{ margin: 0, fontSize: '0.9rem' }}>No quote requests found.</p>
                      <button onClick={() => setActiveTab('quote')} className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>Create Quote Request</button>
                    </div>
                  ) : (
                    <div>
                      {quotes.map((q, idx) => (
                        <div key={q.id} style={{ 
                          padding: '1.25rem 1.5rem', 
                          borderBottom: idx < quotes.length - 1 ? '1px solid #f1f5f9' : 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '1rem'
                        }}>
                          <div>
                            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{q.product}</div>
                            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span>📅 {formatDate(q.createdAt)}</span>
                              {q.quantity && <span>• Qty: {q.quantity}</span>}
                            </div>
                            <p style={{ color: '#475569', fontSize: '0.85rem', margin: '0.4rem 0 0', fontStyle: 'italic', maxWidth: '480px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              &ldquo;{q.message}&rdquo;
                            </p>
                          </div>
                          <div>
                            {getStatusBadge(q.status, 'quote')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Job Applications Table */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>📋 My Job Applications</h2>
                    <button onClick={() => setActiveTab('jobs')} style={{ border: 'none', background: 'none', color: '#2563eb', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Browse Jobs</button>
                  </div>
                  {applications.length === 0 ? (
                    <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#94a3b8' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📭</div>
                      <p style={{ margin: 0, fontSize: '0.9rem' }}>You haven&apos;t applied for any jobs yet.</p>
                      <button onClick={() => setActiveTab('jobs')} className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>Browse Open Jobs</button>
                    </div>
                  ) : (
                    <div>
                      {applications.map((app, idx) => (
                        <div key={app.id} style={{ 
                          padding: '1.25rem 1.5rem', 
                          borderBottom: idx < applications.length - 1 ? '1px solid #f1f5f9' : 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '1rem'
                        }}>
                          <div>
                            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{app.jobListing?.title || app.jobTitle}</div>
                            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <span>📅 Applied: {formatDate(app.createdAt)}</span>
                              {app.resumeUrl && (
                                <a 
                                  href={app.resumeUrl} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                                >
                                  <ExternalLink size={12} /> CV Link
                                </a>
                              )}
                            </div>
                          </div>
                          <div>
                            {getStatusBadge(app.status, 'job')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB: REQUEST A QUOTE */}
            {activeTab === 'quote' && (
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <FileText size={22} style={{ color: '#1e3a8a' }} />
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Request a Quote</h2>
                </div>
                
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.5' }}>
                  Submit a quote request directly from your dashboard. Once submitted, our team will receive your request and email a formal quotation to you. It will also be tracked right here in your portal.
                </p>

                {quoteSuccess && (
                  <div style={{ background: '#ecfdf5', color: '#047857', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                    ✅ {quoteSuccess}
                  </div>
                )}

                {quoteError && (
                  <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                    ❌ {quoteError}
                  </div>
                )}

                <form onSubmit={handleQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>Product / Service Needed</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Raw Milk Supply, Yogurt, Transportation"
                        value={quoteProduct}
                        onChange={(e) => setQuoteProduct(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>Quantity / Volume (Opt.)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 500 Liters, 10 Crates"
                        value={quoteQuantity}
                        onChange={(e) => setQuoteQuantity(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>Your Message / Specifications</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Please specify delivery schedules, packing types, location, or other requirements..."
                      value={quoteMessage}
                      onChange={(e) => setQuoteMessage(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={quoteLoading}
                    className="btn btn-primary"
                    style={{ padding: '0.8rem', width: '180px', marginTop: '0.5rem', justifyContent: 'center' }}
                  >
                    {quoteLoading ? 'Submitting...' : 'Send Request'}
                  </button>
                </form>
              </div>
            )}

            {/* TAB: BROWSE JOBS */}
            {activeTab === 'jobs' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <Briefcase size={22} style={{ color: '#1e3a8a' }} />
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Open Career Positions</h2>
                </div>

                {appSuccess && (
                  <div style={{ background: '#ecfdf5', color: '#047857', padding: '1rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 500 }}>
                    ✅ {appSuccess}
                  </div>
                )}

                {appError && (
                  <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 500 }}>
                    ❌ {appError}
                  </div>
                )}

                {activeJobListings.length === 0 ? (
                  <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center', color: '#94a3b8' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
                    <h3 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>No Active Openings</h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>There are no active job openings at this time. Check back later!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {activeJobListings.map((job) => {
                      const isExpanded = expandedJobId === job.id;
                      const isApplying = applyingJobId === job.id;
                      const daysLeftText = getDaysLeft(job.deadline);

                      return (
                        <div key={job.id} style={{ 
                          background: 'white', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '16px', 
                          padding: '1.5rem',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                          transition: 'all 0.2s'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                            <div>
                              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>{job.title}</h3>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginTop: '0.4rem', fontSize: '0.8rem', color: '#64748b' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><MapPin size={13} /> {job.location}</span>
                                <span>•</span>
                                <span style={{ padding: '0.15rem 0.5rem', background: '#eff6ff', color: '#2563eb', borderRadius: '100px', fontWeight: 700, fontSize: '0.72rem' }}>{job.type}</span>
                                {job.salary && (
                                  <>
                                    <span>•</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><DollarSign size={13} /> {job.salary}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            <button
                              onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                              style={{ border: 'none', background: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}
                            >
                              {isExpanded ? 'Hide Details' : 'Show Details'}
                              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </button>
                          </div>

                          {isExpanded && (
                            <div style={{ marginTop: '1.25rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                              <p style={{ color: '#334155', fontSize: '0.88rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', margin: '0 0 1rem' }}>
                                {job.description}
                              </p>

                              {job.requirements && (
                                <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem' }}>
                                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.5rem' }}>Requirements:</h4>
                                  <p style={{ color: '#475569', fontSize: '0.82rem', lineHeight: '1.5', margin: 0, whiteSpace: 'pre-wrap' }}>
                                    {job.requirements}
                                  </p>
                                </div>
                              )}

                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                {daysLeftText && (
                                  <div style={{ fontSize: '0.8rem', color: '#d97706', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                                    <Clock size={14} /> Deadline: {daysLeftText}
                                  </div>
                                )}
                                
                                {!isApplying && (
                                  <button
                                    onClick={() => setApplyingJobId(job.id)}
                                    className="btn btn-primary"
                                    style={{ padding: '0.5rem 1.25rem', fontSize: '0.82rem', marginLeft: 'auto' }}
                                  >
                                    Apply for this Job
                                  </button>
                                )}
                              </div>
                            </div>
                          )}

                          {isApplying && (
                            <div style={{ 
                              marginTop: '1.25rem', 
                              borderTop: '2.5px solid #2563eb', 
                              paddingTop: '1.25rem', 
                              background: '#f8fafc',
                              padding: '1.5rem',
                              borderRadius: '12px'
                            }}>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem' }}>Apply for Position: {job.title}</h4>
                              
                              <form onSubmit={(e) => handleAppSubmit(e, job)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                                    Resume/CV Link <span style={{ color: '#ef4444' }}>*</span>
                                  </label>
                                  <input 
                                    type="url" 
                                    required
                                    placeholder="https://drive.google.com/... (Google Drive, Dropbox link)"
                                    value={resumeUrl}
                                    onChange={(e) => setResumeUrl(e.target.value)}
                                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                                  />
                                </div>

                                <div>
                                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                                    Cover Letter <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Optional)</span>
                                  </label>
                                  <textarea 
                                    rows={4}
                                    placeholder="Tell us briefly why you're a great fit for this position..."
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', resize: 'vertical' }}
                                  />
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                                  <button
                                    type="button"
                                    onClick={() => { setApplyingJobId(null); setAppError(''); }}
                                    style={{ 
                                      padding: '0.5rem 1rem', 
                                      borderRadius: '8px', 
                                      border: '1px solid #cbd5e1', 
                                      background: 'white', 
                                      color: '#64748b', 
                                      fontWeight: 600, 
                                      fontSize: '0.8rem', 
                                      cursor: 'pointer' 
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    disabled={appLoading}
                                    className="btn btn-primary"
                                    style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem', justifyContent: 'center' }}
                                  >
                                    {appLoading ? 'Submitting...' : 'Submit Application'}
                                  </button>
                                </div>
                              </form>
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={22} style={{ color: '#1e3a8a' }} />
                  <span>Profile Settings</span>
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Update your contact information below. This telephone number will be used by our team to contact you regarding your quote requests and job applications.
                </p>
                
                {settingsSuccess && (
                  <div style={{ background: '#ecfdf5', color: '#047857', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                    {settingsSuccess}
                  </div>
                )}
                {settingsError && (
                  <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    {settingsError}
                  </div>
                )}

                <form onSubmit={handleSettingsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '400px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#374151' }}>Full Name</label>
                    <input 
                      type="text" 
                      disabled
                      value={session?.user?.name || ''}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b', cursor: 'not-allowed' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#374151' }}>Email Address</label>
                    <input 
                      type="email" 
                      disabled
                      value={session?.user?.email || ''}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b', cursor: 'not-allowed' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#374151' }}>Telephone Contact <span style={{ color: '#dc2626' }}>*</span></label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +256 700 000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={settingsLoading}
                    className="btn btn-primary"
                    style={{ 
                      padding: '0.8rem', 
                      fontWeight: 600, 
                      border: 'none', 
                      cursor: settingsLoading ? 'not-allowed' : 'pointer', 
                      justifyContent: 'center',
                      marginTop: '0.5rem'
                    }}
                  >
                    {settingsLoading ? 'Saving Profile Details...' : 'Save Profile Details'}
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
