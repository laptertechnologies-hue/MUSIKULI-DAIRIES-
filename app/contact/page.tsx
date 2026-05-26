import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Musikuli Dairies Limited',
  description: 'Get in touch with Musikuli Dairies Limited. Visit us in Luwero, call +256200933861, or email musikuliimran@gmail.com.',
};

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <span className="section-tag">Get In Touch</span>
        <h1>Contact Musikuli Dairies Limited</h1>
        <p>We&apos;re here to help. Reach out via phone, email, or visit us at our farm in Luwero.</p>
      </div>

      <section className="contact-section" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div>
              <span className="section-tag">Our Details</span>
              <h2 className="section-title" style={{ marginBottom: '2rem' }}>How to Reach Us</h2>
              <div className="contact-info-items">
                {[
                  {
                    icon: '📍',
                    cls: 'blue',
                    title: 'Physical Address',
                    desc: 'Nsozibirye Village, Kigombe Parish, Luwero Sub County, Luwero District, Uganda',
                  },
                  {
                    icon: '📮',
                    cls: 'green',
                    title: 'Postal Address',
                    desc: 'P.O Box 170174, Luwero-Uganda',
                  },
                  {
                    icon: '📞',
                    cls: 'blue',
                    title: 'Telephone',
                    desc: '+256 200 933 861',
                  },
                  {
                    icon: '✉️',
                    cls: 'gold',
                    title: 'Email Address',
                    desc: 'musikuliimran@gmail.com',
                  },
                  {
                    icon: '🕐',
                    cls: 'green',
                    title: 'Business Hours',
                    desc: 'Monday – Saturday: 7:00 AM – 6:00 PM',
                  },
                ].map((c) => (
                  <div key={c.title} className="contact-info-card">
                    <div className={`contact-info-icon ${c.cls}`}>{c.icon}</div>
                    <div>
                      <h4>{c.title}</h4>
                      <p>{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                <a href="tel:+256200933861" className="btn btn-primary" id="contact-call-btn">📞 Call Now</a>
                <a href="mailto:musikuliimran@gmail.com" className="btn" style={{ border: '2px solid var(--blue-600)', color: 'var(--blue-600)', background: 'transparent', fontFamily: 'Inter, sans-serif', fontWeight: 600 }} id="contact-email-btn">✉️ Send Email</a>
                <a href="https://wa.me/256200933861" target="_blank" rel="noopener noreferrer" className="btn btn-green" id="contact-whatsapp-btn">💬 WhatsApp</a>
              </div>
            </div>

            {/* Map */}
            <div>
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63678.43247756754!2d32.421!3d0.824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177b0b3be5e4e5a7%3A0x5d10f8a4f0e2e3a5!2sLuwero%2C%20Uganda!5e0!3m2!1sen!2s!4v1716700000000!5m2!1sen!2s"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Musikuli Dairies Location — Luwero, Uganda"
                />
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '0.75rem' }}>
                📍 Luwero District, Central Uganda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Info */}
      <section style={{ padding: '3rem 1.5rem 5rem', background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ background: 'white', border: '1px solid var(--gray-100)', borderRadius: '20px', padding: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏢</div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', color: 'var(--blue-900)', marginBottom: '0.25rem' }}>Company Name</h4>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>Musikuli Dairies Limited</p>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📋</div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', color: 'var(--blue-900)', marginBottom: '0.25rem' }}>Registration Number</h4>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>80034163888407</p>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📅</div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', color: 'var(--blue-900)', marginBottom: '0.25rem' }}>Date Incorporated</h4>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>29th June, 2023</p>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌍</div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', color: 'var(--blue-900)', marginBottom: '0.25rem' }}>Country</h4>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>Republic of Uganda</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
