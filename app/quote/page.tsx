'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FORMSPREE_ID = 'xwpbdgek'; // Replace with your actual Formspree ID

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        setError('Something went wrong. Please try again or call us directly.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-hero">
        <span className="section-tag">Get a Quote</span>
        <h1>Request a Quotation</h1>
        <p>Fill in the form below and we&apos;ll get back to you within 24 hours with a competitive quote.</p>
      </div>

      <section className="quote-section" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <div className="quote-layout">
            {/* Info Side */}
            <div className="quote-info">
              <span className="section-tag">Why Choose Us</span>
              <h2>We Deliver Quality &amp; Value</h2>
              <p>
                From fresh milk to bulk agricultural produce, we offer competitive pricing, 
                reliable supply and excellent customer service. Our team responds to all quotes 
                within 24 hours.
              </p>
              <div className="quote-contact-items">
                {[
                  { icon: <Image src="/icons/phone.svg" alt="" width={24} height={24} />, label: 'Phone', val: '+256 200 933 861' },
                  { icon: <Image src="/icons/email.svg" alt="" width={24} height={24} />, label: 'Email', val: 'info@musikulidairies.com' },
                  { icon: <Image src="/icons/location.svg" alt="" width={24} height={24} />, label: 'Address', val: 'P.O Box 170174, Luwero-Uganda' },
                  { icon: <Image src="/icons/vision.svg" alt="" width={24} height={24} />, label: 'Response Time', val: 'Within 24 hours' },
                ].map((c) => (
                  <div className="quote-contact-item" key={c.label}>
                    <div className="quote-contact-icon">{c.icon}</div>
                    <div>
                      <strong>{c.label}</strong>
                      <span>{c.val}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg, var(--blue-900), var(--blue-700))', borderRadius: '16px', padding: '1.5rem', color: 'white' }}>
                <h4 style={{ color: 'white', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>Prefer to Talk?</h4>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  Call us directly or send a WhatsApp message for faster response.
                </p>
                <a href="tel:+256200933861" className="btn" style={{ background: 'white', color: 'var(--blue-700)', fontWeight: 700, marginTop: '1rem', fontFamily: 'Inter, sans-serif' }} id="quote-call-btn">
                  Call Now
                </a>
              </div>
            </div>

            {/* Form Side */}
            <div className="quote-form-wrapper">
              {submitted ? (
                <div className="form-success">
                  <div className="form-success-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}><Image src="/icons/award.svg" alt="Success" width={48} height={48} /></div>
                  <h3>Quote Request Sent!</h3>
                  <p>Thank you! We&apos;ve received your request and will contact you within 24 hours at the details you provided.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-primary"
                    style={{ marginTop: '1.5rem' }}
                    id="quote-another-btn"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="quote-form" noValidate>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--blue-900)', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                    Quotation Request Form
                  </h3>

                  {/* Hidden fields for email routing */}
                  <input type="hidden" name="_subject" value="New Quote Request — Musikuli Dairies Website" />
                  <input type="hidden" name="_replyto" value="info@musikulidairies.com" />

                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="quote-name">Full Name *</label>
                      <input id="quote-name" name="name" type="text" placeholder="Your full name" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="quote-company">Company / Organisation</label>
                      <input id="quote-company" name="company" type="text" placeholder="Company name (optional)" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="quote-email">Email Address *</label>
                      <input id="quote-email" name="email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="quote-phone">Phone Number *</label>
                      <input id="quote-phone" name="phone" type="tel" placeholder="+256 xxx xxx xxx" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="quote-location">Your Location</label>
                      <input id="quote-location" name="location" type="text" placeholder="City / District" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="quote-order-type">Order Type *</label>
                      <select id="quote-order-type" name="order_type" required>
                        <option value="">Select order type</option>
                        <option value="retail">Retail Purchase</option>
                        <option value="wholesale">Wholesale Order</option>
                        <option value="outgrower">Outgrower Partnership</option>
                        <option value="supply">Regular Supply Contract</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group full">
                      <label>Products of Interest *</label>
                      <div className="form-checkbox-group">
                        {[
                          { id: 'q-milk', name: 'products', value: 'Fresh Milk (Unprocessed)', label: 'Fresh Milk (Unprocessed)' },
                          { id: 'q-milk-p', name: 'products', value: 'Processed Milk', label: 'Processed Milk' },
                          { id: 'q-maize', name: 'products', value: 'Maize', label: 'Maize' },
                          { id: 'q-beans', name: 'products', value: 'Beans', label: 'Beans' },
                          { id: 'q-rice', name: 'products', value: 'Rice', label: 'Rice' },
                          { id: 'q-gnuts', name: 'products', value: 'Groundnuts', label: 'Groundnuts' },
                        ].map((cb) => (
                          <label key={cb.id} className="form-checkbox" htmlFor={cb.id}>
                            <input type="checkbox" id={cb.id} name={cb.name} value={cb.value} />
                            {cb.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="quote-quantity">Estimated Quantity</label>
                      <input id="quote-quantity" name="quantity" type="text" placeholder="e.g. 500 kg, 2 tonnes, 1000 litres" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="quote-delivery">Delivery Needed?</label>
                      <select id="quote-delivery" name="delivery">
                        <option value="">Select option</option>
                        <option value="yes-luwero">Yes — Luwero area</option>
                        <option value="yes-kampala">Yes — Kampala</option>
                        <option value="yes-other">Yes — Other location</option>
                        <option value="pickup">No — I will collect</option>
                      </select>
                    </div>

                    <div className="form-group full">
                      <label htmlFor="quote-message">Additional Details / Message</label>
                      <textarea
                        id="quote-message"
                        name="message"
                        placeholder="Tell us more about your requirements, preferred delivery schedule, any specific quality requirements, or questions..."
                      />
                    </div>
                  </div>

                  {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.75rem 1rem', color: '#dc2626', fontSize: '0.875rem', marginBottom: '1rem' }}>
                      ⚠️ {error}
                    </div>
                  )}

                  <button type="submit" className="form-submit" disabled={loading} id="quote-submit-btn">
                    {loading ? 'Sending...' : 'Submit Quote Request'}
                  </button>

                  <p style={{ fontSize: '0.78rem', color: 'var(--gray-500)', textAlign: 'center', marginTop: '0.75rem' }}>
                    Your details are sent securely to info@musikulidairies.com. We respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
