"use client";

import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimation from '@/components/ScrollAnimation';

const founders = [
  { name: 'Ibrahim Musikuli', role: 'Co-Founder & Managing Director', image: '/images/gallery-founder-farm-1.jpg', position: 'center 15%' },
  { name: 'Reginah Nabateregga', role: 'Co-Founder & Director', image: '/images/founders pic.jpeg', position: 'center 50%' },
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
      <section className="about-section" id="story">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrapper">
              <Image
                src="/images/founders pic.jpeg"
                alt="Musikuli Dairies founders Ibrahim Musikuli and Reginah Nabateregga"
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
            <ScrollAnimation delay={200}>
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
                  <Link href="/contact" className="btn btn-outline" id="about-contact-btn">Contact Us</Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section" id="mission">
        <div className="container">
          <ScrollAnimation>
            <div className="text-center mission-header">
              <span className="section-tag">Our Purpose</span>
              <h2 className="section-title">Mission &amp; Vision</h2>
            </div>
          </ScrollAnimation>
          <div className="mission-grid">
            <ScrollAnimation>
              <div className="mission-card mission-card-blue">
                <div className="mission-icon">
                  <Image src="/icons/target.svg" alt="" width={32} height={32} className="icon-white" />
                </div>
                <h3 className="mission-title">Our Mission</h3>
                <p className="mission-text">
                  The company is committed to become the premier supplier of agricultural products and milk. 
                  Musikuli Dairies Ltd is dedicated to building long-term relationships with suppliers, customers 
                  and consumers through consistent and sustainable supply of quality products.
                </p>
                <p className="mission-text mt-4">
                  The company&apos;s goal is to grow steadily while promoting sustainable agriculture practices 
                  that positively impact communities and improving livelihoods of local farmers across Uganda.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
              <div className="mission-card mission-card-green">
                <div className="mission-icon">
                  <Image src="/icons/vision.svg" alt="" width={32} height={32} className="icon-white" />
                </div>
                <h3 className="mission-title">Our Vision</h3>
                <p className="mission-text">
                  To be the market leader of affordable high quality Agricultural products to several customers, 
                  recognized for our commitment to supply high quality agro products while also contributing to 
                  the economic and social development of the country.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="founders-section" id="founders">
        <div className="container">
          <div className="text-center founders-header">
            <span className="section-tag">Leadership</span>
            <h2 className="section-title">Our Founders</h2>
            <p className="section-subtitle mx-auto">Passionate entrepreneurs who turned their love for agriculture into a thriving business.</p>
          </div>
          <div className="founders-flex">
            {founders.map((f, i) => (
              <ScrollAnimation key={f.name} delay={i * 200}>
                <div className="founder-card">
                  <div className="founder-img-wrapper">
                    <Image src={f.image} alt={f.name} fill style={{ objectFit: 'cover', objectPosition: f.position || 'center' }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  </div>
                  <h3 className="founder-name">{f.name}</h3>
                  <p className="founder-role">{f.role}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section" id="values">
        <div className="container">
          <div className="text-center values-header">
            <span className="section-tag values-tag">What Drives Us</span>
            <h2 className="section-title text-white">Our Core Values</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <ScrollAnimation key={v.title} delay={i * 100}>
                <div className="value-card">
                  <div className="value-icon-wrapper">
                    <Image src={v.icon} alt="" width={24} height={24} className="icon-white" />
                  </div>
                  <h4 className="value-title">{v.title}</h4>
                  <p className="value-desc">{v.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-section">
        <div className="container text-center">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Our Location &amp; Contact</h2>
          <div className="contact-flex">
            {[
              { icon: '/icons/target.svg', label: 'Address', val: 'Nsozibirye-Kigombe, Luwero Sub County, Luwero District, Uganda' },
              { icon: '/icons/mailbox.svg', label: 'P.O Box', val: 'P.O Box 170174, Luwero-Uganda' },
              { icon: '/icons/phone.svg', label: 'Telephone', val: '+256 200 933 861' },
              { icon: '/icons/email.svg', label: 'Email', val: 'info@musikulidairies.com' }
            ].map((c, i) => (
              <ScrollAnimation key={c.label} delay={i * 100}>
                <div className="contact-card">
                  <div className="contact-icon-wrapper">
                    <Image src={c.icon} alt="" width={32} height={32} />
                  </div>
                  <div className="contact-label">{c.label}</div>
                  <div className="contact-val">{c.val}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .about-section {
          padding-top: 5rem;
          padding-bottom: 5rem;
        }

        .mission-section {
          padding: var(--section-pad);
          background: var(--gray-50);
        }

        .mission-header {
          margin-bottom: 3rem;
        }

        .mission-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .mission-card {
          border-radius: 24px;
          padding: 2.5rem;
          color: white;
        }

        .mission-card-blue {
          background: linear-gradient(135deg, var(--blue-900), var(--blue-700));
        }

        .mission-card-green {
          background: linear-gradient(135deg, var(--green-800), var(--green-600));
        }

        .mission-icon {
          background: rgba(255,255,255,0.1);
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          margin-bottom: 1.5rem;
        }

        .mission-title {
          font-size: 1.5rem;
          color: white;
          margin-bottom: 1rem;
        }

        .mission-text {
          color: rgba(255,255,255,0.8);
          line-height: 1.8;
        }

        .mt-4 { margin-top: 1rem; }

        .founders-section {
          padding: var(--section-pad);
          background: white;
        }

        .founders-header { margin-bottom: 3rem; }

        .founders-flex {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .founder-card {
          background: var(--gray-50);
          border: 1px solid var(--gray-100);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          text-align: center;
          min-width: 280px;
          max-width: 320px;
          flex: 1;
        }

        .founder-img-wrapper {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 1.25rem;
          border: 4px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          position: relative;
        }

        .founder-name {
          font-size: 1.2rem;
          color: var(--blue-900);
          margin-bottom: 0.35rem;
        }

        .founder-role {
          font-size: 0.875rem;
          color: var(--gray-500);
        }

        .values-section {
          padding: var(--section-pad);
          background: var(--blue-950);
        }

        .values-header { margin-bottom: 3rem; }

        .values-tag {
          background: rgba(59,130,246,0.15);
          color: var(--blue-300);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .value-card {
          background: rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .value-icon-wrapper {
          margin-bottom: 1rem;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(59,130,246,0.15);
          border-radius: 12px;
        }

        .value-title {
          color: white;
          margin-bottom: 0.5rem;
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
        }

        .value-desc {
          color: rgba(255,255,255,0.65);
          font-size: 0.875rem;
          line-height: 1.7;
        }

        .contact-section {
          padding: var(--section-pad);
          background: white;
        }

        .contact-flex {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .contact-card {
          background: var(--gray-50);
          border: 1px solid var(--gray-100);
          border-radius: 16px;
          padding: 1.5rem;
          min-width: 200px;
          flex: 1;
          max-width: 280px;
        }

        .contact-icon-wrapper {
          margin-bottom: 0.75rem;
          display: flex;
          justify-content: center;
        }

        .contact-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--gray-500);
          margin-bottom: 0.25rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
        }

        .contact-val {
          font-size: 0.9rem;
          color: var(--gray-800);
          font-weight: 500;
        }

        .icon-white {
          filter: brightness(0) invert(1);
        }

        .text-white { color: white; }

        .about-image-wrapper {
          position: relative;
        }

        .about-image-main {
          border-radius: 24px;
          object-fit: cover;
          object-position: center 55%;
          width: 100%;
          height: auto;
        }

        .about-badge-card {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          background: white;
          border-radius: 16px;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .about-badge-icon {
          background: var(--blue-100);
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-badge-text {
          display: flex;
          flex-direction: column;
        }

        .about-badge-text strong {
          font-size: 1rem;
          color: var(--blue-900);
        }

        .about-badge-text span {
          font-size: 0.75rem;
          color: var(--gray-500);
        }

        .about-content {
          padding: 1rem 0;
        }

        .about-desc {
          margin-bottom: 1.25rem;
          line-height: 1.7;
          color: var(--gray-600);
        }

        .btn-outline {
          border: 2px solid var(--blue-600);
          color: var(--blue-600);
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s ease;
        }

        .btn-outline:hover {
          background: var(--blue-600);
          color: white;
        }

        .text-center {
          text-align: center;
        }

        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .about-badge-card {
            bottom: 1rem;
            right: 1rem;
            padding: 0.75rem 1rem;
          }

          .about-badge-icon {
            width: 32px;
            height: 32px;
          }

          .about-badge-text strong {
            font-size: 0.875rem;
          }

          .about-badge-text span {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </>
  );
}