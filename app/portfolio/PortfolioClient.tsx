"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollAnimation from '@/components/ScrollAnimation';

interface Props {
  content: Record<string, string>;
}

export default function PortfolioClient({ content }: Props) {
  const getVal = (key: string, fallback: string) => content[key] || fallback;

  const galleryItems = [
    { src: getVal('gallery.item_1.image', '/images/gallery-cows-1.jpg'), alt: 'Dairy cattle in pens at Nsozibirye Farm', caption: getVal('gallery.item_1.caption', 'Zero-Grazing Cattle'), sub: 'Modern dairy farming' },
    { src: getVal('gallery.item_2.image', '/images/gallery-cows-2.jpg'), alt: 'Holstein Friesian cows feeding at Nsozibirye Farm', caption: getVal('gallery.item_2.caption', 'Cattle Feeding'), sub: 'High-quality feed & nutrition' },
    { src: getVal('gallery.item_3.image', '/images/gallery-chaff-cutter.jpg'), alt: 'Diesel chaff cutter machine on farm', caption: getVal('gallery.item_3.caption', 'Chaff Cutter'), sub: 'Preparing forage for cattle' },
    { src: getVal('gallery.item_4.image', '/images/gallery-silage-pit.jpg'), alt: 'Silage pit storage at Nsozibirye Farm', caption: getVal('gallery.item_4.caption', 'Silage Pit'), sub: 'Storing fermented cattle feed' },
    { src: getVal('gallery.item_5.image', '/images/gallery-production-log.jpg'), alt: 'Milk production schedule log', caption: getVal('gallery.item_5.caption', 'Production Records'), sub: 'Traceability and data tracking' },
    { src: getVal('gallery.item_6.image', '/images/gallery-founder-farm-1.jpg'), alt: 'Ibrahim Musikuli next to silage pit', caption: getVal('gallery.item_6.caption', 'Founder in the Field'), sub: 'Mr. Ibrahim Musikuli on site' },
    { src: getVal('gallery.item_7.image', '/images/gallery-office-setup.jpg'), alt: 'Office files and metal milk cans', caption: getVal('gallery.item_7.caption', 'Dairy Office Operations'), sub: 'Kasana-Luwero retail outlet' },
    { src: getVal('gallery.item_8.image', '/images/gallery-maize-field.jpg'), alt: 'Maize field crops', caption: getVal('gallery.item_8.caption', 'Maize Cultivation'), sub: 'Outgrower crop network' },
    { src: getVal('gallery.item_9.image', '/images/gallery-napier-field.jpg'), alt: 'Napier grass crops field', caption: getVal('gallery.item_9.caption', 'Napier Grass Pasture'), sub: 'Cattle forage growing' },
    { src: getVal('gallery.item_10.image', '/images/gallery-groundnuts-bags.jpg'), alt: 'Bags of shelled raw red groundnuts', caption: getVal('gallery.item_10.caption', 'Red Shelled Groundnuts'), sub: 'Grade A premium quality' },
    { src: getVal('gallery.item_11.image', '/images/gallery-groundnuts-packets.jpg'), alt: 'Packaged raw red groundnuts', caption: getVal('gallery.item_11.caption', 'Groundnuts Packaging'), sub: 'Ready for distribution' },
    { src: getVal('gallery.item_12.image', '/images/gallery-groundnut-paste-jars.jpg'), alt: 'Jars of fresh groundnut paste', caption: getVal('gallery.item_12.caption', 'Groundnut Paste Production'), sub: 'Nutritious peanut butter' },
    { src: getVal('gallery.item_13.image', '/images/gallery-produce-sorting.jpg'), alt: 'Workers sorting beans', caption: getVal('gallery.item_13.caption', 'Sorting & Grading'), sub: 'Ensuring premium quality control' },
  ];

  const sliderImages = [
    getVal('gallery.item_1.image', '/images/gallery-cows-1.jpg'),
    getVal('gallery.item_13.image', '/images/gallery-produce-sorting.jpg'),
    getVal('gallery.item_8.image', '/images/gallery-maize-field.jpg')
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <>
      <div className="page-hero">
        <span className="section-tag">Our Gallery</span>
        <h1>{getVal('gallery.hero.title', 'Farm to Table — Our Visual Story')}</h1>
        <p>{getVal('gallery.hero.subtitle', 'A glimpse into our farm, operations, products and the communities we are proud to serve across Uganda.')}</p>
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
