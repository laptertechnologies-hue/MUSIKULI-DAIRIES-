import Link from 'next/link';
import Image from 'next/image';
import ScrollAnimation from '@/components/ScrollAnimation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Musikuli Dairies Limited | Premium Dairy & Agricultural Products Uganda',
  description: "Musikuli Dairies Limited — Uganda's premier supplier of high-quality dairy and agricultural produce. Serving 200+ smallholder farmers.",
};

const coreValues = [
  'Ethics, Integrity & Excellence',
  'Professionalism',
  'Sustainability',
  'Total Quality Management',
  'Productivity',
  'Continuous Improvement',
  'Efficiency & Effectiveness',
];

export default async function HomePage() {
  const content = await prisma.siteContent.findMany({
    where: { page: 'home' }
  });

  const getVal = (key: string, fallback: string) => {
    const found = content.find(c => c.key === key);
    return found && found.value ? found.value : fallback;
  };

  // Dynamic lists
  const services = [
    {
      icon: '/icons/product-milk.svg',
      iconClass: 'blue',
      title: getVal('home.service_1.title', 'Dairy Enterprise'),
      desc: getVal('home.service_1.desc', 'Buying and selling processed & unprocessed milk across Luwero, Nakaseke and Nakasongola through our retail outlet at Kasana-Luwero.'),
      img: getVal('home.service_1.image', '/images/dairy_products.png'),
      href: '/services#dairy',
    },
    {
      icon: '/icons/product-maize.svg',
      iconClass: 'green',
      title: getVal('home.service_2.title', 'Agro-produce Enterprise'),
      desc: getVal('home.service_2.desc', 'Maize, beans, rice and groundnuts sourced from our outgrower network of 200+ smallholder farmers empowered with training and market access.'),
      img: getVal('home.service_2.image', '/images/agro_produce.png'),
      href: '/services#agro',
    },
    {
      icon: '/icons/product-community.svg',
      iconClass: 'gold',
      title: getVal('home.service_3.title', 'Community Initiatives'),
      desc: getVal('home.service_3.desc', 'Milk Collection Centres, agriculture finance, and on-farm training in dairy farming methods at our Nsozibirye zero-grazing farm.'),
      img: getVal('home.service_3.image', '/images/farmers_community.png'),
      href: '/services#mcc',
    },
  ];

  const testimonials = [
    {
      text: getVal('home.testimonial_1.text', 'Musikuli Dairies has completely transformed how I sell my milk. The collection centre is only 3 km from my farm now. No more wastage!'),
      name: getVal('home.testimonial_1.name', 'James Ssekamatte'),
      role: getVal('home.testimonial_1.role', 'Dairy Farmer, Luwero'),
      initials: 'JS',
      color: '#1a56db',
    },
    {
      text: getVal('home.testimonial_2.text', 'The training in modern agronomy they provided helped me triple my maize yield. My family income has improved significantly.'),
      name: getVal('home.testimonial_2.name', 'Mary Nakato'),
      role: getVal('home.testimonial_2.role', 'Smallholder Farmer, Nakaseke'),
      initials: 'MN',
      color: '#16a34a',
    },
    {
      text: getVal('home.testimonial_3.text', 'Reliable supply partner. Musikuli Dairies always delivers quality agricultural produce on time. Highly recommended!'),
      name: getVal('home.testimonial_3.name', 'Robert Kiggundu'),
      role: getVal('home.testimonial_3.role', 'Retail Distributor, Kampala'),
      initials: 'RK',
      color: '#d97706',
    },
  ];

  const products = [
    { image: getVal('home.product_1.image', '/images/product-milk.jpg'), name: getVal('home.product_1.name', 'Fresh Milk'), desc: getVal('home.product_1.desc', 'Processed & unprocessed') },
    { image: getVal('home.product_2.image', '/images/product-maize.jpg'), name: getVal('home.product_2.name', 'Maize'), desc: getVal('home.product_2.desc', 'Grade A quality') },
    { image: getVal('home.product_3.image', '/images/product-beans.jpg'), name: getVal('home.product_3.name', 'Beans'), desc: getVal('home.product_3.desc', 'Sun-dried & sorted') },
    { image: getVal('home.product_4.image', '/images/product-rice.jpg'), name: getVal('home.product_4.name', 'Rice'), desc: getVal('home.product_4.desc', 'Clean & milled') },
    { image: getVal('home.product_5.image', '/images/product-groundnuts.jpg'), name: getVal('home.product_5.name', 'Groundnuts'), desc: getVal('home.product_5.desc', 'Raw & roasted') },
    { image: getVal('home.product_6.image', '/images/product-cattle.jpg'), name: getVal('home.product_6.name', 'Dairy Cattle'), desc: getVal('home.product_6.desc', 'Zero-grazing farm') },
    { image: getVal('home.product_7.image', '/images/product-goats.png'), name: getVal('home.product_7.name', 'Goats'), desc: getVal('home.product_7.desc', 'Savannah & Mubende breeds') },
  ];

  const galleryItems = [
    { image: getVal('home.gallery_1.image', '/images/hero_farm.png'), caption: getVal('home.gallery_1.caption', 'Our Farm — Nsozibirye, Luwero'), large: true },
    { image: getVal('home.gallery_2.image', '/images/dairy_products.png'), caption: getVal('home.gallery_2.caption', 'Premium Dairy Products') },
    { image: getVal('home.gallery_3.image', '/images/agro_produce.png'), caption: getVal('home.gallery_3.caption', 'Quality Agro Produce') },
    { image: getVal('home.gallery_4.image', '/images/farmers_community.png'), caption: getVal('home.gallery_4.caption', 'Our Farmer Community') },
    { image: getVal('home.gallery_5.image', '/images/milk_collection.png'), caption: getVal('home.gallery_5.caption', 'Milk Collection Centre') },
    { image: getVal('home.gallery_6.image', '/images/gallery-cows-2.jpg'), caption: getVal('home.gallery_6.caption', 'Cattle Feeding — Nsozibirye Farm') },
    { image: getVal('home.gallery_7.image', '/images/gallery-groundnuts-bags.jpg'), caption: getVal('home.gallery_7.caption', 'Premium Shelled Groundnuts') },
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero" aria-label="Hero section">
        <div className="hero-bg">
          <Image src={getVal('home.hero.image', '/images/hero_farm.png')} alt="Musikuli farm" fill style={{ objectFit: 'cover' }} sizes="100vw" priority quality={85} />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">{getVal('home.hero.badge', "Uganda's Trusted Agri-Dairy Company")}</div>
          <h1 className="hero-title">
            {getVal('home.hero.title_line1', 'From Farm to Table —')}<br />
            <span>{getVal('home.hero.title_line2', 'Quality You Can Trust')}</span>
          </h1>
          <p className="hero-subtitle">
            {getVal('home.hero.subtitle', 'Musikuli Dairies Limited supplies premium dairy products and agricultural produce across Uganda. Empowering 200+ farmers. Creating jobs. Building food security.')}
          </p>
          <div className="hero-actions">
            <Link href="/services" className="btn btn-primary" id="hero-explore-btn">
              {getVal('home.hero.btn1_text', 'Explore Our Products')}
            </Link>
            <Link href="/quote" className="btn btn-outline" id="hero-quote-btn">
              {getVal('home.hero.btn2_text', 'Request a Quote')}
            </Link>
          </div>
          <div className="hero-stats">
            {[
              { num: getVal('home.stats.farmers', '200+'), label: 'Farmers Supported' },
              { num: getVal('home.stats.jobs', '60+'), label: 'Jobs Created' },
              { num: getVal('home.stats.districts', '3'), label: 'Districts Covered' },
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
      <section className="about-section" aria-labelledby="about-heading">
        <div className="container">
          <div className="about-grid">
            <ScrollAnimation className="about-image-wrapper">
              <Image
                src={getVal('home.about.image', '/images/founders pic.jpeg')}
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
                  <span>{getVal('home.about.experience', '4+ years')}</span>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation className="about-content" delay={200}>
              <span className="section-tag">{getVal('home.about.tag', 'Who We Are')}</span>
              <h2 className="section-title" id="about-heading">
                {getVal('home.about.title', 'A Family Built on Agriculture & Dairy')}
              </h2>
              <p className="about-desc">
                {getVal('home.about.desc', 'Musikuli Dairies Limited was incorporated in 2023, located at Nsozibirye Village, Kigombe Parish, Luwero Sub County. Founded and managed by Mr. Ibrahim Musikuli and Mrs. Reginah Nabateregga, we deal in buying and selling agricultural produce and milk.')}
              </p>

              <div className="mission-vision-grid">
                <div className="mv-card">
                  <div className="mv-card-icon">
                    <Image src="/icons/target.svg" alt="" width={24} height={24} />
                  </div>
                  <h4>Mission</h4>
                  <p>{getVal('home.about.mission', 'Premier supplier of agricultural products and milk, building long-term relationships through consistent quality supply.')}</p>
                </div>
                <div className="mv-card">
                  <div className="mv-card-icon">
                    <Image src="/icons/vision.svg" alt="" width={24} height={24} />
                  </div>
                  <h4>Vision</h4>
                  <p>{getVal('home.about.vision', "Market leader of affordable high-quality agro products, contributing to Uganda's economic and social development.")}</p>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>Core Values</h4>
                <div className="values-grid">
                  {coreValues.map((v) => (
                    <div className="value-item" key={v}>
                      <Image src="/icons/target.svg" alt="" width={16} height={16} style={{ flexShrink: 0 }} />
                      {v}
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/about" className="btn btn-primary" id="home-about-btn">
                Learn More About Us →
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ===== STATS BANNER ===== */}
      <div className="stats-banner" aria-label="Company statistics">
        <div className="stats-banner-grid">
          {[
            { num: getVal('home.banner.farmers_num', '200'), unit: '+', label: getVal('home.banner.farmers_label', 'Smallholder Farmers') },
            { num: getVal('home.banner.jobs_num', '60'), unit: '+', label: getVal('home.banner.jobs_label', 'Direct Jobs Created') },
            { num: getVal('home.banner.lives_num', '1,500'), unit: '+', label: getVal('home.banner.lives_label', 'Lives Impacted') },
            { num: getVal('home.banner.districts_num', '3'), unit: '', label: getVal('home.banner.districts_label', 'Districts Served') },
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
          <ScrollAnimation className="services-header">
            <span className="section-tag">What We Do</span>
            <h2 className="section-title" id="services-heading">Our Products &amp; Services</h2>
            <p className="section-subtitle mx-auto">
              From milk collection to agro-produce distribution, we provide quality products 
              and community-driven services across Uganda.
            </p>
          </ScrollAnimation>
          <div className="services-grid">
            {services.map((s, i) => (
              <ScrollAnimation key={s.title} delay={i * 100}>
                <div className={`service-card`}>
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
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="products-section" aria-labelledby="products-heading">
        <div className="container">
          <ScrollAnimation className="products-header">
            <span className="section-tag">Our Products</span>
            <h2 className="section-title" id="products-heading">What We Supply</h2>
            <p className="section-subtitle mx-auto">
              Premium quality produce sourced directly from our farms and our network of 
              certified smallholder farmers across the Greater Luwero region.
            </p>
          </ScrollAnimation>
          <div className="products-grid">
            {products.map((p, i) => (
              <ScrollAnimation key={p.name} delay={i * 50}>
                <div className="product-card product-card-image-style">
                  <div className="product-image-wrapper">
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
              </ScrollAnimation>
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
          <div className="gallery-header">
            <span className="section-tag">Gallery</span>
            <h2 className="section-title" id="gallery-heading">From Our Farm</h2>
            <p className="section-subtitle mx-auto">
              A glimpse into our operations, farm, products and the communities we serve.
            </p>
          </div>
          <div className="gallery-grid" style={{ width: '100%', margin: '0' }}>
            {galleryItems.map((g, index) => (
              <div key={index} className={`gallery-item ${g.large ? 'large' : ''}`} style={{ aspectRatio: g.large ? '16/9' : '4/3', position: 'relative', overflow: 'hidden', borderRadius: '1rem' }}>
                <Image src={g.image} alt={g.caption} fill style={{ objectFit: 'cover' }} sizes={g.large ? "(max-width: 768px) 100vw, 800px" : "(max-width: 768px) 100vw, 400px"} />
                <div className="gallery-item-overlay"><span>{g.caption}</span></div>
              </div>
            ))}
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
          <div className="testimonials-header">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title" id="testimonials-heading">What People Say</h2>
            <p className="section-subtitle mx-auto">
              Stories from farmers, partners and customers who trust Musikuli Dairies.
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <ScrollAnimation key={t.name} delay={i * 150}>
                <div className="testimonial-card">
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
              </ScrollAnimation>
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
            {getVal('home.cta.title', 'Get in Touch with Us Today')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
            {getVal('home.cta.subtitle', "Whether you need bulk agricultural produce, fresh milk supply, or partnership in our outgrower program — we're ready to serve you.")}
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
