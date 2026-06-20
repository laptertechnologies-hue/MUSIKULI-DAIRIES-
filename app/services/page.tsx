import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimation from '@/components/ScrollAnimation';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Products & Services | Musikuli Dairies Limited',
  description: 'Discover Musikuli Dairies dairy enterprise, agro-produce, milk collection centres and outgrower programs in Uganda.',
};

export default async function ServicesPage() {
  const content = await prisma.siteContent.findMany({
    where: { page: 'services' }
  });

  const getVal = (key: string, fallback: string) => {
    const found = content.find(c => c.key === key);
    return found && found.value ? found.value : fallback;
  };

  return (
    <>
      <div className="page-hero">
        <span className="section-tag">What We Offer</span>
        <h1>{getVal('services.hero.title', 'Our Products & Services')}</h1>
        <p>{getVal('services.hero.subtitle', 'Three core enterprises powering food security and farmer livelihoods across the Luwero, Nakaseke, and Nakasongola region.')}</p>
      </div>

      {/* Dairy Enterprise */}
      <section style={{ padding: 'var(--section-pad)', background: 'white' }} id="dairy">
        <div className="container">
          <div className="about-grid" style={{ alignItems: 'start' }}>
            <div className="about-image-wrapper">
              <Image src={getVal('services.dairy.image', '/images/dairy_products.png')} alt="Musikuli Dairy products" width={580} height={500} className="about-image-main" />
              <div className="about-badge-card">
                <div className="about-badge-icon">
                  <Image src="/icons/product-milk.svg" alt="" width={24} height={24} />
                </div>
                <div className="about-badge-text"><strong>{getVal('services.dairy.title', 'Dairy Enterprise')}</strong><span>Est. 2023</span></div>
              </div>
            </div>
            <ScrollAnimation className="about-content" delay={200}>
              <span className="section-tag">Enterprise 1</span>
              <h2 className="section-title">{getVal('services.dairy.title', 'Dairy Enterprise')}</h2>
              <p className="about-desc" style={{ marginBottom: '0.5rem' }}>
                {getVal('services.dairy.desc', 'We buy and sell processed and unprocessed milk across Luwero, Nakaseke and Nakasongola. Our retail outlet is located at Kasana-Luwero, providing fresh dairy to local communities and bulk supply to distributors.')}
              </p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--gray-600)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                <li>Produce and supply high quality animal feeds, hay and silage to dairy farmers.</li>
                <li>Enhance modern animal feeding technologies, animal health, Animal genetics and breeding.</li>
                <li>Provide Market access and linkages to farmers in the region.</li>
              </ul>
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

              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--blue-900)', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
                  On-Farm Operations Gallery
                </h3>
                <div style={{ display: 'flex', overflowX: 'auto', gap: '1.25rem', paddingBottom: '1rem', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
                  {[
                    { src: '/images/gallery-cows-1.jpg', alt: 'Cows in pens', label: 'Zero-Grazing Cows' },
                    { src: '/images/gallery-cows-2.jpg', alt: 'Cows feeding', label: 'Cattle Feeding' },
                    { src: '/images/gallery-chaff-cutter.jpg', alt: 'Chaff cutter', label: 'Chaff Cutter Machine' },
                    { src: '/images/gallery-silage-pit.jpg', alt: 'Silage pit', label: 'Silage Pit Storage' },
                    { src: '/images/gallery-production-log.jpg', alt: 'Production Schedule log sheet', label: 'Milk Production Records' },
                  ].map((item) => (
                    <div key={item.label} style={{ position: 'relative', width: '320px', height: '200px', flexShrink: 0, scrollSnapAlign: 'start', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                      <Image src={item.src} alt={item.alt} fill style={{ objectFit: 'cover' }} sizes="320px" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 80%)', display: 'flex', alignItems: 'flex-end', padding: '0.75rem' }}>
                        <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', lineHeight: 1.2 }}>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Agro Produce */}
      <section style={{ padding: 'var(--section-pad)', background: 'var(--gray-50)' }} id="agro">
        <div className="container">
          <div className="about-grid" style={{ alignItems: 'start' }}>
            <div className="about-image-wrapper">
              <Image src={getVal('services.agro.image', '/images/bulk_warehouse_produce.png')} alt="Agricultural produce" width={580} height={500} className="about-image-main" />
              <div className="about-badge-card">
                <div className="about-badge-icon">
                  <Image src="/icons/product-maize.svg" alt="" width={24} height={24} />
                </div>
                <div className="about-badge-text"><strong>200+ Farmers</strong><span>Outgrower Network</span></div>
              </div>
            </div>
            <ScrollAnimation className="about-content" delay={200}>
              <span className="section-tag">Enterprise 2</span>
              <h2 className="section-title">{getVal('services.agro.title', 'Agro-produce Enterprise')}</h2>
              <p className="about-desc">
                {getVal('services.agro.desc', 'We source maize, beans, rice and groundnuts from our outgrower network of 200+ smallholder farmers. Each farmer receives training and market access, ensuring quality produce and sustainable livelihoods.')}
              </p>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--blue-900)', marginBottom: '1rem' }}>Our Bulk Agro-Produce</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { name: 'Maize & Feed', desc: 'High-grade grain, sun-dried and sorted for wholesale supply and high-quality feeds production.' },
                  { name: 'Beans (Nambale & Yellow)', desc: 'Premium sorted beans bought in bulk from local farmers and packaged for commercial supply.' },
                  { name: 'Rice (Super & Kaiso)', desc: 'Milled super and Kaiso rice, clean, sorted, and packaged in bulk quantities.' },
                  { name: 'Groundnuts (Red Beauty)', desc: 'Quality shelled groundnuts and rich, home-made groundnut paste for local and wholesale markets.' },
                ].map((p) => (
                  <div key={p.name} style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: '12px', padding: '1rem' }}>
                    <strong style={{ display: 'block', color: 'var(--blue-900)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{p.name}</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--gray-600)', lineHeight: 1.5 }}>{p.desc}</span>
                  </div>
                ))}
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--blue-900)', marginBottom: '1rem' }}>Outgrower Scheme Impact</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { icon: '/icons/award.svg', title: 'Inclusive Economic Growth', text: 'Training in modern agronomy, post-harvest handling and financial literacy. Directly improving livelihoods of 200+ smallholder families (~1,500 people).' },
                  { icon: '/icons/target.svg', title: 'Employment Creation', text: '60+ new direct jobs with fair wages. Indirect employment in transport, input supply, and value addition.' },
                  { icon: '/icons/product-community.svg', title: 'Food Security', text: 'Supporting 200+ small holder farmers to increase food availability and stability in the Luwero, Nakaseke, and Nakasongola region through provision of quality farm inputs and centralized bulking and market access.' },
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

              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--green-800)', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
                  Agro-Produce Operations Gallery
                </h3>
                <div style={{ display: 'flex', overflowX: 'auto', gap: '1.25rem', paddingBottom: '1rem', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
                  {[
                    { src: '/images/gallery-maize-field.jpg', alt: 'Maize field crops', label: 'Maize Cultivation' },
                    { src: '/images/gallery-groundnuts-bags.jpg', alt: 'Groundnuts bags', label: 'Raw Groundnuts' },
                    { src: '/images/gallery-groundnuts-packets.jpg', alt: 'Groundnuts packets', label: 'Packaged Groundnuts' },
                    { src: '/images/gallery-produce-sorting.jpg', alt: 'Sorting beans', label: 'Sorting & Grading' },
                    { src: '/images/gallery-groundnut-paste-jars.jpg', alt: 'Groundnut paste jars', label: 'Groundnut Paste' },
                  ].map((item) => (
                    <div key={item.label} style={{ position: 'relative', width: '320px', height: '200px', flexShrink: 0, scrollSnapAlign: 'start', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                      <Image src={item.src} alt={item.alt} fill style={{ objectFit: 'cover' }} sizes="320px" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 80%)', display: 'flex', alignItems: 'flex-end', padding: '0.75rem' }}>
                        <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', lineHeight: 1.2 }}>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Goat Enterprise */}
      <section style={{ padding: 'var(--section-pad)', background: 'white' }} id="goat-enterprise">
        <div className="container">
          <div className="about-grid" style={{ alignItems: 'start' }}>
            <div className="about-image-wrapper">
              <Image src={getVal('services.goat.image', '/images/goat_enterprise.png')} alt="Goat Enterprise" width={580} height={500} className="about-image-main" />
            </div>
            <ScrollAnimation className="about-content" delay={200}>
              <span className="section-tag">Enterprise 3</span>
              <h2 className="section-title">{getVal('services.goat.title', 'Goat Enterprise')}</h2>
              <p className="about-desc">
                {getVal('services.goat.desc', 'We breed and supply premium Savannah and Mubende goats. We focus on rearing and bulking live goats to supply commercial markets and breeding stock in large quantities across the region.')}
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <Image src="/icons/goat-savannah.png" alt="Savannah Goat" width={48} height={48} style={{ borderRadius: '50%' }} />
                  <h4 style={{ marginTop: '0.5rem' }}>Savannah</h4>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Image src="/icons/goat-mubende.png" alt="Mubende Goat" width={48} height={48} style={{ borderRadius: '50%' }} />
                  <h4 style={{ marginTop: '0.5rem' }}>Mubende</h4>
                </div>
              </div>
              <Link href="/quote" className="btn btn-primary" style={{ marginTop: '1.5rem' }} id="goat-quote-btn">Request Goat Quote →</Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* MCC Section */}
      <section style={{ padding: 'var(--section-pad)', background: 'var(--gray-50)' }} id="mcc">
        <div className="container">
          <ScrollAnimation style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">Infrastructure</span>
            <h2 className="section-title">{getVal('services.mcc.title', 'Milk Collection Centres')}</h2>
            <p className="section-subtitle mx-auto">{getVal('services.mcc.desc', 'Our Milk Collection Centres provide bulk chilling tanks, agriculture finance, and on-farm training to dairy farmers across the region. We bring market access closer to every farmer.')}</p>
          </ScrollAnimation>
          <ScrollAnimation className="mcc-banner" delay={200}>
            <Image src={getVal('services.mcc.image', '/images/bulk_delivery_vehicle.png')} alt="Milk Collection Centre" width={1200} height={450} className="mcc-banner-img" />
            <div className="mcc-banner-overlay">
              <div className="mcc-banner-content">
                <h3>Addressing Market Access Challenges</h3>
                <p>
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
