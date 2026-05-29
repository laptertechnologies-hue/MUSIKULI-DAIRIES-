import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimation from '@/components/ScrollAnimation';

export const metadata: Metadata = {
  title: 'Products & Services | Musikuli Dairies Limited',
  description: 'Discover Musikuli Dairies dairy enterprise, agro-produce, milk collection centres and outgrower programs in Uganda.',
};

export default function ServicesPage() {
  return (
    <>
      <div className="page-hero">
        <span className="section-tag">What We Offer</span>
        <h1>Our Products &amp; Services</h1>
        <p>Two core enterprises powering food security and farmer livelihoods across the Greater Luwero region.</p>
      </div>

      {/* Dairy Enterprise */}
      <section style={{ padding: 'var(--section-pad)', background: 'white' }} id="dairy">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrapper">
              <Image src="/images/dairy_products.png" alt="Musikuli Dairy products" width={580} height={500} className="about-image-main" />
              <div className="about-badge-card">
                <div className="about-badge-icon">
                  <Image src="/icons/product-milk.svg" alt="" width={24} height={24} />
                </div>
                <div className="about-badge-text"><strong>Dairy Enterprise</strong><span>Est. 2023</span></div>
              </div>
            </div>
            <ScrollAnimation className="about-content" delay={200}>
              <span className="section-tag">Enterprise </span>
              <h2 className="section-title">Dairy Enterprise</h2>
              <p className="about-desc">
                In addition to our farm production, Musikuli Dairies Ltd buys milk from farmers in 
                <strong> Luwero, Nakaseke and Nakasongola</strong> to our Dairy retail outlet at 
                <strong> Kasana-Luwero</strong>.
              </p>
              <p className="about-desc">
                We envision progressive growth through establishing a dairy farmer&apos;s community initiative 
                and increasing our proximity to farmer communities to support market access for farm produce.
              </p>
              <p className="about-desc">
                Produce and supply high quality animal feeds, hay and silage to dairy farmers.
              </p>
              <p className="about-desc">
                Enhance modern animal feeding technologies, animal health, Animal genetics and breeding.
              </p>
              <p className="about-desc">
                Provide Market access and linkages to farmers in the region.
              </p>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--blue-900)', marginTop: '0.5rem', marginBottom: '1rem' }}>
                Milk Collection Centre (MCC) Program
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { icon: '/icons/target.svg', text: 'Establish MCCs in Luwero, Nakaseke and Nakasongola to reduce transport distances' },
                  { icon: '/icons/product-community.svg', text: 'Bulk chilling tanks to store and cool milk, reducing wastage from 50-60% to near zero' },
                  { icon: '/icons/mailbox.svg', text: 'Offer Agriculture Finance tailored to specific needs of smallholder farmers' },
                  { icon: '/icons/award.svg', text: 'Training in dairy farming: pasture growing, hay & silage, milk handling, livestock management' },
                ].map((item) => (
                  <div key={item.text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: 'var(--blue-50)', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                    <Image src={item.icon} alt="" width={20} height={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--gray-700)', lineHeight: 1.6 }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <Link href="/quote" className="btn btn-primary" style={{ marginTop: '1.5rem' }} id="dairy-quote-btn">Request Dairy Quote →</Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Agro Produce */}
      <section style={{ padding: 'var(--section-pad)', background: 'var(--gray-50)' }} id="agro">
        <div className="container">
          <div className="about-grid" style={{ direction: 'rtl' }}>
            <div className="about-image-wrapper" style={{ direction: 'ltr' }}>
              <Image src="/images/agro_produce.png" alt="Agricultural produce" width={580} height={500} className="about-image-main" />
              <div className="about-badge-card" style={{ left: '-1.5rem', right: 'auto' }}>
                <div className="about-badge-icon">
                  <Image src="/icons/product-maize.svg" alt="" width={24} height={24} />
                </div>
                <div className="about-badge-text"><strong>200+ Farmers</strong><span>Outgrower Network</span></div>
              </div>
            </div>
            <ScrollAnimation className="about-content" style={{ direction: 'ltr' }} delay={200}>
              <span className="section-tag">Enterprise 2</span>
              <h2 className="section-title">Agro-produce Enterprise</h2>
              <p className="about-desc">
                Musikuli Dairies runs a social agriculture enterprise aimed at increasing production and 
                productivity of small holder farmers through our inhouse farming project and out grower scheme 
                focused on inclusive economic growth.
              </p>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--blue-900)', marginBottom: '1rem' }}>Our Products</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {['Maize', 'Beans', 'Rice', 'Groundnuts'].map((p) => (
                  <div key={p} style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: '10px', padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--gray-700)', fontSize: '0.9rem' }}>{p}</div>
                ))}
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--blue-900)', marginBottom: '1rem' }}>Outgrower Scheme Impact</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { icon: '/icons/award.svg', title: 'Inclusive Economic Growth', text: 'Training in modern agronomy, post-harvest handling and financial literacy. Directly improving livelihoods of 200+ smallholder families (~1,500 people).' },
                  { icon: '/icons/target.svg', title: 'Employment Creation', text: '60+ new direct jobs with fair wages. Indirect employment in transport, input supply, and value addition.' },
                  { icon: '/icons/product-community.svg', title: 'Food Security', text: 'Supporting 200+ small holder farmers to increase food availability and stability in the Greater LUWERO region through provision of quality farm inputs and centralized bulking and market access.' },
                ].map((item) => (
                  <div key={item.title} style={{ background: 'white', border: '1px solid var(--gray-100)', borderRadius: '12px', padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <Image src={item.icon} alt="" width={20} height={20} />
                      <strong style={{ fontSize: '0.9rem', color: 'var(--blue-900)', fontFamily: 'Inter, sans-serif' }}>{item.title}</strong>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', lineHeight: 1.7, paddingLeft: '2rem' }}>{item.text}</p>
                  </div>
                ))}
              </div>
              <Link href="/quote" className="btn btn-green" style={{ marginTop: '1.5rem' }} id="agro-quote-btn">Request Agro Quote →</Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* MCC Section */}
      <section style={{ padding: 'var(--section-pad)', background: 'white' }} id="mcc">
        <div className="container">
          <ScrollAnimation style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">Infrastructure</span>
            <h2 className="section-title">Milk Collection Centres</h2>
            <p className="section-subtitle mx-auto">Bringing the market to the farmer&apos;s doorstep to eliminate milk wastage and support sustainable livelihoods.</p>
          </ScrollAnimation>
          <ScrollAnimation style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }} delay={200}>
            <Image src="/images/milk_collection.png" alt="Milk Collection Centre" width={1200} height={450} style={{ width: '100%', height: '450px', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.4) 60%, transparent 100%)', display: 'flex', alignItems: 'center', padding: '3rem' }}>
              <div style={{ maxWidth: '480px' }}>
                <h3 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '1rem' }}>Addressing Market Access Challenges</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
                  Poor road conditions and long distances meant farmers lost 50–60% of their milk. 
                  Our MCCs bring collection points closer, reducing waste and transportation costs.
                </p>
                <Link href="/contact" className="btn btn-primary" style={{ marginTop: '1.5rem' }} id="mcc-contact-btn">Partner With Us →</Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--blue-900), var(--blue-700))', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>Ready to Order or Partner With Us?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>Contact us today for bulk orders, quotations, or to join our outgrower program.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/quote" className="btn" style={{ background: 'white', color: 'var(--blue-700)', fontWeight: 700, fontFamily: 'Inter, sans-serif' }} id="services-quote-btn">Get a Quote</Link>
            <Link href="/contact" className="btn btn-outline" id="services-contact-btn">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
