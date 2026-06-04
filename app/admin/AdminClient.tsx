'use client';
import { useState, useTransition } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  FileEdit,
  Briefcase,
  FileText,
  MessageSquare,
  Globe,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  Home,
  Layers,
  Tag,
  Phone,
  Image as ImageIcon,
  ChevronDown,
  Upload,
  Save,
  X,
  Loader2
} from 'lucide-react';

type ContentItem = {
  id: string; key: string; value: string; type: string; page: string; label: string;
};
type QuoteRequest = {
  id: string; product: string; quantity: string | null; message: string; status: string;
  createdAt: string; user: { name: string | null; email: string | null };
};
type JobApplication = {
  id: string; jobTitle: string; resumeUrl: string | null; coverLetter: string | null;
  status: string; createdAt: string;
  user: { name: string | null; email: string | null };
  jobListing: { title: string } | null;
};
type JobListing = {
  id: string; title: string; location: string; type: string; description: string;
  requirements: string | null; salary: string | null; deadline: string | null;
  isActive: boolean; createdAt: string; _count: { applications: number };
};
type User = {
  id: string; name: string | null; email: string | null; role: string; isActive: boolean; createdAt: string;
};

interface Props {
  adminName: string;
  adminEmail: string;
  stats: { quotes: number; applications: number; activeJobs: number; users: number };
  quoteRequests: QuoteRequest[];
  jobApplications: JobApplication[];
  jobListings: JobListing[];
  contentItems: ContentItem[];
  users: User[];
}

const PAGES = [
  { key: 'home', label: 'Home', icon: <Home size={16} /> },
  { key: 'about', label: 'About', icon: <Users size={16} /> },
  { key: 'services', label: 'Services', icon: <Layers size={16} /> },
  { key: 'pricing', label: 'Pricing', icon: <Tag size={16} /> },
  { key: 'contact', label: 'Contact', icon: <Phone size={16} /> },
  { key: 'gallery', label: 'Gallery', icon: <ImageIcon size={16} /> },
  { key: 'careers', label: 'Careers', icon: <Briefcase size={16} /> },
];

function StatusBadge({ status }: { status: string }) {
  const bgColors: Record<string, string> = {
    PENDING: '#fef3c7',
    RESPONDED: '#dbeafe',
    CLOSED: '#f3f4f6',
    REVIEWED: '#f3e8ff',
    ACCEPTED: '#d1fae5',
    REJECTED: '#fee2e2',
  };
  const textColors: Record<string, string> = {
    PENDING: '#d97706',
    RESPONDED: '#2563eb',
    CLOSED: '#4b5563',
    REVIEWED: '#7c3aed',
    ACCEPTED: '#059669',
    REJECTED: '#dc2626',
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
      padding: '0.25rem 0.75rem', borderRadius: '100px',
      fontSize: '0.75rem', fontWeight: 700, 
      color: textColors[status] || '#4b5563',
      background: bgColors[status] || '#f3f4f6', 
      whiteSpace: 'nowrap',
    }}>
      {status}
    </span>
  );
}

function getGroupKey(key: string): string {
  const parts = key.split('.');
  if (parts.length < 2) return 'General';
  const group = parts[1]; // e.g. 'hero', 'stats', 'about', 'service_1'
  
  if (group.startsWith('service_')) return 'Services';
  if (group.startsWith('product_')) return 'Products';
  if (group.startsWith('testimonial_')) return 'Testimonials';
  if (group.startsWith('gallery_')) return 'Gallery';
  if (group.startsWith('why_')) return 'Why Choose Us';
  if (group.startsWith('plan_')) return 'Pricing Plans';
  if (group.startsWith('founder_')) return 'Founders';
  if (group.startsWith('value_') || group === 'mission' || group === 'vision') return 'Core Values & Mission';
  if (group.startsWith('contact') || group === 'address' || group === 'phone' || group === 'email' || group === 'whatsapp' || group === 'hours' || group === 'maps_embed') return 'Contact Details';
  if (group.startsWith('item_')) return 'Gallery Images';
  
  // Capitalize group name
  return group.charAt(0).toUpperCase() + group.slice(1);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-UG', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminClient({ adminName, adminEmail, stats, quoteRequests: initialQuotes, jobApplications: initialApps, jobListings: initialJobs, contentItems: initialContent, users: initialUsers }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'jobs' | 'applications' | 'quotes' | 'users'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [usersList, setUsersList] = useState<User[]>(initialUsers);

  // Content editor state
  const [selectedPage, setSelectedPage] = useState('home');
  const [contentItems, setContentItems] = useState<ContentItem[]>(initialContent);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // UI state for compact collapsible sections
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ 'Hero': true, 'Hero Section': true });
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, itemKey: string) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingKey(itemKey);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setEditValue(data.url);
      } else {
        const err = await res.json();
        alert(`Upload failed: ${err.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Upload error: ${err.message || 'Unknown error'}`);
    } finally {
      setUploadingKey(null);
    }
  }

  // Jobs state
  const [jobs, setJobs] = useState<JobListing[]>(initialJobs);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const [jobForm, setJobForm] = useState({ title: '', location: '', type: 'Full-time', description: '', requirements: '', salary: '', deadline: '', isActive: true });
  const [jobSaving, setJobSaving] = useState(false);

  // Quotes state
  const [quotes, setQuotes] = useState<QuoteRequest[]>(initialQuotes);
  const [applications, setApplications] = useState<JobApplication[]>(initialApps);
  const [, startTransition] = useTransition();

  // ── Content Helpers ──────────────────────────────────────────────────────────
  const pageItems = contentItems.filter((c) => c.page === selectedPage);

  function startEdit(item: ContentItem) {
    setEditingKey(item.key);
    setEditValue(item.value);
    setSaveMsg('');
  }

  async function saveContent(key: string) {
    setSaving(true);
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: editValue }),
    });
    if (res.ok) {
      setContentItems((prev) => prev.map((c) => c.key === key ? { ...c, value: editValue } : c));
      setEditingKey(null);
      setSaveMsg('✅ Saved!');
      setTimeout(() => setSaveMsg(''), 2000);
    }
    setSaving(false);
  }

  // ── Jobs Helpers ─────────────────────────────────────────────────────────────
  function openNewJob() {
    setEditingJob(null);
    setJobForm({ title: '', location: '', type: 'Full-time', description: '', requirements: '', salary: '', deadline: '', isActive: true });
    setShowJobForm(true);
  }

  function openEditJob(job: JobListing) {
    setEditingJob(job);
    setJobForm({
      title: job.title, location: job.location, type: job.type,
      description: job.description, requirements: job.requirements || '',
      salary: job.salary || '',
      deadline: job.deadline ? job.deadline.slice(0, 10) : '',
      isActive: job.isActive,
    });
    setShowJobForm(true);
  }

  async function saveJob() {
    setJobSaving(true);
    const payload = {
      ...jobForm,
      deadline: jobForm.deadline || null,
      ...(editingJob ? { id: editingJob.id } : {}),
    };
    const res = await fetch('/api/admin/jobs', {
      method: editingJob ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      if (editingJob) {
        setJobs((prev) => prev.map((j) => j.id === editingJob.id ? { ...j, ...data.job } : j));
      } else {
        setJobs((prev) => [{ ...data.job, _count: { applications: 0 } }, ...prev]);
      }
      setShowJobForm(false);
    }
    setJobSaving(false);
  }

  async function toggleJobActive(job: JobListing) {
    const res = await fetch('/api/admin/jobs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: job.id, isActive: !job.isActive }),
    });
    if (res.ok) {
      setJobs((prev) => prev.map((j) => j.id === job.id ? { ...j, isActive: !job.isActive } : j));
    }
  }

  async function deleteJob(id: string) {
    if (!confirm('Are you sure you want to permanently delete this job listing? This will also disconnect any applications for this job.')) return;
    const res = await fetch('/api/admin/jobs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setJobs((prev) => prev.filter((j) => j.id !== id));
    }
  }

  async function deleteContent(key: string) {
    if (!confirm('Are you sure you want to reset this item to its system default value?')) return;
    const res = await fetch('/api/admin/content', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });
    if (res.ok) {
      setContentItems((prev) => prev.map((c) => c.key === key ? { ...c, value: '' } : c));
      setSaveMsg('✅ Reset to Default!');
      setTimeout(() => setSaveMsg(''), 2000);
    }
  }

  async function markAsDeleted(key: string) {
    if (!confirm('Are you sure you want to delete this item? It will be hidden from the public website.')) return;
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: '__DELETED__' }),
    });
    if (res.ok) {
      setContentItems((prev) => prev.map((c) => c.key === key ? { ...c, value: '__DELETED__' } : c));
      setSaveMsg('🗑️ Deleted from website!');
      setTimeout(() => setSaveMsg(''), 2000);
    }
  }

  // ── Status Updates ───────────────────────────────────────────────────────────
  async function updateQuoteStatus(id: string, status: string) {
    const res = await fetch('/api/admin/quotes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) setQuotes((prev) => prev.map((q) => q.id === id ? { ...q, status } : q));
  }

  async function updateAppStatus(id: string, status: string) {
    const res = await fetch('/api/admin/applications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
  }

  async function updateUserRole(id: string, role: string) {
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, role }),
    });
    if (res.ok) {
      const data = await res.json();
      setUsersList((prev) => prev.map((u) => u.id === id ? { ...u, role: data.user.role } : u));
    } else {
      const err = await res.json();
      alert(`Error: ${err.error || 'Failed to update user role'}`);
    }
  }

  async function updateUserActive(id: string, isActive: boolean) {
    const actionText = isActive ? 'activate' : 'deactivate';
    if (!confirm(`Are you sure you want to ${actionText} this user's account?`)) return;

    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isActive }),
    });
    if (res.ok) {
      const data = await res.json();
      setUsersList((prev) => prev.map((u) => u.id === id ? { ...u, isActive: data.user.isActive } : u));
    } else {
      const err = await res.json();
      alert(`Error: ${err.error || 'Failed to update user status'}`);
    }
  }

  const now = new Date();
  const isExpired = (job: JobListing) => job.deadline && new Date(job.deadline) < now;

  // ── Sidebar ──────────────────────────────────────────────────────────────────
  const tabs = [
    { key: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { key: 'content', icon: <FileEdit size={18} />, label: 'Content Editor' },
    { key: 'jobs', icon: <Briefcase size={18} />, label: 'Job Listings' },
    { key: 'applications', icon: <FileText size={18} />, label: 'Applications' },
    { key: 'quotes', icon: <MessageSquare size={18} />, label: 'Quote Requests' },
    { key: 'users', icon: <Users size={18} />, label: 'User Management' },
  ] as const;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '240px' : '64px',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e3a5f 100%)',
        transition: 'width 0.3s ease',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
        overflowX: 'hidden',
      }}>
        {/* Logo area */}
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'white', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Image src="/images/logo.png" alt="Logo" width={32} height={32} style={{ objectFit: 'contain' }} />
          </div>
          {sidebarOpen && <div style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.2, whiteSpace: 'nowrap' }}>Admin<br /><span style={{ opacity: 0.6, fontSize: '0.7rem', fontWeight: 400 }}>Musikuli Dairies</span></div>}
        </div>

        {/* Toggle button */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ margin: '0.75rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0.5rem' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
                marginBottom: '0.25rem', textAlign: 'left', whiteSpace: 'nowrap',
                background: activeTab === tab.key ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: activeTab === tab.key ? 'white' : 'rgba(255,255,255,0.6)',
                fontWeight: activeTab === tab.key ? 700 : 400,
                fontSize: '0.875rem', transition: 'all 0.2s',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{tab.icon}</span>
              {sidebarOpen && tab.label}
            </button>
          ))}
        </nav>

        {/* Bottom links */}
        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <a href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            <Globe size={14} />{sidebarOpen && 'View Website'}
          </a>
          <a href="/api/auth/signout" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textDecoration: 'none', marginTop: '0.75rem', whiteSpace: 'nowrap' }}>
            <LogOut size={14} />{sidebarOpen && 'Sign Out'}
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: sidebarOpen ? '240px' : '64px', flex: 1, transition: 'margin-left 0.3s ease', minHeight: '100vh' }}>
        {/* Top Bar */}
        <header style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 90 }}>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {tabs.find((t) => t.key === activeTab)?.icon}
              <span>{tabs.find((t) => t.key === activeTab)?.label}</span>
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {saveMsg && <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.875rem' }}>{saveMsg}</span>}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#1a56db,#1e40af)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
                {adminName[0]?.toUpperCase()}
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{adminName}</div>
                <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Administrator</div>
              </div>
            </div>
          </div>
        </header>

        <div style={{ padding: '2rem' }}>

          {/* ── OVERVIEW TAB ─────────────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Welcome back, <strong>{adminName}</strong>. Here's a snapshot of your website activity.</p>

              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {[
                  { icon: <MessageSquare size={24} style={{ color: '#3b82f6' }} />, label: 'Quote Requests', value: stats.quotes, color: '#3b82f6', bg: '#eff6ff', tab: 'quotes' as const },
                  { icon: <FileText size={24} style={{ color: '#8b5cf6' }} />, label: 'Job Applications', value: stats.applications, color: '#8b5cf6', bg: '#f5f3ff', tab: 'applications' as const },
                  { icon: <Briefcase size={24} style={{ color: '#10b981' }} />, label: 'Active Job Listings', value: stats.activeJobs, color: '#10b981', bg: '#ecfdf5', tab: 'jobs' as const },
                  { icon: <Users size={24} style={{ color: '#f59e0b' }} />, label: 'Registered Users', value: stats.users, color: '#f59e0b', bg: '#fffbeb', tab: 'overview' as const },
                ].map((s) => (
                  <button key={s.label} onClick={() => setActiveTab(s.tab)} style={{
                    background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem',
                    textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      {s.icon}
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>{s.label}</div>
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Quick Actions</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {[
                    { label: '+ Add Job Listing', tab: 'jobs' as const, color: '#10b981' },
                    { label: '✏️ Edit Website Content', tab: 'content' as const, color: '#3b82f6' },
                    { label: '📋 Review Applications', tab: 'applications' as const, color: '#8b5cf6' },
                    { label: '💬 View Quotes', tab: 'quotes' as const, color: '#f59e0b' },
                  ].map((a) => (
                    <button key={a.label} onClick={() => setActiveTab(a.tab)} style={{
                      padding: '0.65rem 1.25rem', borderRadius: '10px', border: `2px solid ${a.color}`,
                      background: 'transparent', color: a.color, fontWeight: 600, fontSize: '0.875rem',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = a.color; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = a.color; }}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── CONTENT EDITOR TAB ──────────────────────────────────────────── */}
          {activeTab === 'content' && (
            <div>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Select a page and edit its contents. Sections are grouped cleanly. Click a header to expand/collapse.</p>

              {/* Page Selector */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {PAGES.map((p) => (
                  <button key={p.key} onClick={() => { setSelectedPage(p.key); setEditingKey(null); }} style={{
                    padding: '0.55rem 1.1rem', borderRadius: '100px', border: '2px solid',
                    borderColor: selectedPage === p.key ? '#1a56db' : '#e2e8f0',
                    background: selectedPage === p.key ? '#1a56db' : 'white',
                    color: selectedPage === p.key ? 'white' : '#374151',
                    fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}>
                    {p.icon}
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>

              {/* Collapsible Section Layout */}
              {pageItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                  <p>No content found for this page. Run the database seed to populate it.</p>
                </div>
              ) : (() => {
                // Group items
                const grouped: Record<string, ContentItem[]> = {};
                pageItems.forEach(item => {
                  const grp = getGroupKey(item.key);
                  if (!grouped[grp]) grouped[grp] = [];
                  grouped[grp].push(item);
                });

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {Object.entries(grouped).map(([groupName, items]) => {
                      const isExpanded = !!expandedGroups[groupName];
                      return (
                        <div key={groupName} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                          {/* Collapsible Header */}
                          <button
                            onClick={() => toggleGroup(groupName)}
                            style={{
                              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              padding: '1rem 1.5rem', background: '#f8fafc', border: 'none', borderBottom: isExpanded ? '1px solid #e2e8f0' : 'none',
                              cursor: 'pointer', textAlign: 'left', outline: 'none'
                            }}
                          >
                            <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span>{isExpanded ? <ChevronDown size={16} style={{ color: '#64748b' }} /> : <ChevronRight size={16} style={{ color: '#64748b' }} />}</span>
                              {groupName}
                              <span style={{ fontWeight: 500, color: '#94a3b8', fontSize: '0.8rem', marginLeft: '0.25rem' }}>({items.length} field{items.length !== 1 ? 's' : ''})</span>
                            </span>
                          </button>

                          {/* Collapsible Content */}
                          {isExpanded && (
                            <div style={{ padding: '0.5rem 1.5rem 1.5rem 1.5rem' }}>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {items.map((item, index) => {
                                  const isEditing = editingKey === item.key;
                                  return (
                                    <div key={item.key} style={{
                                      padding: '1.25rem 0',
                                      borderBottom: index < items.length - 1 ? '1px solid #f1f5f9' : 'none',
                                      display: 'flex', flexDirection: 'column', gap: '0.75rem'
                                    }}>
                                      {/* Row Header */}
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        <div style={{ flex: 1, minWidth: '200px' }}>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            {item.type === 'IMAGE_URL' ? <ImageIcon size={12} /> : <FileText size={12} />}
                                            <span>{item.type === 'IMAGE_URL' ? 'Image File' : 'Text Content'}</span>
                                          </div>
                                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginTop: '0.2rem' }}>{item.label}</div>
                                        </div>

                                        {/* Value Preview (when not editing) */}
                                        {!isEditing && (
                                          <div style={{ flex: 2, minWidth: '300px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            {item.value === '__DELETED__' ? (
                                              <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '100px', background: '#fee2e2', color: '#dc2626', fontWeight: 700 }}>
                                                Deleted / Hidden from website
                                              </span>
                                            ) : item.type === 'IMAGE_URL' ? (
                                              item.value ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', background: '#f1f5f9', border: '1px solid #e2e8f0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <img src={item.value} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                  </div>
                                                  <span style={{ fontSize: '0.825rem', color: '#64748b', fontFamily: 'monospace' }}>
                                                    {item.value.startsWith('data:') 
                                                      ? 'Custom Uploaded Image (Base64)' 
                                                      : (item.value.length > 50 ? item.value.substring(0, 50) + '...' : item.value)}
                                                  </span>
                                                </div>
                                              ) : (
                                                <span style={{ fontSize: '0.825rem', color: '#94a3b8', fontStyle: 'italic' }}>No image set</span>
                                              )
                                            ) : (
                                              <span style={{ fontSize: '0.85rem', color: '#475569', wordBreak: 'break-word', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {item.value || <em style={{ opacity: 0.4 }}>Empty</em>}
                                              </span>
                                            )}
                                          </div>
                                        )}

                                        {/* Actions */}
                                        {!isEditing && (
                                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                              onClick={() => startEdit(item)}
                                              style={{
                                                padding: '0.4rem 1rem', borderRadius: '8px', border: '1.5px solid #1a56db',
                                                background: 'transparent', color: '#1a56db', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
                                                transition: 'all 0.15s',
                                              }}
                                              onMouseEnter={(e) => { e.currentTarget.style.background = '#eff6ff'; }}
                                              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                                            >
                                              {item.value === '__DELETED__' ? 'Restore' : 'Edit'}
                                            </button>

                                            {item.value && item.value !== '__DELETED__' && (
                                              <button
                                                onClick={() => deleteContent(item.key)}
                                                style={{
                                                  padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1.5px solid #64748b',
                                                  background: 'transparent', color: '#64748b', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
                                                  transition: 'all 0.15s',
                                                }}
                                                onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                                                title="Reset to system default"
                                              >
                                                Reset
                                              </button>
                                            )}

                                            {item.value !== '__DELETED__' && (item.key.includes('gallery.item_') || item.key.includes('pricing.product_') || item.key.includes('home.gallery_')) && (
                                              <button
                                                onClick={() => markAsDeleted(item.key)}
                                                style={{
                                                  padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1.5px solid #dc2626',
                                                  background: 'transparent', color: '#dc2626', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
                                                  transition: 'all 0.15s',
                                                }}
                                                onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                                                title="Delete / Hide from public page"
                                              >
                                                Delete
                                              </button>
                                            )}
                                          </div>
                                        )}
                                      </div>

                                      {/* Editing Area */}
                                      {isEditing && (
                                        <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginTop: '0.25rem' }}>
                                          {item.type === 'IMAGE_URL' ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                              {/* Image Preview & Actions side by side */}
                                              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                                                <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '8px', overflow: 'hidden', background: 'white', border: '1px solid #cbd5e1', flexShrink: 0 }}>
                                                  {editValue && editValue !== '__DELETED__' ? (
                                                    <Image src={editValue} alt="Preview" fill style={{ objectFit: 'cover' }} sizes="120px" onError={() => {}} />
                                                  ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>No Preview</div>
                                                  )}
                                                </div>

                                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '240px' }}>
                                                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#334155' }}>Update Image File:</div>
                                                  
                                                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                    {/* Upload Button */}
                                                    <label style={{
                                                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1rem',
                                                      borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#334155',
                                                      fontSize: '0.825rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                                    }}>
                                                      {uploadingKey === item.key ? (
                                                        <>
                                                          <Loader2 size={15} className="animate-spin" />
                                                          <span>Uploading...</span>
                                                        </>
                                                      ) : (
                                                        <>
                                                          <Upload size={15} />
                                                          <span>Upload Image File</span>
                                                        </>
                                                      )}
                                                      <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileUpload(e, item.key)}
                                                        disabled={uploadingKey === item.key}
                                                        style={{ display: 'none' }}
                                                      />
                                                    </label>
                                                  </div>

                                                  <div>
                                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginBottom: '0.25rem' }}>Or paste image path/URL directly:</label>
                                                    <input
                                                      value={editValue}
                                                      onChange={(e) => setEditValue(e.target.value)}
                                                      placeholder="e.g. /images/hero_farm.png or https://..."
                                                      style={inputStyle}
                                                    />
                                                  </div>
                                                </div>
                                              </div>

                                              {/* Image Library Selector */}
                                              <div>
                                                <div style={{ fontWeight: 600, fontSize: '0.825rem', color: '#475569', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                  <ImageIcon size={14} />
                                                  <span>Select from existing images in database:</span>
                                                </div>
                                                <div style={{
                                                  display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: '0.5rem',
                                                  maxHeight: '135px', overflowY: 'auto', background: 'white', padding: '0.75rem',
                                                  borderRadius: '8px', border: '1px solid #cbd5e1'
                                                }}>
                                                  {(() => {
                                                    // Get uploaded + used + defaults
                                                    const allImages = Array.from(new Set(
                                                      contentItems
                                                        .filter(c => c.type === 'IMAGE_URL' && c.value && c.value.startsWith('/'))
                                                        .map(c => c.value)
                                                    ));
                                                    const defaultImages = [
                                                      '/images/logo.png', '/images/founders pic.jpeg', '/images/dairy_products.png',
                                                      '/images/agro_produce.png', '/images/farmers_community.png', '/images/milk_collection.png',
                                                      '/images/goat_enterprise.png', '/images/product-milk.jpg', '/images/product-maize.jpg',
                                                      '/images/product-beans.jpg', '/images/product-rice.jpg', '/images/product-groundnuts.jpg',
                                                      '/images/product-cattle.jpg', '/images/product-goats.png', '/images/hero_farm.png'
                                                    ];
                                                    const imageLibrary = Array.from(new Set([...allImages, ...defaultImages]));

                                                    return imageLibrary.map((imgUrl) => {
                                                      const isSelected = editValue === imgUrl;
                                                      return (
                                                        <button
                                                          key={imgUrl}
                                                          type="button"
                                                          onClick={() => setEditValue(imgUrl)}
                                                          style={{
                                                            position: 'relative', width: '100%', height: '54px', borderRadius: '6px',
                                                            overflow: 'hidden', border: isSelected ? '3px solid #1a56db' : '1px solid #e2e8f0',
                                                            background: '#f8fafc', padding: 0, cursor: 'pointer', flexShrink: 0, outline: 'none'
                                                          }}
                                                          title={imgUrl}
                                                        >
                                                          <Image src={imgUrl} alt="Library Image" fill style={{ objectFit: 'cover' }} sizes="64px" onError={() => {}} />
                                                        </button>
                                                      );
                                                    });
                                                  })()}
                                                </div>
                                              </div>
                                            </div>
                                          ) : (
                                            <div>
                                              {item.value.length > 80 ? (
                                                <textarea
                                                  value={editValue}
                                                  onChange={(e) => setEditValue(e.target.value)}
                                                  rows={4}
                                                  style={{ ...inputStyle, resize: 'vertical' }}
                                                />
                                              ) : (
                                                <input
                                                  value={editValue}
                                                  onChange={(e) => setEditValue(e.target.value)}
                                                  style={inputStyle}
                                                />
                                              )}
                                            </div>
                                          )}

                                          {/* Row Edit Save/Cancel Actions */}
                                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                                            <button onClick={() => saveContent(item.key)} disabled={saving || uploadingKey === item.key} style={{ ...btnStyle, background: '#1a56db', color: 'white', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem' }}>
                                              <Save size={14} />
                                              <span>{saving ? 'Saving...' : 'Save'}</span>
                                            </button>
                                            <button onClick={() => setEditingKey(null)} disabled={saving} style={{ ...btnStyle, background: 'white', border: '1px solid #cbd5e1', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem' }}>
                                              <X size={14} />
                                              <span>Cancel</span>
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}

          {/* ── JOB LISTINGS TAB ─────────────────────────────────────────────── */}
          {activeTab === 'jobs' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <p style={{ color: '#64748b', margin: 0 }}>Manage job listings shown on the public Careers page. Expired or inactive jobs are hidden from visitors.</p>
                <button onClick={openNewJob} style={{ ...btnStyle, background: '#10b981', color: 'white', whiteSpace: 'nowrap' }}>
                  + New Job Listing
                </button>
              </div>

              {/* Job Form */}
              {showJobForm && (
                <div style={{ background: 'white', borderRadius: '16px', border: '2px solid #1a56db', padding: '1.75rem', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>
                    {editingJob ? '✏️ Edit Job Listing' : '+ Create New Job Listing'}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Job Title *</label>
                      <input value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} placeholder="e.g. Dairy Farm Manager" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Location *</label>
                      <input value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })} placeholder="e.g. Luwero, Uganda" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Employment Type *</label>
                      <select value={jobForm.type} onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })} style={inputStyle}>
                        <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option><option>Volunteer</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Salary Range</label>
                      <input value={jobForm.salary} onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })} placeholder="e.g. Competitive / UGX 800,000–1,200,000" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Application Deadline (Expiry Date)</label>
                      <input type="date" value={jobForm.deadline} onChange={(e) => setJobForm({ ...jobForm, deadline: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.5rem' }}>
                      <input type="checkbox" id="job-active" checked={jobForm.isActive} onChange={(e) => setJobForm({ ...jobForm, isActive: e.target.checked })} style={{ width: 18, height: 18 }} />
                      <label htmlFor="job-active" style={{ fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>Job is Active (visible on website)</label>
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Job Description *</label>
                    <textarea value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })} rows={4} placeholder="Describe the role, responsibilities and what the candidate will do..." style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={labelStyle}>Requirements & Qualifications</label>
                    <textarea value={jobForm.requirements} onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })} rows={3} placeholder="List qualifications, experience, skills required..." style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={saveJob} disabled={jobSaving || !jobForm.title || !jobForm.location || !jobForm.description} style={{ ...btnStyle, background: '#1a56db', color: 'white', flex: 1 }}>
                      {jobSaving ? 'Saving...' : editingJob ? '✓ Update Job' : '✓ Create Job'}
                    </button>
                    <button onClick={() => setShowJobForm(false)} style={{ ...btnStyle, background: '#f1f5f9', color: '#374151' }}>Cancel</button>
                  </div>
                </div>
              )}

              {/* Jobs Table */}
              <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                {jobs.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                    <p>No job listings yet. Create one above!</p>
                  </div>
                ) : jobs.map((job, i) => (
                  <div key={job.id} style={{ padding: '1.25rem 1.5rem', borderBottom: i < jobs.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{job.title}</span>
                        <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.65rem', borderRadius: '100px', background: '#f1f5f9', color: '#64748b' }}>{job.type}</span>
                        {isExpired(job) ? (
                          <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.55rem', borderRadius: '100px', background: '#fee2e2', color: '#dc2626', fontWeight: 700 }}>EXPIRED</span>
                        ) : job.isActive ? (
                          <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.55rem', borderRadius: '100px', background: '#d1fae5', color: '#059669', fontWeight: 700 }}>ACTIVE</span>
                        ) : (
                          <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.55rem', borderRadius: '100px', background: '#f1f5f9', color: '#94a3b8', fontWeight: 700 }}>INACTIVE</span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        📍 {job.location} &nbsp;·&nbsp; 👥 {job._count.applications} application{job._count.applications !== 1 ? 's' : ''}
                        {job.deadline && <> &nbsp;·&nbsp; ⏰ Deadline: {formatDate(job.deadline)}</>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                      <button onClick={() => openEditJob(job)} style={{ ...smallBtn, background: '#eff6ff', color: '#1a56db' }}>✏️ Edit</button>
                      <button onClick={() => toggleJobActive(job)} style={{ ...smallBtn, background: job.isActive ? '#fff7ed' : '#ecfdf5', color: job.isActive ? '#ea580c' : '#059669' }}>
                        {job.isActive ? '⏸ Pause' : '▶ Activate'}
                      </button>
                      <button onClick={() => deleteJob(job.id)} style={{ ...smallBtn, background: '#fee2e2', color: '#dc2626' }}>🗑 Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── APPLICATIONS TAB ──────────────────────────────────────────────── */}
          {activeTab === 'applications' && (
            <div>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                {applications.length} job application{applications.length !== 1 ? 's' : ''} total. Update status to track the hiring process.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {applications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                    <p>No job applications yet.</p>
                  </div>
                ) : applications.map((app) => (
                  <div key={app.id} style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{app.user.name || 'Anonymous'}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{app.user.email}</div>
                        <div style={{ fontSize: '0.85rem', color: '#374151', marginTop: '0.4rem' }}>
                          Applied for: <strong>{app.jobListing?.title || app.jobTitle}</strong>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>📅 {formatDate(app.createdAt)}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <StatusBadge status={app.status} />
                        <select
                          value={app.status}
                          onChange={(e) => updateAppStatus(app.id, e.target.value)}
                          style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', cursor: 'pointer' }}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="REVIEWED">REVIEWED</option>
                          <option value="ACCEPTED">ACCEPTED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </div>
                    </div>
                    {app.resumeUrl && (
                      <a href={app.resumeUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.75rem', fontSize: '0.82rem', color: '#1a56db', fontWeight: 600 }}>
                        📄 View Resume / CV
                      </a>
                    )}
                    {app.coverLetter && (
                      <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.75rem', marginTop: '0.75rem', fontSize: '0.82rem', color: '#374151', whiteSpace: 'pre-wrap' }}>
                        <strong>Cover Letter:</strong><br />{app.coverLetter}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── QUOTES TAB ─────────────────────────────────────────────────────── */}
          {activeTab === 'quotes' && (
            <div>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                {quotes.length} quote request{quotes.length !== 1 ? 's' : ''} total. Update status to track your responses.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {quotes.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                    <p>No quote requests yet.</p>
                  </div>
                ) : quotes.map((q) => (
                  <div key={q.id} style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>{q.product}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>From: {q.user.name} ({q.user.email})</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                          📅 {formatDate(q.createdAt)} {q.quantity && <> · Qty: {q.quantity}</>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <StatusBadge status={q.status} />
                        <select
                          value={q.status}
                          onChange={(e) => updateQuoteStatus(q.id, e.target.value)}
                          style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', cursor: 'pointer' }}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="RESPONDED">RESPONDED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.75rem', fontSize: '0.85rem', color: '#374151', whiteSpace: 'pre-wrap' }}>
                      {q.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── USER MANAGEMENT TAB ─────────────────────────────────────────────── */}
          {activeTab === 'users' && (
            <div>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                Manage registered users, change their roles, or activate/deactivate accounts.
              </p>
              
              <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflowX: 'auto', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>User</th>
                      <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Date Joined</th>
                      <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Role</th>
                      <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                          <p>No registered users found.</p>
                        </td>
                      </tr>
                    ) : usersList.map((user) => {
                      const isSelf = user.email === adminEmail;
                      return (
                        <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                          {/* User Info */}
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: isSelf ? 'linear-gradient(135deg, #1a56db, #1e40af)' : 'linear-gradient(135deg, #64748b, #94a3b8)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', fontWeight: 700, fontSize: '0.85rem'
                              }}>
                                {user.name ? user.name[0].toUpperCase() : (user.email ? user.email[0].toUpperCase() : '?')}
                              </div>
                              <div>
                                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                  <span>{user.name || 'Anonymous'}</span>
                                  {isSelf && (
                                    <span style={{ fontSize: '0.7rem', background: '#eff6ff', color: '#1a56db', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>
                                      You
                                    </span>
                                  )}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{user.email}</div>
                              </div>
                            </div>
                          </td>
                          {/* Date Joined */}
                          <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#475569' }}>
                            {formatDate(user.createdAt)}
                          </td>
                          {/* Role selector */}
                          <td style={{ padding: '1rem 1.5rem' }}>
                            {isSelf ? (
                              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a', background: '#f1f5f9', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                                {user.role}
                              </span>
                            ) : (
                              <select
                                value={user.role}
                                onChange={(e) => updateUserRole(user.id, e.target.value)}
                                style={{
                                  fontSize: '0.825rem', padding: '0.3rem 0.6rem', borderRadius: '8px',
                                  border: '1.5px solid #e2e8f0', cursor: 'pointer', background: 'white',
                                  fontWeight: 600, color: '#334155'
                                }}
                              >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                              </select>
                            )}
                          </td>
                          {/* Status Badge */}
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <span style={{
                              display: 'inline-flex', alignItems: 'center',
                              padding: '0.2rem 0.6rem', borderRadius: '100px',
                              fontSize: '0.72rem', fontWeight: 700,
                              color: user.isActive ? '#059669' : '#dc2626',
                              background: user.isActive ? '#d1fae5' : '#fee2e2',
                            }}>
                              {user.isActive ? 'ACTIVE' : 'DEACTIVATED'}
                            </span>
                          </td>
                          {/* Actions */}
                          <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                            {isSelf ? (
                              <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>
                                System Owner
                              </span>
                            ) : (
                              <button
                                onClick={() => updateUserActive(user.id, !user.isActive)}
                                style={{
                                  ...smallBtn,
                                  background: user.isActive ? '#fee2e2' : '#ecfdf5',
                                  color: user.isActive ? '#dc2626' : '#059669',
                                  transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.filter = 'brightness(0.95)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.filter = '';
                                }}
                              >
                                {user.isActive ? 'Deactivate' : 'Activate'}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Shared style objects
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px',
  border: '1.5px solid #e2e8f0', fontSize: '0.875rem', color: '#0f172a',
  background: 'white', outline: 'none', boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif',
};
const btnStyle: React.CSSProperties = {
  padding: '0.65rem 1.25rem', borderRadius: '10px', border: 'none',
  fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
  fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
};
const smallBtn: React.CSSProperties = {
  padding: '0.35rem 0.75rem', borderRadius: '8px', border: 'none',
  fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.8rem', fontWeight: 600,
  color: '#374151', marginBottom: '0.4rem',
};
