import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Musikuli Dairies Limited',
  description: 'Learn about Musikuli Dairies Limited — our story, founders, mission, vision and core values. Incorporated June 2023 in Luwero, Uganda.',
};

const founders = [
  { name: 'Ibrahim Musikuli', role: 'Co-Founder & Managing Director', image: '/images/founder-ibrahim.png' },
  { name: 'Reginah Nabateregga', role: 'Co-Founder & Director', image: '/images/founder-reginah.png' },
];

const values = [
  { icon: '/icons/target.svg', title: 'Ethics, Integrity & Excellence', desc: 'We uphold the highest standards of ethical conduct in all our dealings.' },
  { icon: '/icons/target.svg', title: 'Professionalism', desc: 'We maintain professional standards across all our operations and partnerships.' },
  { icon: '/icons/target.svg', title: 'Sustainability', desc: 'We promote sustainable agriculture that protects our environment for future generations.' },
  { icon: '/icons/target.svg', title: 'Total Quality Management', desc: 'Quality is at the core of every product and service we deliver.' },
  { icon: '/icons/target.svg', title: 'Productivity', desc: 'We continuously seek ways to improve output and efficiency.' },
  { icon: '/icons/target.svg', title: 'Continuous Improvement', desc: 'We learn, adapt and improve in everything we do.' },
  { icon: '/icons/target.svg', title: 'Efficiency & Effectiveness', desc: 'We deliver results efficiently, maximizing value for all stakeholders.' },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <span className="section-tag">Our Story</span>
        <h1>About Musikuli Dairies Limited</h1>
        <p>A family-built company committed to quality, sustainability and community empowerment across Uganda.</p>
      </div>

      {/* Company Story */}
      <section className="about-section" id="story" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrapper">
              <Image
                src="/images/founders pic.jpeg"
                alt="Musikuli Dairies founders"
                width={580}
                height={500}
                className="about-image-main"
              />
              <div className="about-badge-card">
                <div className="about-badge-icon">
                  <Image src="/icons/award.svg" alt="" width={24} height={24} />
                </div>
                <div className="about-badge-text">
                  <strong>Est. 2023</strong>
                  <span>Incorporated June 29, 2023</span>
                </div>
              </div>
            </div>
            <div className="about-content">
              <span className="section-tag">Our Background</span>
              <h2 className="section-title">Built on Passion for Agriculture</h2>
              <p className="about-desc">
                <strong>Musikuli Dairies Limited</strong> is a limited liability company incorporated on the 
                29th day of June, 2023, with registration number <strong>80034163888407</strong>.
              </p>
              <p className="about-desc">
                Our farm is located at <strong>Nsozibirye Village, Kigombe Parish, Luwero Sub County</strong> in 
                Luwero district. The company deals in buying and selling of agricultural produce and milk.
              </p>
              <p className="about-desc">
                Uganda boasts a diverse range of agricultural produce but the company deals mainly in 
                <strong> Maize, Beans, Rice, Groundnuts</strong> and buying &amp; selling both 
                processed and unprocessed milk.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <Link href="/quote" className="btn btn-primary" id="about-quote-btn">Get a Quote</Link>
                <Link href="/contact" className="btn" style={{ border: '2px solid var(--blue-600)', color: 'var(--blue-600)', background: 'transparent' }} id="about-contact-btn">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: 'var(--section-pad)', background: 'var(--gray-50)' }} id="mission">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-tag">Our Purpose</span>
            <h2 className="section-title">Mission &amp; Vision</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--blue-900), var(--blue-700))', borderRadius: '24px', padding: '2.5rem', color: 'white' }}>
              <div className="mv-card-icon" style={{ background: 'rgba(255,255,255,0.1)', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', marginBottom: '1.5rem' }}>
                <Image src="/icons/target.svg" alt="" width={32} height={32} style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>Our Mission</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
                The company is committed to become the premier supplier of agricultural products and milk. 
                Musikuli Dairies Ltd is dedicated to building long-term relationships with suppliers, customers 
                and consumers through consistent and sustainable supply of quality products.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginTop: '1rem' }}>
                The company&apos;s goal is to grow steadily while promoting sustainable agriculture practices 
                that positively impact communities and improving livelihoods of local farmers across Uganda.
              </p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, var(--green-800), var(--green-600))', borderRadius: '24px', padding: '2.5rem', color: 'white' }}>
              <div className="mv-card-icon" style={{ background: 'rgba(255,255,255,0.1)', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', marginBottom: '1.5rem' }}>
                <Image src="/icons/vision.svg" alt="" width={32} height={32} style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>Our Vision</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
                To be the market leader of affordable high quality Agricultural products to several customers, 
                recognized for our commitment to supply high quality agro products while also contributing to 
                the economic and social development of the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section style={{ padding: 'var(--section-pad)', background: 'white' }} id="founders">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-tag">Leadership</span>
            <h2 className="section-title">Our Founders</h2>
            <p className="section-subtitle mx-auto">Passionate entrepreneurs who turned their love for agriculture into a thriving business.</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {founders.map((f) => (
              <div key={f.name} style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-100)', borderRadius: '20px', padding: '2.5rem 2rem', textAlign: 'center', minWidth: '280px', maxWidth: '320px', flex: '1' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.25rem', border: '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', position: 'relative' }}>
                  <Image src={f.image} alt={f.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--blue-900)', marginBottom: '0.35rem' }}>{f.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{f.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: 'var(--section-pad)', background: 'var(--blue-950)' }} id="values">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-tag" style={{ background: 'rgba(59,130,246,0.15)', color: 'var(--blue-300)' }}>What Drives Us</span>
            <h2 className="section-title" style={{ color: 'white' }}>Our Core Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.5rem' }}>
            {values.map((v) => (
              <div key={v.title} className="testimonial-card">
                <div className="service-card-icon blue" style={{ marginBottom: '1rem', width: '48px', height: '48px' }}>
                  <Image src={v.icon} alt="" width={24} height={24} />
                </div>
                <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>{v.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section style={{ padding: 'var(--section-pad)', background: 'white' }}>
        <div className="container text-center">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Our Location &amp; Contact</h2>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            {[
              { icon: '/icons/target.svg', label: 'Address', val: 'Nsozibirye-Kigombe, Luwero Sub County, Luwero District, Uganda' },
              { icon: '/icons/mailbox.svg', label: 'P.O Box', val: 'P.O Box 170174, Luwero-Uganda' },
              { icon: '/icons/phone.svg', label: 'Telephone', val: '+256 200 933 861' },
              { icon: '/icons/email.svg', label: 'Email', val: 'musikuliimran@gmail.com' },
            ].map((c) => (
              <div key={c.label} style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-100)', borderRadius: '16px', padding: '1.5rem', minWidth: '200px', flex: '1', maxWidth: '280px' }}>
                <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
                  <Image src={c.icon} alt="" width={32} height={32} />
                </div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-500)', marginBottom: '0.25rem', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{c.label}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--gray-800)', fontWeight: 500 }}>{c.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
