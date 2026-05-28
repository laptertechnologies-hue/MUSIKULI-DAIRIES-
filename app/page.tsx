'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const coreValues = [
  'Ethics, Integrity & Excellence',
  'Professionalism',
  'Sustainability',
  'Total Quality Management',
  'Productivity',
  'Continuous Improvement',
  'Efficiency & Effectiveness',
];

const services = [
  {
    icon: '/icons/product-milk.svg',
    iconClass: 'blue',
    title: 'Dairy Enterprise',
    desc: 'Buying and selling processed & unprocessed milk across Luwero, Nakaseke and Nakasongola through our retail outlet at Kasana-Luwero.',
    img: '/images/dairy_products.png',
    href: '/services#dairy',
  },
  {
    icon: '/icons/product-maize..svg',
    iconClass: 'green',
    title: 'Agro-produce Enterprise',
    desc: 'Maize, beans, rice and groundnuts sourced from our outgrower network of 200+ smallholder farmers empowered with training and market access.',
    img: '/images/agro_produce.png',
    href: '/services#agro',
  },
  {
    icon: '/icons/product-community.svg',
    iconClass: 'gold',
    title: 'Community Initiatives',
    desc: 'Milk Collection Centres, agriculture finance, and on-farm training in dairy farming methods at our Nsozibirye zero-grazing farm.',
    img: '/images/farmers_community.png',
    href: '/services#mcc',
  },
];

const testimonials = [
  {
    text: 'Musikuli Dairies has completely transformed how I sell my milk. The collection centre is only 3 km from my farm now. No more wastage!',
    name: 'James Ssekamatte',
    role: 'Dairy Farmer, Luwero',
    initials: 'JS',
    color: '#1a56db',
  },
  {
    text: 'The training in modern agronomy they provided helped me triple my maize yield. My family income has improved significantly.',
    name: 'Mary Nakato',
    role: 'Smallholder Farmer, Nakaseke',
    initials: 'MN',
    color: '#16a34a',
  },
  {
    text: 'Reliable supply partner. Musikuli Dairies always delivers quality agricultural produce on time. Highly recommended!',
    name: 'Robert Kiggundu',
    role: 'Retail Distributor, Kampala',
    initials: 'RK',
    color: '#d97706',
  },
];

const products = [
  { image: '/images/product-milk.jpg', name: 'Fresh Milk', desc: 'Processed & unprocessed' },
  { image: '/images/product-maize.jpg', name: 'Maize', desc: 'Grade A quality' },
  { image: '/images/product-beans.jpg', name: 'Beans', desc: 'Sun-dried & sorted' },
  { image: '/images/product-rice.jpg', name: 'Rice', desc: 'Clean & milled' },
  { image: '/images/product-groundnuts.jpg', name: 'Groundnuts', desc: 'Raw & roasted' },
  { image: '/images/product-cattle.jpg', name: 'Dairy Cattle', desc: 'Zero-grazing farm' },
];

export default function HomePage() {
  const fadeRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    fadeRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addFade = (el: HTMLElement | null) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el);
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero" aria-label="Hero section">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">🌿 Uganda&apos;s Trusted Agri-Dairy Company</div>
          <h1 className="hero-title">
            From Farm to Table —<br />
            <span>Quality You Can Trust</span>
          </h1>
          <p className="hero-subtitle">
            Musikuli Dairies Limited supplies premium dairy products and agricultural produce 
            across Uganda. Empowering 200+ farmers. Creating jobs. Building food security.
          </p>
          <div className="hero-actions">
            <Link href="/services" className="btn btn-primary" id="hero-explore-btn">
              Explore Our Products
            </Link>
            <Link href="/quote" className="btn btn-outline" id="hero-quote-btn">
              Request a Quote
            </Link>
          </div>
          <div className="hero-stats">
            {[
              
              { num: '200+', label: 'Farmers Supported' },
              { num: '60+', label: 'Jobs Created' },
              { num: '3', label: 'Districts Covered' },
            ].map((s) => (
              <div className="hero-stat" key={s.label}>
                <div className="hero-stat-number">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="about-section" ref={addFade} aria-labelledby="about-heading">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrapper fade-up" ref={addFade}>
              <Image
                src="/images/founders pic.jpeg"
                alt="Musikuli Dairies founders Ibrahim Musikuli and Reginah Nabateregga"
                width={580}
                height={500}
                className="about-image-main"
                priority={false}
              />
              <div className="about-badge-card">
                <div className="about-badge-icon">
                  <Image src="/icons/award.svg" alt="" width={24} height={24} />
                </div>
                <div className="about-badge-text">
                  <strong>Experience</strong>
                  <span>4+ years</span>
                </div>
              </div>
            </div>
            <div className="about-content fade-up" ref={addFade}>
              <span className="section-tag">Who We Are</span>
              <h2 className="section-title" id="about-heading">
                A Family Built on Agriculture &amp; Dairy
              </h2>
              <p className="about-desc">
                Musikuli Dairies Limited was incorporated in 2023, located at 
                Nsozibirye Village, Kigombe Parish, Luwero Sub County. Founded and managed 
                by <strong>Mr. Ibrahim Musikuli</strong> and <strong>Mrs. Reginah Nabateregga</strong>, 
                we deal in buying and selling agricultural produce and milk.
              </p>

              <div className="mission-vision-grid">
                <div className="mv-card">
                  <div className="mv-card-icon">
                    <Image src="/icons/target.svg" alt="" width={24} height={24} />
                  </div>
                  <h4>Mission</h4>
                  <p>Premier supplier of agricultural products and milk, building long-term relationships through consistent quality supply.</p>
                </div>
                <div className="mv-card">
                  <div className="mv-card-icon">
                    <Image src="/icons/vision.svg" alt="" width={24} height={24} />
                  </div>
                  <h4>Vision</h4>
                  <p>Market leader of affordable high-quality agro products, contributing to Uganda's economic and social development.</p>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>Core Values</h4>
                <div className="values-grid">
                  {coreValues.map((v) => (
                    <div className="value-item" key={v}>
                      <span className="value-dot" />
                      {v}
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/about" className="btn btn-primary" id="home-about-btn">
                Learn More About Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BANNER ===== */}
      <div className="stats-banner" aria-label="Company statistics">
        <div className="stats-banner-grid">
          {[
            { num: '200', unit: '+', label: 'Smallholder Farmers' },
            { num: '60', unit: '+', label: 'Direct Jobs Created' },
            { num: '1,500', unit: '+', label: 'Lives Impacted' },
            { num: '3', unit: '', label: 'Districts Served' },
          ].map((s) => (
            <div key={s.label}>
              <div className="stat-item-number">{s.num}<span>{s.unit}</span></div>
              <div className="stat-item-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== SERVICES ===== */}
      <section className="services-section" aria-labelledby="services-heading">
        <div className="container">
          <div className="services-header fade-up" ref={addFade}>
            <span className="section-tag">What We Do</span>
            <h2 className="section-title" id="services-heading">Our Products &amp; Services</h2>
            <p className="section-subtitle mx-auto">
              From milk collection to agro-produce distribution, we provide quality products 
              and community-driven services across Uganda.
            </p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div className={`service-card fade-up`} key={s.title} ref={addFade} style={{ animationDelay: `${i * 0.1}s` }}>
                <Image
                  src={s.img}
                  alt={s.title}
                  width={400}
                  height={200}
                  className="service-card-img"
                />
                <div className="service-card-body">
                  <div className={`service-card-icon ${s.iconClass}`}>
                    <Image src={s.icon} alt="" width={32} height={32} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link href={s.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', color: 'var(--blue-600)', fontWeight: 600, fontSize: '0.875rem', fontFamily: 'Inter, sans-serif' }}>
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="products-section" aria-labelledby="products-heading">
        <div className="container">
          <div className="products-header fade-up" ref={addFade}>
            <span className="section-tag">Our Products</span>
            <h2 className="section-title" id="products-heading">What We Supply</h2>
            <p className="section-subtitle mx-auto">
              Premium quality produce sourced directly from our farms and our network of 
              certified smallholder farmers across the Greater Luwero region.
            </p>
          </div>
          <div className="products-grid">
            {products.map((p) => (
              <div className="product-card product-card-image-style fade-up" key={p.name} ref={addFade}>
                <div className="product-image-wrapper" style={{ position: 'relative', height: '200px', width: '100%', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.25rem', background: '#f8fafc' }}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 250px"
                  />
                </div>
                <h4>{p.name}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/pricing" className="btn btn-primary" id="home-pricing-btn">
              View Pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="gallery-section" aria-labelledby="gallery-heading" style={{ overflowX: 'hidden' }}>
        <div className="container" style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
          <div className="gallery-header fade-up" ref={addFade}>
            <span className="section-tag">Gallery</span>
            <h2 className="section-title" id="gallery-heading">From Our Farm</h2>
            <p className="section-subtitle mx-auto">
              A glimpse into our operations, farm, products and the communities we serve.
            </p>
          </div>
          <div className="gallery-grid fade-up" ref={addFade} style={{ width: '100%', margin: '0' }}>
            <div className="gallery-item large" style={{ height: 'clamp(280px, 45vh, 480px)', position: 'relative', overflow: 'hidden', borderRadius: '1rem' }}>
              <Image src="/images/hero_farm.png" alt="Musikuli farm landscape" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 800px" />
              <div className="gallery-item-overlay"><span>Our Farm — Nsozibirye, Luwero</span></div>
            </div>
            <div className="gallery-item" style={{ height: '230px', position: 'relative', overflow: 'hidden', borderRadius: '1rem' }}>
              <Image src="/images/dairy_products.png" alt="Fresh dairy products" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 400px" />
              <div className="gallery-item-overlay"><span>Premium Dairy Products</span></div>
            </div>
            <div className="gallery-item" style={{ height: '230px', position: 'relative', overflow: 'hidden', borderRadius: '1rem' }}>
              <Image src="/images/agro_produce.png" alt="Agricultural produce" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 400px" />
              <div className="gallery-item-overlay"><span>Quality Agro Produce</span></div>
            </div>
            <div className="gallery-item" style={{ height: '230px', position: 'relative', overflow: 'hidden', borderRadius: '1rem' }}>
              <Image src="/images/farmers_community.png" alt="Farmer community" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 400px" />
              <div className="gallery-item-overlay"><span>Our Farmer Community</span></div>
            </div>
            <div className="gallery-item" style={{ height: '230px', position: 'relative', overflow: 'hidden', borderRadius: '1rem' }}>
              <Image src="/images/milk_collection.png" alt="Milk collection center" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 400px" />
              <div className="gallery-item-overlay"><span>Milk Collection Centre</span></div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/portfolio" className="btn btn-primary" id="home-gallery-btn">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="testimonials-header fade-up" ref={addFade}>
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title" id="testimonials-heading">What People Say</h2>
            <p className="section-subtitle mx-auto">
              Stories from farmers, partners and customers who trust Musikuli Dairies.
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card fade-up" key={t.name} ref={addFade}>
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">&quot;{t.text}&quot;</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: t.color }}>
                    {t.initials}
                  </div>
                  <div className="testimonial-author-info">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{
        background: 'linear-gradient(135deg, var(--blue-600), var(--blue-800))',
        padding: '5rem 1.5rem',
        textAlign: 'center',
      }} aria-labelledby="cta-heading">
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}>
            Ready to Work Together?
          </span>
          <h2 id="cta-heading" style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', color: 'var(--white)', marginBottom: '1rem' }}>
            Get in Touch with Us Today
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
            Whether you need bulk agricultural produce, fresh milk supply, or partnership 
            in our outgrower program — we&apos;re ready to serve you.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          
            <Link href="/contact" className="btn btn-outline" id="cta-contact-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              <Image src="/icons/phone.svg" alt="" width={18} height={18} style={{ filter: 'brightness(0) invert(1)' }} />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
