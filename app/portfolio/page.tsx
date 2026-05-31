'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollAnimation from '@/components/ScrollAnimation';

const galleryItems = [
  { src: '/images/hero_farm.png', alt: 'Musikuli Farm — Nsozibirye, Luwero', caption: 'Our Farm', sub: 'Nsozibirye-Kigombe, Luwero' },
  { src: '/images/dairy_products.png', alt: 'Fresh dairy products', caption: 'Dairy Products', sub: 'Fresh milk & dairy' },
  { src: '/images/agro_produce.png', alt: 'Agricultural produce', caption: 'Agro Produce', sub: 'Maize, Beans, Rice & Groundnuts' },
  { src: '/images/farmers_community.png', alt: 'Farmer community in Luwero', caption: 'Our Community', sub: '200+ supported farmers' },
  { src: '/images/milk_collection.png', alt: 'Milk collection centre', caption: 'Milk Collection Centre', sub: 'Reducing milk wastage' },
  { src: '/images/founders.png', alt: 'Musikuli Dairies founders', caption: 'Our Founders', sub: 'Ibrahim Musikuli & Reginah Nabateregga' },
  { src: '/images/gallery-cows-1.jpg', alt: 'Dairy cattle in wood pens at Nsozibirye Farm', caption: 'Zero-Grazing Cattle', sub: 'Modern dairy farming' },
  { src: '/images/gallery-cows-2.jpg', alt: 'Holstein Friesian cows feeding at Nsozibirye Farm', caption: 'Cattle Feeding', sub: 'High-quality feed & nutrition' },
  { src: '/images/gallery-chaff-cutter.jpg', alt: 'Diesel chaff cutter machine on farm', caption: 'Chaff Cutter', sub: 'Preparing forage for cattle' },
  { src: '/images/gallery-silage-pit.jpg', alt: 'Silage pit storage at Nsozibirye Farm', caption: 'Silage Pit', sub: 'Storing fermented cattle feed' },
  { src: '/images/gallery-production-log.jpg', alt: 'Handwritten weekly milk production schedule log', caption: 'Production Records', sub: 'Traceability and data tracking' },
  { src: '/images/gallery-founder-farm-1.jpg', alt: 'Ibrahim Musikuli next to silage pit', caption: 'Founder in the Field', sub: 'Mr. Ibrahim Musikuli on site' },
  { src: '/images/gallery-founder-farm-2.jpg', alt: 'Ibrahim Musikuli showing silage feed', caption: 'Ensuring Feed Quality', sub: 'Inspection of forage' },
  { src: '/images/gallery-office-person-1.jpg', alt: 'Co-Founder Reginah Nabateregga at office desk', caption: 'Administration Office', sub: 'Mrs. Reginah Nabateregga' },
  { src: '/images/gallery-maize-field.jpg', alt: 'Maize field crops intercropped with coffee', caption: 'Maize Cultivation', sub: 'Outgrower crop network' },
  { src: '/images/gallery-napier-field.jpg', alt: 'Napier grass crops field on farm', caption: 'Napier Grass Pasture', sub: 'Cattle forage growing' },
  { src: '/images/gallery-groundnuts-packets.jpg', alt: 'Packaged raw red groundnuts on table', caption: 'Groundnuts Packaging', sub: 'Ready for distribution' },
  { src: '/images/gallery-groundnuts-bags.jpg', alt: 'Bags of shelled raw red groundnuts', caption: 'Red Shelled Groundnuts', sub: 'Grade A premium quality' },
  { src: '/images/gallery-produce-sorting.jpg', alt: 'Workers sorting and grading agricultural produce', caption: 'Sorting & Grading', sub: 'Ensuring premium quality control' },
  { src: '/images/gallery-office-setup.jpg', alt: 'Office files and metal milk cans on cabinets', caption: 'Dairy Office Operations', sub: 'Kasana-Luwero retail outlet' },
  { src: '/images/gallery-groundnut-paste-jars.jpg', alt: 'Jars of fresh groundnut paste on table', caption: 'Groundnut Paste Production', sub: 'Nutritious peanut butter' },
  { src: '/images/gallery-groundnut-paste-jars-2.jpg', alt: 'Groundnut paste jars ready for sale', caption: 'Finished Produce', sub: 'Pure groundnut peanut paste' },
  { src: '/images/gallery-groundnut-paste-single.jpg', alt: 'A single jar of groundnut paste on banister', caption: 'Premium Groundnut Paste', sub: 'Musikuli brand products' }
];

const sliderImages = [
  '/images/hero_farm.png',
  '/images/milk_collection.png',
  '/images/farmers_community.png'
];

export default function PortfolioPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="page-hero">
        <span className="section-tag">Our Gallery</span>
        <h1>Farm to Table — Our Visual Story</h1>
        <p>A glimpse into our farm, operations, products and the communities we&apos;re proud to serve across Uganda.</p>
      </div>

      {/* Featured Slider */}
      <section style={{ padding: '4rem 0', background: 'var(--gray-50)' }}>
        <div className="container">
          <ScrollAnimation>
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
                  <Image 
                    src={img} 
                    alt="Featured Highlight" 
                    fill 
                    style={{ objectFit: 'cover' }} 
                    sizes="100vw" 
                    priority={idx === 0}
                  />
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
                        <div 
                          key={i} 
                          style={{ 
                            width: '40px', 
                            height: '4px', 
                            background: currentSlide === i ? 'var(--blue-500)' : 'rgba(255,255,255,0.3)', 
                            borderRadius: '2px' 
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Gallery Grid */}
      <section style={{ padding: 'var(--section-pad)', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '1.5rem' }}>
            {galleryItems.map((item, i) => (
              <ScrollAnimation key={item.caption} delay={i * 100}>
                <div className="gallery-item" style={{ position: 'relative', height: '280px', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}>
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    fill 
                    style={{ objectFit: 'cover' }} 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  />
                  <div 
                    className="gallery-item-overlay" 
                    style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      right: 0, 
                      padding: '1.5rem', 
                      background: 'linear-gradient(to top, rgba(10,22,40,0.8) 0%, transparent 55%)',
                      color: 'white'
                    }}
                  >
                    <div>
                      <div style={{ color: 'white', fontWeight: 700, fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>{item.caption}</div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '0.15rem' }}>{item.sub}</div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Farm Info */}
      <section style={{ padding: 'var(--section-pad)', background: 'var(--gray-50)' }}>
        <div className="container">
          <ScrollAnimation>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">Our Farm</span>
              <h2 className="section-title">Nsozibirye Zero-Grazing Farm</h2>
              <p className="section-subtitle mx-auto">Our demonstration farm serves as a training centre for smallholder dairy farmers in the region.</p>
            </div>
          </ScrollAnimation>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '/icons/location.svg', title: 'Location', desc: 'Nsozibirye Village, Kigombe Parish, Luwero Sub County' },
              { icon: '/icons/product-milk.svg', title: 'Zero-Grazing Farm', desc: 'Modern dairy farming methods in an enclosed, controlled environment' },
              { icon: '/icons/award.svg', title: 'Training Centre', desc: 'Hands-on training for farmers in pasture growing, milk handling and livestock management' },
              { icon: '/icons/vision.svg', title: 'Sustainable Practices', desc: 'Promoting environmentally sustainable agriculture that benefits communities' },
            ].map((f) => (
              <div key={f.title} style={{ background: 'white', border: '1px solid var(--gray-100)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <Image 
                    src={f.icon} 
                    alt="" 
                    width={36} 
                    height={36} 
                    style={{ filter: 'invert(37%) sepia(85%) saturate(1478%) hue-rotate(204deg) brightness(97%) contrast(92%)' }} 
                  />
                </div>
                <h4 style={{ color: 'var(--blue-900)', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>{f.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}