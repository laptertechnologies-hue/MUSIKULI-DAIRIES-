'use client';
import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

const galleryItems = [
  { src: '/images/hero_farm.png', alt: 'Musikuli Farm — Nsozibirye, Luwero', caption: 'Our Farm', sub: 'Nsozibirye-Kigombe, Luwero' },
  { src: '/images/dairy_products.png', alt: 'Fresh dairy products', caption: 'Dairy Products', sub: 'Fresh milk & dairy' },
  { src: '/images/agro_produce.png', alt: 'Agricultural produce', caption: 'Agro Produce', sub: 'Maize, Beans, Rice & Groundnuts' },
  { src: '/images/farmers_community.png', alt: 'Farmer community in Luwero', caption: 'Our Community', sub: '200+ supported farmers' },
  { src: '/images/milk_collection.png', alt: 'Milk collection centre', caption: 'Milk Collection Centre', sub: 'Reducing milk wastage' },
  { src: '/images/founders.png', alt: 'Musikuli Dairies founders', caption: 'Our Founders', sub: 'Ibrahim Musikuli & Reginah Nabateregga' },
];

export default function PortfolioPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = [
    '/images/hero_farm.png',
    '/images/milk_collection.png',
    '/images/farmers_community.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <>
      <div className="page-hero fade-up">
        <span className="section-tag">Our Gallery</span>
        <h1>Farm to Table — Our Visual Story</h1>
        <p>A glimpse into our farm, operations, products and the communities we&apos;re proud to serve across Uganda.</p>
      </div>

      {/* Featured Slider */}
      <section className="fade-up" style={{ padding: '4rem 0', background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ position: 'relative', height: '500px', width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            {sliderImages.map((img, idx) => (
              <div
                key={img}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: currentSlide === idx ? 1 : 0,
                  transition: 'opacity 1s ease-in-out',
                }}
              >
                <Image src={img} alt="Featured Highlight" fill style={{ objectFit: 'cover' }} />
                <div style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  padding: '4rem 2rem 2rem', 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Featured Highlight</h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {sliderImages.map((_, i) => (
                      <div key={i} style={{ width: '40px', height: '4px', background: currentSlide === i ? 'var(--blue-500)' : 'rgba(255,255,255,0.3)', borderRadius: '2px' }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fade-up" style={{ padding: 'var(--section-pad)', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {galleryItems.map((item) => (
              <div key={item.caption} className="gallery-item fade-up" style={{ height: '280px' }}>
                <Image src={item.src} alt={item.alt} fill style={{ objectFit: 'cover' }} />
                <div className="gallery-item-overlay" style={{ opacity: 1, background: 'linear-gradient(to top, rgba(10,22,40,0.8) 0%, transparent 55%)' }}>
                  <div>
                    <div style={{ color: 'white', fontWeight: 700, fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>{item.caption}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '0.15rem' }}>{item.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm Info */}
      <section className="fade-up" style={{ padding: 'var(--section-pad)', background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-tag">Our Farm</span>
            <h2 className="section-title">Nsozibirye Zero-Grazing Farm</h2>
            <p className="section-subtitle mx-auto">Our demonstration farm serves as a training centre for smallholder dairy farmers in the region.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '📍', title: 'Location', desc: 'Nsozibirye Village, Kigombe Parish, Luwero Sub County' },
              { icon: '🐄', title: 'Zero-Grazing Farm', desc: 'Modern dairy farming methods in an enclosed, controlled environment' },
              { icon: '🎓', title: 'Training Centre', desc: 'Hands-on training for farmers in pasture growing, milk handling and livestock management' },
              { icon: '🌿', title: 'Sustainable Practices', desc: 'Promoting environmentally sustainable agriculture that benefits communities' },
            ].map((f) => (
              <div key={f.title} className="fade-up" style={{ background: 'white', border: '1px solid var(--gray-100)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                <h4 style={{ color: 'var(--blue-900)', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>{f.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="fade-up" style={{ padding: 'var(--section-pad)', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">Videos</span>
            <h2 className="section-title">Company in Motion</h2>
            <p className="section-subtitle mx-auto">Watch our stories, training sessions, and farm operations in action.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <div className="fade-up" style={{ background: '#000', borderRadius: '24px', overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}>
              {/* Placeholder for Video Embed */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'white', background: 'rgba(0,0,0,0.4)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', cursor: 'pointer' }}>▶</div>
                <p>Farm Operations Showcase</p>
              </div>
            </div>
            <div className="fade-up" style={{ background: '#000', borderRadius: '24px', overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'white', background: 'rgba(0,0,0,0.4)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--green-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', cursor: 'pointer' }}>▶</div>
                <p>Community Impact Stories</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
