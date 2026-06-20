'use client';
import { useState, useTransition, useEffect } from 'react';
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
  Loader2,
  Menu,
  TrendingUp,
  ShoppingBag,
  Check,
  Ban,
  Trash2,
  DollarSign
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

type BrokerOrder = {
  id: string;
  listingId: string;
  buyerId: string | null;
  buyerName: string;
  buyerEmail: string | null;
  buyerPhone: string;
  quantity: string;
  status: string;
  revenue: number | null;
  cost: number | null;
  createdAt: string;
  updatedAt: string;
  buyer?: { name: string | null; email: string | null } | null;
};

type BrokerListing = {
  id: string;
  userId: string;
  type: string;
  product: string;
  quantity: string;
  price: string | null;
  description: string | null;
  status: string;
  contactName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  createdAt: string;
  updatedAt: string;
  user: { name: string | null; email: string | null; phone: string | null };
  orders: BrokerOrder[];
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
  brokerListings: BrokerListing[];
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

export default function AdminClient({ adminName, adminEmail, stats, quoteRequests: initialQuotes, jobApplications: initialApps, jobListings: initialJobs, contentItems: initialContent, users: initialUsers, brokerListings: initialBrokerListings }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'jobs' | 'applications' | 'quotes' | 'users' | 'broker'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [usersList, setUsersList] = useState<User[]>(initialUsers);

  // Responsive layout state
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Broker Board state
  const [brokerListings, setBrokerListings] = useState<BrokerListing[]>(initialBrokerListings || []);
  const [revenueStats, setRevenueStats] = useState<any[]>([]);
  const [loadingRevenue, setLoadingRevenue] = useState(false);

  // Manual transaction logging state
  const [loggingOrderId, setLoggingOrderId] = useState<string | null>(null);
  const [manualRevenue, setManualRevenue] = useState('');
  const [manualCost, setManualCost] = useState('');
  const [loggingTransaction, setLoggingTransaction] = useState(false);

  // Create listing form state
  const [showAddListingForm, setShowAddListingForm] = useState(false);
  const [newListingForm, setNewListingForm] = useState({
    type: 'SELL',
    product: 'Milk',
    quantity: '',
    price: '',
    description: '',
    contactName: adminName,
    contactPhone: '',
    contactEmail: adminEmail,
  });
  const [newListingSaving, setNewListingSaving] = useState(false);

  // Viewport resize effect
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch stats when broker board is opened
  useEffect(() => {
    if (activeTab === 'broker') {
      fetchRevenueStats();
    }
  }, [activeTab]);

  async function fetchRevenueStats() {
    setLoadingRevenue(true);
    try {
      const res = await fetch('/api/admin/marketplace?action=revenue');
      if (res.ok) {
        const data = await res.json();
        setRevenueStats(data);
      }
    } catch (err) {
      console.error("Error fetching revenue stats:", err);
    }
    setLoadingRevenue(false);
  }

  async function updateListingStatus(listingId: string, status: string) {
    const res = await fetch('/api/admin/marketplace', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId, listingStatus: status }),
    });
    if (res.ok) {
      setBrokerListings((prev) => prev.map((l) => l.id === listingId ? { ...l, status } : l));
    } else {
      alert('Failed to update listing status');
    }
  }

  async function deleteListing(listingId: string) {
    if (!confirm('Are you sure you want to permanently delete this broker listing?')) return;
    const res = await fetch('/api/admin/marketplace', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId }),
    });
    if (res.ok) {
      setBrokerListings((prev) => prev.filter((l) => l.id !== listingId));
    } else {
      alert('Failed to delete listing');
    }
  }

  async function logTransaction(orderId: string) {
    setLoggingTransaction(true);
    const res = await fetch('/api/admin/marketplace', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        orderStatus: 'COMPLETED',
        revenue: manualRevenue ? parseFloat(manualRevenue) : undefined,
        cost: manualCost ? parseFloat(manualCost) : undefined,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setBrokerListings((prev) => prev.map((l) => {
        const hasOrder = l.orders.some(o => o.id === orderId);
        if (!hasOrder) return l;
        return {
          ...l,
          orders: l.orders.map(o => o.id === orderId ? { ...o, status: 'COMPLETED', revenue: data.order.revenue, cost: data.order.cost } : o)
        };
      }));
      setLoggingOrderId(null);
      setManualRevenue('');
      setManualCost('');
      fetchRevenueStats();
    } else {
      alert('Failed to log order transaction details');
    }
    setLoggingTransaction(false);
  }

  async function updateOrderStatus(orderId: string, status: string) {
    const res = await fetch('/api/admin/marketplace', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, orderStatus: status }),
    });
    if (res.ok) {
      setBrokerListings((prev) => prev.map((l) => {
        const hasOrder = l.orders.some(o => o.id === orderId);
        if (!hasOrder) return l;
        return {
          ...l,
          orders: l.orders.map(o => o.id === orderId ? { ...o, status } : o)
        };
      }));
      fetchRevenueStats();
    } else {
      alert('Failed to update order status');
    }
  }

  async function handleCreateListing() {
    if (!newListingForm.quantity) {
      alert('Please specify the quantity');
      return;
    }
    setNewListingSaving(true);
    try {
      const res = await fetch('/api/marketplace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newListingForm),
      });

      if (res.ok) {
        const data = await res.json();
        const createdListing = {
          ...data.listing,
          user: { name: adminName, email: adminEmail, phone: newListingForm.contactPhone || '' },
          orders: [],
        };
        setBrokerListings((prev) => [createdListing, ...prev]);
        setShowAddListingForm(false);
        setNewListingForm({
          type: 'SELL',
          product: 'Milk',
          quantity: '',
          price: '',
          description: '',
          contactName: adminName,
          contactPhone: '',
          contactEmail: adminEmail,
        });
      } else {
        const err = await res.json();
        alert(`Error: ${err.error || 'Failed to create listing'}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Connection error: ${err.message || 'Unknown error'}`);
    } finally {
      setNewListingSaving(false);
    }
  }

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
    { key: 'broker', icon: <ShoppingBag size={18} />, label: 'Broker Board' },
  ] as const;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, sans-serif', position: 'relative' }}>
      
      {/* Mobile Drawer Backdrop */}
      {isMobile && mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 95,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: isMobile ? '240px' : (sidebarOpen ? '240px' : '64px'),
        background: 'linear-gradient(180deg, #0f172a 0%, #1e3a5f 100%)',
        transition: 'transform 0.3s ease, width 0.3s ease',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
        overflowX: 'hidden',
        ...(isMobile ? {
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-240px)',
          boxShadow: mobileMenuOpen ? '4px 0 24px rgba(0,0,0,0.15)' : 'none',
        } : {})
      }}>
        {/* Logo area */}
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'white', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Image src="/images/logo.png" alt="Logo" width={32} height={32} style={{ objectFit: 'contain' }} />
          </div>
          {(sidebarOpen || isMobile) && <div style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.2, whiteSpace: 'nowrap' }}>Admin<br /><span style={{ opacity: 0.6, fontSize: '0.7rem', fontWeight: 400 }}>Musikuli Dairies</span></div>}
        </div>

        {/* Toggle button (hidden on mobile) */}
        {!isMobile && (
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ margin: '0.75rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0.5rem', marginTop: isMobile ? '1rem' : 0 }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                if (isMobile) setMobileMenuOpen(false);
              }}
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
              {(sidebarOpen || isMobile) && tab.label}
            </button>
          ))}
        </nav>

        {/* Bottom links */}
        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <a href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            <Globe size={14} />{(sidebarOpen || isMobile) && 'View Website'}
          </a>
          <a href="/api/auth/signout" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textDecoration: 'none', marginTop: '0.75rem', whiteSpace: 'nowrap' }}>
            <LogOut size={14} />{(sidebarOpen || isMobile) && 'Sign Out'}
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        marginLeft: isMobile ? '0' : (sidebarOpen ? '240px' : '64px'), 
        flex: 1, 
        transition: 'margin-left 0.3s ease', 
        minHeight: '100vh',
        width: '100%',
        maxWidth: isMobile ? '100%' : `calc(100% - ${sidebarOpen ? '240px' : '64px'})`,
      }}>
        {/* Top Bar */}
        <header style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 90 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isMobile && (
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#0f172a',
                }}
              >
                <Menu size={22} />
              </button>
            )}
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
              {!isMobile && (
                <div style={{ fontSize: '0.85rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{adminName}</div>
                  <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Administrator</div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div style={{ padding: isMobile ? '1.25rem' : '2rem' }}>

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

          {/* ── BROKER BOARD TAB ─────────────────────────────────────────────── */}
          {activeTab === 'broker' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <p style={{ color: '#64748b', margin: 0 }}>
                  Manage marketplace listings, approve buyer/seller requests, view inquiries, and log completed brokerage transactions.
                </p>
                <button
                  id="btn-admin-add-listing"
                  onClick={() => setShowAddListingForm(!showAddListingForm)}
                  style={{ ...btnStyle, background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  {showAddListingForm ? 'Cancel Listing' : '+ Create Listing'}
                </button>
              </div>

              {/* Create Listing Form */}
              {showAddListingForm && (
                <div style={{ background: 'white', borderRadius: '16px', border: '2px solid #10b981', padding: '1.75rem', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>
                    + Add New Broker Listing (Pre-Approved)
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Trade Type *</label>
                      <select 
                        value={newListingForm.type} 
                        onChange={(e) => setNewListingForm({ ...newListingForm, type: e.target.value })} 
                        style={inputStyle}
                      >
                        <option value="SELL">Available to Sell (SELL)</option>
                        <option value="BUY">Wants to Buy (BUY)</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Product Category *</label>
                      <select 
                        value={newListingForm.product} 
                        onChange={(e) => setNewListingForm({ ...newListingForm, product: e.target.value })} 
                        style={inputStyle}
                      >
                        <option value="Milk">Dairy Milk</option>
                        <option value="Maize">Maize</option>
                        <option value="Beans">Beans</option>
                        <option value="Rice">Rice</option>
                        <option value="Goats">Live Goats</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Quantity *</label>
                      <input 
                        value={newListingForm.quantity} 
                        onChange={(e) => setNewListingForm({ ...newListingForm, quantity: e.target.value })} 
                        placeholder="e.g. 500 Bags / 10,000 Ltrs" 
                        style={inputStyle} 
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Price / Rate</label>
                      <input 
                        value={newListingForm.price} 
                        onChange={(e) => setNewListingForm({ ...newListingForm, price: e.target.value })} 
                        placeholder="e.g. UGX 1,500 / Kg (or Negotiable)" 
                        style={inputStyle} 
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Contact Name</label>
                      <input 
                        value={newListingForm.contactName} 
                        onChange={(e) => setNewListingForm({ ...newListingForm, contactName: e.target.value })} 
                        placeholder="Contact Person Name" 
                        style={inputStyle} 
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Contact Phone</label>
                      <input 
                        value={newListingForm.contactPhone} 
                        onChange={(e) => setNewListingForm({ ...newListingForm, contactPhone: e.target.value })} 
                        placeholder="e.g. +256 700 000000" 
                        style={inputStyle} 
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Contact Email</label>
                      <input 
                        value={newListingForm.contactEmail} 
                        onChange={(e) => setNewListingForm({ ...newListingForm, contactEmail: e.target.value })} 
                        placeholder="Contact Email Address" 
                        style={inputStyle} 
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={labelStyle}>Listing Description</label>
                    <textarea 
                      value={newListingForm.description} 
                      onChange={(e) => setNewListingForm({ ...newListingForm, description: e.target.value })} 
                      rows={3} 
                      placeholder="Specify product details, quality, delivery conditions, location, etc." 
                      style={{ ...inputStyle, resize: 'vertical' }} 
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button 
                      id="btn-admin-submit-listing"
                      onClick={handleCreateListing} 
                      disabled={newListingSaving || !newListingForm.quantity} 
                      style={{ ...btnStyle, background: '#10b981', color: 'white', flex: 1 }}
                    >
                      {newListingSaving ? 'Saving...' : '✓ Create Listing'}
                    </button>
                    <button 
                      onClick={() => setShowAddListingForm(false)} 
                      style={{ ...btnStyle, background: '#f1f5f9', color: '#374151' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Product-wise Revenue Summary */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={20} style={{ color: '#10b981' }} />
                  <span>Product-wise Revenue Tracking</span>
                </h3>
                {loadingRevenue ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Loading stats...</span>
                  </div>
                ) : revenueStats.length === 0 ? (
                  <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#64748b', fontStyle: 'italic' }}>
                    No completed brokerage orders found to calculate revenue.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    {revenueStats.map((stat) => (
                      <div key={stat.product} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.25rem', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>{stat.product}</span>
                          <span style={{ fontSize: '0.75rem', color: '#64748b', background: '#f1f5f9', padding: '0.15rem 0.5rem', borderRadius: '100px' }}>{stat.count} orders</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>Sales Revenue:</span>
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>UGX {stat.sales.toLocaleString()}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>Total Costs:</span>
                            <span style={{ fontWeight: 600, color: '#dc2626' }}>UGX {stat.cost.toLocaleString()}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #e2e8f0', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                            <span style={{ color: '#0f172a', fontWeight: 700 }}>Net Profit:</span>
                            <span style={{ fontWeight: 800, color: stat.net >= 0 ? '#059669' : '#dc2626' }}>
                              UGX {stat.net.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Transaction Logger Form */}
              {loggingOrderId && (
                <div style={{ background: 'white', borderRadius: '16px', border: '2px solid #1a56db', padding: '1.75rem', marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <DollarSign size={18} style={{ color: '#1a56db' }} />
                    <span>Log Transaction Details for Completed Order</span>
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                    Record the actual sale amount and production/handling costs for this completed transaction to track profit margins accurately.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={labelStyle}>Sales Revenue (UGX) *</label>
                      <input 
                        type="number" 
                        value={manualRevenue} 
                        onChange={(e) => setManualRevenue(e.target.value)} 
                        placeholder="e.g. 1500000" 
                        style={inputStyle} 
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Total Costs (UGX) *</label>
                      <input 
                        type="number" 
                        value={manualCost} 
                        onChange={(e) => setManualCost(e.target.value)} 
                        placeholder="e.g. 1200000" 
                        style={inputStyle} 
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button 
                      onClick={() => logTransaction(loggingOrderId)} 
                      disabled={loggingTransaction || !manualRevenue || !manualCost} 
                      style={{ ...btnStyle, background: '#1a56db', color: 'white', flex: 1 }}
                    >
                      {loggingTransaction ? 'Saving...' : '✓ Complete Order'}
                    </button>
                    <button 
                      onClick={() => {
                        setLoggingOrderId(null);
                        setManualRevenue('');
                        setManualCost('');
                      }} 
                      style={{ ...btnStyle, background: '#f1f5f9', color: '#374151' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Listings List */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Active Broker Listings & Inquiries</h3>
              {brokerListings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                  <p>No broker listings registered in the database.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {brokerListings.map((listing) => (
                    <div key={listing.id} style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                      
                      {/* Listing Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>{listing.product}</span>
                            <span style={{
                              fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.65rem', borderRadius: '100px',
                              background: listing.type === 'BUY' ? '#eff6ff' : '#ecfdf5',
                              color: listing.type === 'BUY' ? '#2563eb' : '#059669'
                            }}>
                              {listing.type === 'BUY' ? 'BUYING REQUEST' : 'SELLING LISTING'}
                            </span>
                            <StatusBadge status={listing.status} />
                          </div>
                          <div style={{ fontSize: '0.825rem', color: '#64748b' }}>
                            Quantity: <strong>{listing.quantity}</strong> &nbsp;·&nbsp; Price: <strong>{listing.price || 'Negotiable'}</strong>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                            Posted by: <strong>{listing.contactName || listing.user?.name || 'Anonymous'}</strong> &nbsp;·&nbsp; Phone: {listing.contactPhone || listing.user?.phone || 'N/A'} &nbsp;·&nbsp; Email: {listing.contactEmail || listing.user?.email || 'N/A'}
                          </div>
                        </div>

                        {/* Actions for Listing */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {listing.status === 'PENDING' && (
                            <>
                              <button onClick={() => updateListingStatus(listing.id, 'APPROVED')} style={{ ...smallBtn, background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Check size={14} /> Approve
                              </button>
                              <button onClick={() => updateListingStatus(listing.id, 'REJECTED')} style={{ ...smallBtn, background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Ban size={14} /> Reject
                              </button>
                            </>
                          )}
                          {listing.status === 'APPROVED' && (
                            <button onClick={() => updateListingStatus(listing.id, 'REJECTED')} style={{ ...smallBtn, background: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Ban size={14} /> Reject
                            </button>
                          )}
                          {listing.status === 'REJECTED' && (
                            <button onClick={() => updateListingStatus(listing.id, 'APPROVED')} style={{ ...smallBtn, background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Check size={14} /> Approve
                            </button>
                          )}
                          <button onClick={() => deleteListing(listing.id)} style={{ ...smallBtn, background: '#f1f5f9', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.25rem' }} title="Delete Listing">
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </div>

                      {/* Listing Description */}
                      {listing.description && (
                        <p style={{ fontSize: '0.875rem', color: '#475569', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px', margin: '0 0 1.25rem 0', whiteSpace: 'pre-wrap' }}>
                          {listing.description}
                        </p>
                      )}

                      {/* Associated inquiries/orders */}
                      <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.75rem' }}>
                          Inquiries & Offers ({listing.orders.length})
                        </h4>
                        
                        {listing.orders.length === 0 ? (
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', paddingLeft: '0.5rem' }}>
                            No inquiries submitted yet for this listing.
                          </div>
                        ) : (
                          <div style={{ overflowX: 'auto', border: '1px solid #f1f5f9', borderRadius: '10px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', textAlign: 'left', minWidth: '600px' }}>
                              <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                                  <th style={{ padding: '0.6rem 1rem', color: '#64748b' }}>Buyer/Contact</th>
                                  <th style={{ padding: '0.6rem 1rem', color: '#64748b' }}>Qty Requested</th>
                                  <th style={{ padding: '0.6rem 1rem', color: '#64748b' }}>Status</th>
                                  <th style={{ padding: '0.6rem 1rem', color: '#64748b' }}>Transaction Metric</th>
                                  <th style={{ padding: '0.6rem 1rem', color: '#64748b', textAlign: 'right' }}>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {listing.orders.map((order) => (
                                  <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '0.6rem 1rem' }}>
                                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{order.buyerName}</div>
                                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{order.buyerPhone} {order.buyerEmail && `| ${order.buyerEmail}`}</div>
                                    </td>
                                    <td style={{ padding: '0.6rem 1rem', fontWeight: 600, color: '#334155' }}>
                                      {order.quantity}
                                    </td>
                                    <td style={{ padding: '0.6rem 1rem' }}>
                                      <span style={{
                                        display: 'inline-flex', padding: '0.15rem 0.5rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700,
                                        background: order.status === 'COMPLETED' ? '#d1fae5' : (order.status === 'CANCELLED' ? '#fee2e2' : '#fef3c7'),
                                        color: order.status === 'COMPLETED' ? '#059669' : (order.status === 'CANCELLED' ? '#dc2626' : '#d97706'),
                                      }}>
                                        {order.status}
                                      </span>
                                    </td>
                                    <td style={{ padding: '0.6rem 1rem' }}>
                                      {order.status === 'COMPLETED' ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.75rem' }}>
                                          <span style={{ color: '#059669' }}>Rev: UGX {order.revenue?.toLocaleString() || 0}</span>
                                          <span style={{ color: '#dc2626' }}>Cost: UGX {order.cost?.toLocaleString() || 0}</span>
                                          <span style={{ fontWeight: 600, color: '#1e3a5f' }}>Profit: UGX {((order.revenue || 0) - (order.cost || 0)).toLocaleString()}</span>
                                        </div>
                                      ) : (
                                        <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Pending Log</span>
                                      )}
                                    </td>
                                    <td style={{ padding: '0.6rem 1rem', textAlign: 'right' }}>
                                      {order.status === 'PENDING' && (
                                        <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                                          <button 
                                            onClick={() => {
                                              setLoggingOrderId(order.id);
                                              setManualRevenue('');
                                              setManualCost('');
                                            }}
                                            style={{ ...smallBtn, padding: '0.2rem 0.5rem', background: '#eff6ff', color: '#1a56db', fontSize: '0.75rem' }}
                                          >
                                            Complete Sale
                                          </button>
                                          <button 
                                            onClick={() => updateOrderStatus(order.id, 'CANCELLED')}
                                            style={{ ...smallBtn, padding: '0.2rem 0.5rem', background: '#fee2e2', color: '#dc2626', fontSize: '0.75rem' }}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      )}
                                      {order.status === 'COMPLETED' && (
                                        <button 
                                          onClick={() => updateOrderStatus(order.id, 'PENDING')}
                                          style={{ ...smallBtn, padding: '0.2rem 0.5rem', background: '#f1f5f9', color: '#64748b', fontSize: '0.75rem' }}
                                        >
                                          Re-open
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
