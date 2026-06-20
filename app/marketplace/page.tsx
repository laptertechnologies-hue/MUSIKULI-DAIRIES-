'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingBag, Filter, MessageSquare, Phone, Mail, User, Info, Check, X, Loader2, ArrowRight } from 'lucide-react';

type BrokerListing = {
  id: string;
  type: string; // BUY or SELL
  product: string; // Maize, Beans, Goats, Milk, Rice, etc.
  quantity: string;
  price: string | null;
  description: string | null;
  status: string;
  contactName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  createdAt: string;
  user?: {
    name: string | null;
    email: string | null;
    phone: string | null;
  } | null;
};

export default function MarketplacePage() {
  const [listings, setListings] = useState<BrokerListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('ALL'); // ALL, BUY, SELL
  const [filterProduct, setFilterProduct] = useState<string>('ALL'); // ALL, Maize, Beans, Goats, Milk, Rice

  // Modal Inquiry state
  const [selectedListing, setSelectedListing] = useState<BrokerListing | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [quantity, setQuantity] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fetch approved listings
  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        let url = '/api/marketplace';
        const params = new URLSearchParams();
        if (filterType !== 'ALL') params.append('type', filterType);
        if (filterProduct !== 'ALL') params.append('product', filterProduct);
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setListings(data);
        } else {
          console.error('Failed to fetch listings');
        }
      } catch (err) {
        console.error('Error fetching marketplace listings:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, [filterType, filterProduct]);

  // Open modal
  const openInquiryModal = (listing: BrokerListing) => {
    setSelectedListing(listing);
    setQuantity(listing.quantity); // Autofill default quantity
    setBuyerName('');
    setBuyerPhone('');
    setBuyerEmail('');
    setSubmitSuccess(false);
    setSubmitError('');
  };

  // Submit order inquiry
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/marketplace/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: selectedListing.id,
          buyerName,
          buyerPhone,
          buyerEmail,
          quantity
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSelectedListing(null);
          setSubmitSuccess(false);
        }, 3000);
      } else {
        setSubmitError(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('A connection error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* HTML Metadata SEO tags */}
      <title>Broker Marketplace | Musikuli Dairies Limited</title>
      <meta name="description" content="Securely buy and sell agricultural produce, bulk live goats, and dairy milk through our verified broker marketplace." />

      {/* Hero Banner */}
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', color: 'white', textAlign: 'center' }}>
        <span className="section-tag" style={{ background: 'rgba(255, 255, 255, 0.15)', color: 'white' }}>Brokerage Division</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '1rem 0' }}>Broker Marketplace</h1>
        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9 }}>
          Connect and trade high-quality bulk agricultural commodities, livestock, and premium dairy milk. Handled securely by Musikuli Dairies.
        </p>
      </div>

      <section style={{ padding: '4rem 1.5rem', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Filters Bar */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            border: '1px solid #e2e8f0',
            marginBottom: '3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              <Filter size={18} style={{ color: '#1d4ed8' }} />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Filter Listings</h2>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
              {/* Product Filter */}
              <div style={{ flex: '1 1 100%' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem' }}>Product Category</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {[
                    { key: 'ALL', label: 'All Products' },
                    { key: 'Milk', label: 'Dairy Milk' },
                    { key: 'Maize', label: 'Maize' },
                    { key: 'Beans', label: 'Beans' },
                    { key: 'Rice', label: 'Rice' },
                    { key: 'Goats', label: 'Live Goats' }
                  ].map((p) => (
                    <button
                      key={p.key}
                      id={`filter-prod-${p.key.toLowerCase()}`}
                      onClick={() => setFilterProduct(p.key)}
                      style={{
                        padding: '0.4rem 0.9rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        borderRadius: '100px',
                        border: '1px solid',
                        borderColor: filterProduct === p.key ? '#1d4ed8' : '#e2e8f0',
                        background: filterProduct === p.key ? '#eff6ff' : 'white',
                        color: filterProduct === p.key ? '#1d4ed8' : '#475569',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        outline: 'none'
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Listings Section */}
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 0', gap: '1rem' }}>
              <Loader2 size={40} style={{ color: '#1d4ed8' }} className="animate-spin" />
              <p style={{ color: '#64748b', fontWeight: 500 }}>Fetching active marketplace listings...</p>
            </div>
          ) : listings.length === 0 ? (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '5rem 2rem',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
            }}>
              <ShoppingBag size={54} style={{ color: '#cbd5e1', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>No Listings Found</h3>
              <p style={{ color: '#64748b', maxWidth: '450px', margin: '0 auto' }}>
                There are currently no active approved listings matching your filters. Please adjust your filters or check back later!
              </p>
              <button
                id="btn-reset-filters"
                onClick={() => { setFilterType('ALL'); setFilterProduct('ALL'); }}
                style={{
                  marginTop: '1.5rem',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '100px',
                  border: 'none',
                  background: '#1d4ed8',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem'
            }}>
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    padding: '1.75rem',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.02)';
                  }}
                >
                  
                  <div>
                    {/* Listing Type Indicator Top Banner */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      padding: '0.35rem 1rem',
                      borderBottomLeftRadius: '12px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      background: listing.type === 'BUY' ? '#eff6ff' : '#ecfdf5',
                      color: listing.type === 'BUY' ? '#1d4ed8' : '#047857'
                    }}>
                      {listing.type === 'BUY' ? 'Wants to Buy' : 'Available to Sell'}
                    </div>

                    <div style={{ marginTop: '0.75rem' }}>
                      {/* Product Name */}
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                        {listing.product}
                      </h3>
                      
                      {/* Quantity & Price info */}
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                        <div style={{ background: '#f8fafc', padding: '0.5rem 0.85rem', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                          <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Quantity</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>{listing.quantity}</div>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '0.5rem 0.85rem', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                          <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Price</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>{listing.price || 'Negotiable'}</div>
                        </div>
                      </div>

                      {/* Description */}
                      {listing.description && (
                        <p style={{
                          fontSize: '0.875rem',
                          color: '#475569',
                          lineHeight: 1.6,
                          marginBottom: '1.5rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          height: '4.8em'
                        }}>
                          {listing.description}
                        </p>
                      )}

                      {/* Contact metadata */}
                      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.35rem' }}>
                          <User size={13} />
                          <span>Owner: <strong>{listing.contactName || 'Verified Broker'}</strong></span>
                        </div>
                        {listing.contactPhone && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                            <Phone size={13} />
                            <span>Phone: {listing.contactPhone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Inquiry action CTA */}
                  <button
                    id={`btn-inquire-${listing.id}`}
                    onClick={() => openInquiryModal(listing)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: 'none',
                      background: listing.type === 'BUY' ? '#1d4ed8' : '#10b981',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'filter 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.95)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
                  >
                    <span>Send Order Inquiry</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Secure trade info card */}
          <div style={{
            marginTop: '4rem',
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            border: '1px solid #bfdbfe',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1.25rem',
            boxShadow: '0 4px 20px rgba(29, 78, 216, 0.03)'
          }}>
            <div style={{
              background: '#1d4ed8',
              borderRadius: '12px',
              padding: '0.6rem',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Info size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a', margin: '0 0 0.5rem 0' }}>Musikuli Dairies Safe-Trade Brokerage Guarantee</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#1e40af', lineHeight: 1.65 }}>
                Our brokerage department verifies all marketplace listings. Once you place an inquiry, our logistics team coordinates direct crop testing, bulk transport handling, and transparent transaction reconciliation. Payments can be escrowed securely through Mobile Money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal Overlay */}
      {selectedListing && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: '1rem'
        }}>
          <div
            id="inquiry-modal-container"
            style={{
              background: 'white',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '500px',
              padding: '2rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              position: 'relative',
              animation: 'scaleUp 0.25s ease-out'
            }}
          >
            {/* Close Button */}
            <button
              id="btn-close-inquiry"
              onClick={() => setSelectedListing(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
            >
              <X size={16} />
            </button>

            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#d1fae5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Inquiry Submitted!</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Your request has been securely recorded. Musikuli Dairies logistics team and the listing owner will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>Send Order Inquiry</h3>
                <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '1.5rem' }}>
                  Submit an inquiry on: <strong>{selectedListing.product} ({selectedListing.type === 'BUY' ? 'Buying Request' : 'For Sale'})</strong>
                </p>

                {submitError && (
                  <div style={{
                    background: '#fee2e2',
                    border: '1px solid #fca5a5',
                    borderRadius: '10px',
                    padding: '0.75rem',
                    fontSize: '0.8rem',
                    color: '#b91c1c',
                    marginBottom: '1.25rem'
                  }}>
                    {submitError}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {/* Name field */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>Your Name *</label>
                    <input
                      id="input-buyer-name"
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. John Doe"
                      style={inputStyle}
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>Phone Number *</label>
                    <input
                      id="input-buyer-phone"
                      type="tel"
                      required
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="e.g. +256 700 000000"
                      style={inputStyle}
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>Email Address (Optional)</label>
                    <input
                      id="input-buyer-email"
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      style={inputStyle}
                    />
                  </div>

                  {/* Quantity needed field */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>Quantity Requested *</label>
                    <input
                      id="input-order-qty"
                      type="text"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 100 Bags / 2000 Litres"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <button
                  id="btn-submit-inquiry"
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#1d4ed8',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare size={16} />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Inline styles helper
const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.9rem',
  borderRadius: '10px',
  border: '1.5px solid #cbd5e1',
  fontSize: '0.875rem',
  color: '#0f172a',
  background: 'white',
  outline: 'none',
  boxSizing: 'border-box' as const,
  fontFamily: 'Inter, sans-serif'
};
